const PortfolioData = {
  name: "TENURA PASANDUL",
  title: ["Full-Stack Developer", "Software Engineer", "AI/ML Engineer"],
  summary:
    "Results-driven Full-Stack Developer with expertise in building scalable web applications using React.js, Node.js, and cloud infrastructure. Specialized in AI-powered solutions and RESTful APIs. Currently pursuing M.Sc. in Data Science and AI.",
  contact: {
    phone: "(+94) 713442181",
    email: "tenurapasandul2000@gmail.com",
    linkedin: "tenura-pasandul",
    github: "tenurapasandul",
  },
  experience: [
    {
      role: "Full-Stack Developer",
      badge: "PROMOTED FROM INTERN",
      company: "Bizzman360",
      location: "Ratmalana, Sri Lanka",
      period: "Dec 2024 – Present",
      highlights: [
        "Architected full-stack apps with React.js (TypeScript) + Node.js/Express.js on AWS EC2",
        "Designed & optimised PostgreSQL schemas with complex triggers on AWS RDS",
        "Led AI-powered feature development for serviceMATE, exceeding enterprise benchmarks",
        "Built chatbot add-on to automate client inquiry submissions",
        "Pioneered E2E testing suite with Playwright & Cucumber inside CI/CD pipelines",
        "Engineered Gmail API integration via OAuth 2.0 for automatic email-to-case linking",
        "Managed AWS infrastructure: S3, EC2, RDS; mentored 2 junior developers",
      ],
    },
  ],
  education: [
    {
      degree: "M.Sc. in Data Science & Artificial Intelligence",
      status: "Reading",
      university: "University of Peradeniya",
      period: "Dec 2024 – Present",
      courses: ["AI", "ML", "Deep Learning", "Computer Vision", "NLP", "Neural Networks"],
    },
    {
      degree: "B.Sc. in Information Technology",
      university: "University of Jaffna",
      period: "2021 – 2024",
      courses: ["OOP", "DBMS", "Software Engineering", "Data Structures", "Computer Security"],
    },
  ],
  projects: [
    {
      name: "serviceMATE",
      sub: "AI-Powered Legal Client Management",
      description:
        "Enterprise SaaS for law firms with voice-enabled input (92% accuracy), Gmail OAuth integration, PWA with cross-device support, and role-based JWT auth.",
      stack: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Playwright"],
      color: "var(--color-primary)",
      link: "https://bizzmate.ai",
      repo: "",
      media: [
        // Add your images and videos here:
        { type: "image", url: "/BM_home_1.png", caption: "Home Page (Part 1)" },
        { type: "image", url: "/BM_home_2.png", caption: "Home Page (Part 2)" },
        //{ type: "video", url: "https://www.youtube.com/embed/VIDEO_ID", caption: "Demo Video" },
      ],
    },
    {
      name: "VV Digitalize",
      sub: "University Camera Club Platform",
      description:
        "Full-stack MERN application digitising university operations with real-time inventory management and automated booking system.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
      color: "var(--color-secondary)",
      link: "",
      repo: "https://github.com/Pramu-99/VV-Master.git",
      media: [
         { type: "image", url: "/1727716838505.jpg", caption: "Home Page" },
        // { type: "video", url: "https://www.youtube.com/embed/VIDEO_ID", caption: "Walkthrough" },
      ],
    },
    {
      name: "Sports Player Tracking AI",
      sub: "Computer Vision Player Detection System",
      description:
        "AI-based player detection in sports videos across cricket, rugby, handball, and dodgeball using YOLOv8n and YOLOv8m. YOLOv8m achieved 50.2 mAP vs 37.3 for YOLOv8n with frame-by-frame confidence visualization.",
      stack: ["Python", "PyTorch", "YOLOv8", "OpenCV", "Jupyter Notebook", "Matplotlib"],
      color: "#ff9f1c",
      link: "https://colab.research.google.com/drive/1mx35MUCNGdWxDlY6j7ZpQFqCvSL-B-AH?usp=sharing",
      repo: "https://github.com/TenuraPasandul/sports-player-tracking-ai.git",
      media: [
         { type: "video", url: "https://www.youtube.com/embed/E03kIgIUr3c?si=_HZ8t5kSHrswPQQB", caption: "Handball Player Detection" },
         { type: "image", url: "/sports_5.png", caption: "Accuracy Graph" },
      ],
    },
    {
      name: "Gesture Control",
      sub: "CV Presentation System",
      description:
        "Computer Vision system for hands-free PowerPoint control using hand tracking with 88% gesture recognition accuracy.",
      stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
      color: "var(--color-tertiary)",
      link: "",
      repo: "https://github.com/TenuraPasandul/Gesture_Controlled_Presentation.git",
      media: [
        // { type: "video", url: "https://www.youtube.com/embed/VIDEO_ID", caption: "Gesture Demo" },
      ],
    },
    {
      name: "Lotus Wave",
      sub: "Hotel Management System",
      description:
        "Full-stack booking platform with 3D room visualisation, AI chatbot, PayPal integration, and real-time availability tracking.",
      stack: ["MongoDB", "React.js", "Node.js", "PayPal API"],
      color: "#f77f00",
      link: "",
      repo: "https://github.com/TenuraPasandul/Hotel-Management-System.git",
      media: [
        // { type: "image", url: "/projects/lotus-wave/booking.png", caption: "Booking Interface" },
      ],
    },
    {
      name: "Event Booking System",
      sub: "Event Management Platform",
      description:
        "Group project event booking platform with a React.js frontend and Java Spring Boot backend, handling event discovery, registration, and booking workflows.",
      stack: ["React.js", "Java", "Spring Boot", "CSS"],
      color: "#ffd166",
      link: "",
      repo: "https://github.com/SGopinath89/IT32322024EventBooking.git",
      media: [
        { type: "video", url: "https://www.youtube.com/embed/fzOeiM5s9gQ?si=VBB6Tu4uwJEo3B1A", caption: "Event Booking Demo" },
        { type: "video", url: "https://www.youtube.com/embed/jhgk1KApWSo?si=Gt5mUvTXb0bs6h5Y", caption: "Pre-AI Era" },
        { type: "image", url: "/1727729432393.jpg", caption: "Login Page" },
        { type: "image", url: "/1727729555510.jpg", caption: "Home Page" },
      ],
    },
  ],
  skills: {
    Languages: ["JavaScript ES6+", "TypeScript", "Python", "Java", "C/C++", "SQL", "PHP"],
    Frontend: ["React.js", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "React Native", "Redux", "PWA"],
    Backend: ["Node.js", "Express.js", "Spring Boot", "ASP.NET Core", "Django", "RESTful APIs"],
    Database: ["PostgreSQL", "MongoDB", "MySQL", "Query Optimisation", "Schema Design"],
    "Cloud/DevOps": ["AWS EC2/RDS/S3", "Docker", "CI/CD Pipelines", "Cloud Deployment"],
    "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "MediaPipe", "NLP", "Computer Vision"],
    Testing: ["Playwright", "Cucumber", "E2E Testing", "Unit Testing", "Test Automation"],
  },
  achievements: [
    { title: "IEEE Xtreme 17.0", detail: "Ranked 11th / 330 teams in Sri Lanka", year: "2023" },
    { title: "IBM Full Stack Capstone", detail: "Full Stack Application Development – IBM", year: "2024" },
    { title: "IBM Intro to Software Eng.", detail: "Introduction to Software Engineering with Honors – IBM", year: "2024" },
    { title: "Cisco JS Essentials", detail: "Modern JavaScript & Async Programming", year: "2023" },
    { title: "Cisco Networking", detail: "TCP/IP Protocols & Network Security", year: "2022" },
    { title: "Esthuetique'21 Hackathon", detail: "UI/UX Hackathon – NSBM Green University", year: "2021" },
  ],
};

module.exports = PortfolioData;