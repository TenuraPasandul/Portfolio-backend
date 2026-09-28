require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');
const PortfolioData = require('./info');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Build a detailed system prompt from portfolio data
const systemPrompt = `You are Tenura's portfolio assistant chatbot embedded on his personal portfolio website.
Your job is to answer visitor questions about Tenura Pasandul using ONLY the data provided below.
Be friendly, concise, and professional. Use markdown formatting in your responses (bold, lists, code blocks, etc.).
If someone asks something not covered by the data below, politely say you only have info about Tenura's portfolio.

=== PORTFOLIO DATA ===

**Name:** ${PortfolioData.name}
**Titles:** ${PortfolioData.title.join(' | ')}
**Summary:** ${PortfolioData.summary}

**Contact:**
- Phone: ${PortfolioData.contact.phone}
- Email: ${PortfolioData.contact.email}
- LinkedIn: linkedin.com/in/${PortfolioData.contact.linkedin}
- GitHub: github.com/${PortfolioData.contact.github}

**Experience:**
${PortfolioData.experience.map(exp => `
- Role: ${exp.role} at ${exp.company} (${exp.period}) — ${exp.badge}
  Location: ${exp.location}
  Key Highlights:
${exp.highlights.map(h => `    • ${h}`).join('\n')}
`).join('\n')}

**Education:**
${PortfolioData.education.map(edu => `
- ${edu.degree} — ${edu.university} (${edu.period})${edu.status ? ' [' + edu.status + ']' : ''}
  Courses: ${edu.courses.join(', ')}
`).join('\n')}

**Projects:**
${PortfolioData.projects.map(proj => `
- **${proj.name}** — ${proj.sub}
  ${proj.description}
  Tech Stack: ${proj.stack.join(', ')}
  ${proj.link ? 'Live: ' + proj.link : ''}
  ${proj.repo ? 'Repo: ' + proj.repo : ''}
`).join('\n')}

**Skills:**
${Object.entries(PortfolioData.skills).map(([cat, items]) => `- ${cat}: ${items.join(', ')}`).join('\n')}

**Achievements:**
${PortfolioData.achievements.map(a => `- ${a.title} (${a.year}): ${a.detail}`).join('\n')}

=== END PORTFOLIO DATA ===
`;

// Session and Admin State
const activeSessions = new Map();
let adminWs = null;

// Admin authentication secret (set in .env, fallback to 'admin123' for testing)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin123';

app.get('/', (req, res) => {
    res.send('Gemini WebSocket server is running. Connect to ws://localhost:3000');
});

wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const role = url.searchParams.get('role');
    const secret = url.searchParams.get('secret');

    // === ADMIN CONNECTION ===
    if (role === 'admin') {
        if (secret !== ADMIN_SECRET) {
            ws.send(JSON.stringify({ error: 'Unauthorized' }));
            ws.close();
            return;
        }

        console.log('Admin connected!');
        adminWs = ws;

        // Send current active sessions to admin
        const sessionsData = Array.from(activeSessions.keys());
        ws.send(JSON.stringify({ type: 'init_sessions', sessions: sessionsData }));

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                
                // Admin sending message to a user
                if (data.action === 'send' && data.target && data.text) {
                    const userSession = activeSessions.get(data.target);
                    if (userSession) {
                        userSession.isHandoff = true; // Suspend AI
                        userSession.ws.send(data.text);
                        console.log(`Admin to ${data.target}: ${data.text}`);
                    }
                }
            } catch (e) {
                console.error('Error parsing admin message', e);
            }
        });

        ws.on('close', () => {
            console.log('Admin disconnected');
            if (adminWs === ws) adminWs = null;
        });
        return;
    }

    // === USER CONNECTION ===
    const sessionId = crypto.randomBytes(4).toString('hex');
    console.log(`New user connected: ${sessionId}`);
    
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3.6-flash",
        systemInstruction: systemPrompt,
    });
    
    const chat = model.startChat({ history: [] });

    activeSessions.set(sessionId, {
        ws: ws,
        chat: chat,
        isHandoff: false
    });

    // Notify admin if online
    if (adminWs) {
        adminWs.send(JSON.stringify({ type: 'user_connected', session: sessionId }));
    }

    ws.send('Welcome! I am Tenura\'s portfolio assistant. Ask me anything about his skills, projects, or experience!');

    ws.on('message', async (message) => {
        const userMessage = message.toString();
        console.log(`User [${sessionId}]: ${userMessage}`);
        const session = activeSessions.get(sessionId);

        // Notify admin of user message
        if (adminWs) {
            adminWs.send(JSON.stringify({ 
                type: 'transcript', 
                session: sessionId, 
                sender: 'user', 
                text: userMessage 
            }));
        }

        // If Admin took over, bypass Gemini
        if (session && session.isHandoff) {
            return;
        }

        // Send to Gemini
        try {
            const result = await chat.sendMessage(userMessage);
            const response = await result.response.text();
            
            console.log(`Bot [${sessionId}]: ${response}`);

            if (ws.readyState === WebSocket.OPEN) {
                ws.send(response);
            }

            // Notify admin of bot response
            if (adminWs) {
                adminWs.send(JSON.stringify({ 
                    type: 'transcript', 
                    session: sessionId, 
                    sender: 'bot', 
                    text: response 
                }));
            }
        } catch (error) {
            console.error(`Error generating response for ${sessionId}:`, error);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send('Sorry, I encountered an error processing your request. Please try again in a moment.');
            }
        }
    });

    ws.on('close', () => {
        console.log(`User disconnected: ${sessionId}`);
        activeSessions.delete(sessionId);
        if (adminWs) {
            adminWs.send(JSON.stringify({ type: 'user_disconnected', session: sessionId }));
        }
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error [${sessionId}]: ${error}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`WebSocket server available at ws://localhost:${PORT}`);
});
