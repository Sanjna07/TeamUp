import React, { useState, useEffect, useRef } from 'react';


function Aegis() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Comprehensive Knowledge Base (200+ lines of valuable data)
  const knowledgeBase = {
    greetings: [
      "Hello hacker! Ready to build something amazing? 🚀",
      "Hey there! Excited for your next hackathon adventure?",
      "Hi! Let's get you prepped for an incredible hacking experience!",
      "Welcome to your hackathon coach! What are we working on today?"
    ],
    hackathons: {
      upcoming: [
        {
          title: "NASA Space Apps Challenge",
          date: "October 7-8",
          details: "Global hackathon with space-themed challenges and NASA mentors",
          link: "https://www.spaceappschallenge.org/",
          prize: "$10,000+ in prizes"
        },
        {
          title: "Global Hack Week",
          date: "Monthly",
          details: "Week-long events with workshops and mini-challenges from MLH",
          link: "https://ghw.mlh.io/",
          prize: "Swag and special opportunities"
        },
        {
          title: "ETHGlobal Online",
          date: "Next month",
          details: "Blockchain-focused with great prizes and networking",
          link: "https://ethglobal.com/",
          prize: "ETH grants and investor connections"
        },
        {
          title: "Hack the North",
          date: "September 15-17",
          details: "Canada's biggest hackathon with international participation",
          link: "https://hackthenorth.com/",
          prize: "$50,000+ in prizes"
        },
        {
          title: "HackMIT",
          date: "October 21-22",
          details: "Prestigious MIT event with cutting-edge challenges",
          link: "https://hackmit.org/",
          prize: "Top-tier tech prizes"
        },
        {
          title: "SheHacks+",
          date: "November 10-12",
          details: "Women-centric hackathon with mentorship",
          link: "https://shehacks.ca/",
          prize: "$15,000+ in prizes"
        }
      ],
      joining: [
        {
          steps: [
            "Browse platforms like Devpost or Major League Hacking",
            "Register before deadlines (often 1-2 weeks before)",
            "Join their Discord/Slack for updates and networking",
            "Complete any prerequisite requirements"
          ],
          tips: "Pro tip: Many events offer travel grants if you apply early!",
          links: [
            {text: "Devpost Hackathons", url: "https://devpost.com/hackathons"},
            {text: "MLH Events", url: "https://mlh.io/seasons/2023-2/events"},
            {text: "Hackathon.com", url: "https://www.hackathon.com/"}
          ]
        },
        {
          steps: [
            "Check local universities for campus hackathons",
            "Look for themed events matching your interests (AI, blockchain, etc.)",
            "Verify participation requirements (some are student-only)"
          ],
          tips: "Local events often have better networking and mentorship opportunities",
          links: [
            {text: "Hackathons Near Me", url: "https://www.hackathonsnear.me/"},
            {text: "Eventbrite Hackathons", url: "https://www.eventbrite.com/d/online/hackathon/"}
          ]
        }
      ],
      preparing: [
        {
          checklist: [
            "Setup dev environment (VS Code, Git, Node.js, Python, etc.)",
            "Practice with mini-projects (build a simple API or UI component)",
            "Research past winners' projects on Devpost for inspiration",
            "Prepare a 1-minute elevator pitch for your ideas",
            "Pack essentials: laptop charger, notebook, snacks, headphones"
          ],
          motivation: "Remember: Even experienced hackers get nervous - the key is preparation!",
          links: [
            {text: "Dev Environment Setup Guide", url: "https://github.com/Michael0x2a/curated-programming-resources/blob/master/resources.md"},
            {text: "Past Winning Projects", url: "https://devpost.com/software/search?query=winner"},
            {text: "Pitch Workshop", url: "https://www.youtube.com/watch?v=Unzc731iCUY"}
          ]
        },
        {
          checklist: [
            "Create a GitHub repository template",
            "Set up basic CI/CD pipeline",
            "Prepare boilerplate code for common tasks",
            "Bookmark documentation for likely technologies"
          ],
          motivation: "The first few hours are crucial - having these ready gives you a head start!",
          links: [
            {text: "Hackathon Starter Kit", url: "https://github.com/sahat/hackathon-starter"},
            {text: "Boilerplate Code Examples", url: "https://github.com/melvin2016/boilerplate-collection"}
          ]
        }
      ],
      prizes: [
        {
          categories: [
            "Best Overall Hack",
            "Best Beginner Hack",
            "Best Design/UI",
            "Most Innovative Solution",
            "Best Use of [Sponsor Tech]",
            "Best Social Impact",
            "Best Hardware Hack",
            "Most Technical Difficulty"
          ],
          tips: "Judges love projects that solve real problems with clear impact and good execution",
          examples: [
            "2022 Space Apps winner: AI that predicts solar flares to protect satellites",
            "2021 Hack the North winner: AR for sign language learning",
            "2020 HackMIT winner: Accessibility tool for colorblind users"
          ],
          links: [
            {text: "Winning Project Examples", url: "https://devpost.com/software/search?query=winner"},
            {text: "Judging Tips", url: "https://medium.com/hackathons-anonymous/how-to-win-a-hackathon-8adf8e5cd1e1"}
          ]
        }
      ],
      schedule: [
        {
          typical: [
            "Day 1: Opening ceremony, team formation, brainstorming",
            "Day 2: Core development, mentor check-ins, workshops",
            "Day 3: Final touches, submission, demos, judging"
          ],
          tips: "Allocate time for sleep! Most winning teams get at least 4-5 hours/night",
          links: [
            {text: "Time Management Guide", url: "https://dev.to/anshulrg/how-to-manage-your-time-during-a-hackathon-4j6m"}
          ]
        }
      ]
    },
    tech: {
      stacks: {
        beginner: [
          "HTML/CSS/JavaScript (Frontend basics)",
          "Python (Great for beginners)",
          "No-code tools like Glitch or Bubble",
          "Basic APIs with Postman",
          "Git/GitHub for version control",
          "Bootstrap/Tailwind for quick styling"
        ],
        intermediate: [
          "MERN (MongoDB, Express, React, Node)",
          "Flutter (Cross-platform mobile)",
          "Next.js (Fullstack framework)",
          "Firebase (Backend-as-a-service)",
          "Flask/Django (Python backends)",
          "React Native for mobile apps"
        ],
        advanced: [
          "AI/ML: Python + TensorFlow/PyTorch",
          "Blockchain: Solidity + Hardhat",
          "Cloud: AWS/GCP with Terraform",
          "AR/VR: Unity + Vuforia",
          "IoT: Raspberry Pi + Sensors",
          "Web3: Ethereum, Solana, IPFS"
        ]
      },
      resources: [
        {
          free: [
            "freeCodeCamp (Full courses)",
            "Scrimba (Interactive tutorials)",
            "MDN Web Docs (Reference)",
            "The Odin Project (Full-stack path)",
            "Harvard CS50 (CS fundamentals)",
            "Frontend Mentor (UI challenges)"
          ],
          paid: [
            "Frontend Masters (Deep dives)",
            "Udemy (Frequent sales)",
            "Egghead (Concise lessons)",
            "Codecademy Pro (Hands-on)",
            "Pluralsight (Enterprise skills)",
            "Educative (Interactive coding)"
          ],
          links: [
            {text: "freeCodeCamp", url: "https://www.freecodecamp.org/"},
            {text: "Scrimba", url: "https://scrimba.com/"},
            {text: "MDN Web Docs", url: "https://developer.mozilla.org/"},
            {text: "The Odin Project", url: "https://www.theodinproject.com/"},
            {text: "CS50", url: "https://cs50.harvard.edu/"}
          ]
        }
      ],
      apis: [
        {
          name: "Twilio",
          description: "SMS/communications API",
          use: "Notification systems, 2FA",
          link: "https://www.twilio.com/"
        },
        {
          name: "Google Maps",
          description: "Location services",
          use: "Geo-based apps",
          link: "https://developers.google.com/maps"
        },
        {
          name: "NASA API",
          description: "Space data and imagery",
          use: "Science/education apps",
          link: "https://api.nasa.gov/"
        },
        {
          name: "OpenWeather",
          description: "Weather data",
          use: "Weather apps, planning tools",
          link: "https://openweathermap.org/api"
        },
        {
          name: "Spotify",
          description: "Music data",
          use: "Music recommendation apps",
          link: "https://developer.spotify.com/documentation/web-api/"
        }
      ],
      databases: [
        {
          name: "Firebase Realtime DB",
          type: "NoSQL",
          use: "Quick prototyping, simple apps",
          link: "https://firebase.google.com/"
        },
        {
          name: "MongoDB",
          type: "NoSQL",
          use: "Flexible document storage",
          link: "https://www.mongodb.com/"
        },
        {
          name: "PostgreSQL",
          type: "Relational",
          use: "Complex data relationships",
          link: "https://www.postgresql.org/"
        },
        {
          name: "Supabase",
          type: "Open-source Firebase",
          use: "Full backend alternative",
          link: "https://supabase.com/"
        }
      ],
      deployment: [
        {
          name: "Vercel",
          bestFor: "Frontend/static sites",
          link: "https://vercel.com/"
        },
        {
          name: "Render",
          bestFor: "Fullstack apps",
          link: "https://render.com/"
        },
        {
          name: "Railway",
          bestFor: "Backend services",
          link: "https://railway.app/"
        },
        {
          name: "Netlify",
          bestFor: "JAMstack apps",
          link: "https://www.netlify.com/"
        }
      ]
    },
    team: {
      formation: [
        {
          where: [
            "Event Discord/Slack channels (#team-formation)",
            "Dedicated team formation sessions",
            "Twitter/LinkedIn with #LookingForTeam",
            "Local meetups or hackathon clubs",
            "Friends from coding bootcamps/classes"
          ],
          how: "Be specific about your skills (e.g., 'Frontend dev with React experience looking for backend partner')",
          tips: "Teams of 3-4 with mixed skills (frontend, backend, design) often perform best",
          links: [
            {text: "TeamUp Platform", url: "https://teamup.kgames.pro/"},
            {text: "Find Hack Teams", url: "https://findhackteams.com/"},
            {text: "Devpost Team Finder", url: "https://devpost.com/hackathons?challenge_type=team"}
          ]
        }
      ],
      dynamics: [
        "2-4 members is ideal for most events",
        "Balance technical and non-technical roles",
        "Set clear expectations upfront (commitment level, skills)",
        "Use GitHub Projects for task management",
        "Schedule regular check-ins during the event",
        "Assign a team lead for coordination"
      ],
      roles: [
        {
          name: "Frontend Developer",
          skills: "UI/UX implementation, React/Vue/Angular"
        },
        {
          name: "Backend Developer",
          skills: "API/database work, Node.js/Python/Java"
        },
        {
          name: "Designer",
          skills: "Figma/Adobe XD, user flows"
        },
        {
          name: "Pitch Person",
          skills: "Presentation, public speaking"
        },
        {
          name: "DevOps",
          skills: "Deployment/cloud setup"
        }
      ],
      tools: [
        {
          name: "GitHub",
          use: "Code collaboration",
          link: "https://github.com/"
        },
        {
          name: "Figma",
          use: "Design collaboration",
          link: "https://www.figma.com/"
        },
        {
          name: "Notion",
          use: "Documentation and planning",
          link: "https://www.notion.so/"
        },
        {
          name: "Discord",
          use: "Team communication",
          link: "https://discord.com/"
        }
      ]
    },
    judging: {
      criteria: [
        {
          aspect: "Technical Difficulty",
          weight: "20-30%",
          description: "How complex/challenging the solution is"
        },
        {
          aspect: "Creativity/Innovation",
          weight: "20-30%",
          description: "Originality of the idea"
        },
        {
          aspect: "Design/UX",
          weight: "15-25%",
          description: "User experience and interface quality"
        },
        {
          aspect: "Practical Usefulness",
          weight: "15-25%",
          description: "Real-world applicability"
        },
        {
          aspect: "Presentation/Pitch",
          weight: "10-20%",
          description: "Clarity and persuasiveness"
        }
      ],
      tips: [
        "Prepare a 2-minute demo video (screen recording + voiceover)",
        "Create simple slides with problem/solution slides",
        "Highlight what makes your approach unique",
        "Practice explaining your project to non-tech friends",
        "Show your development process (Git commits, prototypes)",
        "Have each team member speak during the pitch"
      ],
      links: [
        {text: "Pitch Deck Templates", url: "https://slidebean.com/templates/startup-pitch-deck"},
        {text: "Demo Video Tips", url: "https://dev.to/wwcodemanila/how-to-make-a-great-hackathon-demo-video-4a5m"}
      ]
    },
    inspiration: [
      {
        sources: [
          "Devpost winners gallery (filter by tech stack)",
          "GitHub trending repos (see what's popular)",
          "Product Hunt new launches (market needs)",
          "Indie Hackers success stories (bootstrapped ideas)",
          "#BuiltWith on Twitter (real-world projects)"
        ],
        ideas: [
          "Accessibility tools for specific disabilities",
          "Sustainability solutions (carbon tracking, recycling)",
          "Education tech for remote learning",
          "Community-building platforms",
          "AI tools for creative work (art, writing, music)",
          "Health tech for mental wellbeing"
        ],
        links: [
          {text: "Devpost Winners", url: "https://devpost.com/software/search?query=winner"},
          {text: "GitHub Trending", url: "https://github.com/trending"},
          {text: "Product Hunt", url: "https://www.producthunt.com/"}
        ]
      }
    ],
    motivation: [
      "The best projects solve real problems - think small but impactful!",
      "Most winners started where you are now",
      "Hackathons are about learning, not just winning",
      "Your worst hackathon > the one you didn't attend",
      "The tech community remembers great effort, not just results",
      "Every project teaches you something valuable",
      "Judges appreciate honest effort over perfection"
    ],
    templates: {
      pitch: [
        "Problem: [Clearly state the issue you're solving]",
        "Solution: [Your innovative approach]",
        "Technology: [Key tech used]",
        "Impact: [Who benefits and how]",
        "Future: [Next steps if you continue]",
        "Demo: [Live demo or video]"
      ],
      readme: [
        "# Project Name",
        "## Inspiration",
        "## What it does",
        "## How we built it",
        "## Challenges we ran into",
        "## Accomplishments we're proud of",
        "## What we learned",
        "## What's next for [project name]",
        "## Built With [tech stack]"
      ],
      links: [
        {text: "README Template", url: "https://gist.github.com/PurpleBooth/109311bb0361f32d87a2"},
        {text: "Pitch Guide", url: "https://medium.com/hackathons-anonymous/the-ultimate-guide-to-hackathon-pitching-538f921d5092"}
      ]
    },
    rejection: [
      "I'm focused on hackathon advice. Try asking about team formation, tech stacks, or event prep!",
      "Let's keep this hackathon-related. Need help with team collaboration tools or finding events?",
      "For general tech questions, I recommend Stack Overflow. Ask me about hackathon-specific tools!"
    ]
  };

  // Enhanced response generator (50+ lines)
  const generateResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Greetings
    if (/hi|hello|hey|wassup|yo/.test(lowerMsg)) {
      return {
        text: knowledgeBase.greetings[
          Math.floor(Math.random() * knowledgeBase.greetings.length)
        ],
        links: []
      };
    }

    // Check if off-topic
    const hackathonKeywords = [
      'hackathon', 'code', 'programming', 'team', 'tech', 'event', 
      'project', 'develop', 'build', 'learn', 'beginner', 'compete', 
      'challenge', 'prize', 'judge', 'pitch', 'demo', 'devpost', 'mlh',
      'api', 'stack', 'win', 'participate', 'hack', 'coding', 'develop',
      'collaboration', 'tools', 'teamwork', 'github', 'figma', 'slack', 
      'discord', 'communication', 'version control', 'git'
    ];
    
    if (!hackathonKeywords.some(word => lowerMsg.includes(word))) {
      return {
        text: knowledgeBase.rejection[
          Math.floor(Math.random() * knowledgeBase.rejection.length)
        ],
        links: []
      };
    }

    // Response generation with detailed answers
    if (/join|participate|register|sign up|find|apply/.test(lowerMsg)) {
      const method = knowledgeBase.hackathons.joining[
        Math.floor(Math.random() * knowledgeBase.hackathons.joining.length)
      ];
      return {
        text: `To join hackathons:\n${method.steps.map(s => `• ${s}`).join('\n')}\n\n${method.tips}`,
        links: method.links
      };
    }
    
    if (/upcoming|event|when|where|next|schedule/.test(lowerMsg)) {
      const events = knowledgeBase.hackathons.upcoming.slice(0, 5);
      return {
        text: `Top upcoming hackathons:\n${events.map(e => 
          `• ${e.title} (${e.date})\n  ${e.details}\n  Prizes: ${e.prize}`
        ).join('\n')}`,
        links: events.map(e => ({text: e.title, url: e.link}))
      };
    }
    
    if (/prepare|ready|practice|setup|checklist/.test(lowerMsg)) {
      const prep = knowledgeBase.hackathons.preparing[
        Math.floor(Math.random() * knowledgeBase.hackathons.preparing.length)
      ];
      return {
        text: `Preparation checklist:\n${prep.checklist.map(s => `✓ ${s}`).join('\n')}\n\n${prep.motivation}`,
        links: prep.links
      };
    }
    
    if (/tech|stack|tool|framework|language|technolog/.test(lowerMsg)) {
      let level = 'intermediate';
      if (/beginner|new|start|first/.test(lowerMsg)) level = 'beginner';
      if (/advanced|expert|hard|complex/.test(lowerMsg)) level = 'advanced';
      
      return {
        text: `${level.charAt(0).toUpperCase() + level.slice(1)} tech stacks:\n${
          knowledgeBase.tech.stacks[level].map(s => `• ${s}`).join('\n')
        }`,
        links: []
      };
    }
    
    if (/team|partner|collab|teammate|group/.test(lowerMsg)) {
      const teamInfo = knowledgeBase.team.formation[0];
      return {
        text: `Find teammates:\n${
          teamInfo.where.map(s => `• ${s}`).join('\n')
        }\n\nTips:\n• ${teamInfo.how}\n• ${teamInfo.tips}`,
        links: teamInfo.links
      };
    }
    
    if (/resource|learn|tutorial|study|course|material/.test(lowerMsg)) {
      const res = knowledgeBase.tech.resources[0];
      return {
        text: `Learning resources:\n\nFree:\n${
          res.free.map(s => `• ${s}`).join('\n')
        }\n\nPaid (worth considering):\n${
          res.paid.map(s => `• ${s}`).join('\n')
        }`,
        links: res.links
      };
    }
    
    if (/api|data|service|endpoint/.test(lowerMsg)) {
      const apis = knowledgeBase.tech.apis.slice(0, 5);
      return {
        text: `Cool APIs to consider:\n${
          apis.map(a => `• ${a.name}: ${a.description} (Great for ${a.use})`).join('\n')
        }`,
        links: apis.map(a => ({text: a.name, url: a.link}))
      };
    }
    
    if (/database|db|store|storage/.test(lowerMsg)) {
      const dbs = knowledgeBase.tech.databases.slice(0, 4);
      return {
        text: `Database options:\n${
          dbs.map(d => `• ${d.name} (${d.type}): ${d.use}`).join('\n')
        }`,
        links: dbs.map(d => ({text: d.name, url: d.link}))
      };
    }
    
    if (/deploy|host|server|publish/.test(lowerMsg)) {
      const deploys = knowledgeBase.tech.deployment;
      return {
        text: `Deployment platforms:\n${
          deploys.map(d => `• ${d.name}: Best for ${d.bestFor}`).join('\n')
        }`,
        links: deploys.map(d => ({text: d.name, url: d.link}))
      };
    }
    
    if (/idea|inspiration|project|what.*build/.test(lowerMsg)) {
      const inspo = knowledgeBase.inspiration[0];
      return {
        text: `Project inspiration:\n\nSources:\n${
          inspo.sources.map(s => `• ${s}`).join('\n')
        }\n\nIdea areas:\n${
          inspo.ideas.map(s => `• ${s}`).join('\n')
        }`,
        links: inspo.links
      };
    }
    
    if (/judg|criteria|win|prize|winner/.test(lowerMsg)) {
      return {
        text: `Judging criteria (typical weights):\n${
          knowledgeBase.judging.criteria.map(c => `• ${c.aspect} (${c.weight}): ${c.description}`).join('\n')
        }\n\nWinning tips:\n${
          knowledgeBase.judging.tips.map(t => `• ${t}`).join('\n')
        }`,
        links: knowledgeBase.judging.links
      };
    }
    
    if (/pitch|present|demo|presentation/.test(lowerMsg)) {
      return {
        text: `Pitch template:\n${
          knowledgeBase.templates.pitch.map(s => `• ${s}`).join('\n')
        }\n\nDemo tips:\n• Keep it under 2 minutes\n• Show the problem first\n• Highlight 1-2 technical challenges\n• End with clear next steps`,
        links: knowledgeBase.templates.links
      };
    }
    
    if (/readme|document|github|repo/.test(lowerMsg)) {
      return {
        text: `README.md structure:\n${
          knowledgeBase.templates.readme.map(s => `• ${s}`).join('\n')
        }`,
        links: knowledgeBase.templates.links
      };
    }
    
    if (/motivation|nervous|scared|anxious|encourag/.test(lowerMsg)) {
      return {
        text: knowledgeBase.motivation[
          Math.floor(Math.random() * knowledgeBase.motivation.length)
        ],
        links: []
      };
    }

    if (/collaboration tools|team tools|teamwork tools|communication tools/.test(lowerMsg)) {
      const tools = knowledgeBase.team.tools;
      return {
        text: `Best collaboration tools for hackathons:\n${
          tools.map(t => `• ${t.name}: ${t.use}`).join('\n')
        }`,
        links: tools.map(t => ({text: t.name, url: t.link}))
      };
    }

    // Default helpful response
    const prep = knowledgeBase.hackathons.preparing[0];
    return {
      text: `Here's some general hackathon advice:\n${
        prep.checklist.map(s => `• ${s}`).join('\n')
      }\n\nRemember: The goal is to learn and have fun!`,
      links: prep.links
    };
  };

  // Message handling functions (50+ lines)
  const handleSendMessage = async (message, isSuggestion = false) => {
    if (!message.trim()) return;
    
    const userMessage = { 
      role: 'user', 
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    if (!isSuggestion) setInputMessage('');
    
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = generateResponse(message);
    const botMessage = { 
      role: 'assistant', 
      content: response.text,
      links: response.links,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const question = suggestion.replace(/["]/g, '').replace("?", "");
    handleSendMessage(question, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced suggestions with categories
  const suggestions = {
    "Getting Started": [
      "How do I find hackathons to join?",
      "What's a good first hackathon for beginners?",
      "How early should I register?"
    ],
    "Preparation": [
      "What should I prepare beforehand?",
      "Checklist for hackathon success",
      "How to practice for a hackathon?"
    ],
    "Technology": [
      "How to choose the right tech stack?",
      "Best APIs for hackathon projects",
      "Easy databases for beginners"
    ],
    "Teamwork": [
      "Tips for finding teammates",
      "How to split team roles?",
      "Best collaboration tools"
    ],
    "Winning": [
      "What makes a winning project?",
      "How are hackathons judged?",
      "How to make a good pitch?"
    ]
  };

  // Function to render message content with clickable links
  const renderMessageContent = (content, links = []) => {
    const parts = content.split('\n');
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="app min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 font-sans flex flex-col">
      <header className="bg-gradient-to-r from-purple-800 to-blue-700 shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-white animate-pulse">Aegis</h1>
        <p className="text-gray-200 text-sm">Clear your doubts Here!</p>
      </header>
  
      <div className="flex-1 flex justify-center overflow-hidden">
        <div className="chat-container w-full max-w-2xl mx-4 my-4 flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto pr-2 rounded-lg backdrop-blur-sm bg-gray-900 bg-opacity-40 shadow-xl">
            {messages.length === 0 ? (
              <div className="empty-state text-center p-8 animate-fade-in">
                <p className="text-lg text-white mb-6">How can I help with your hackathon journey?</p>
  
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 space-y-6 border border-purple-500/30">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-4 animate-pulse">Quick Start Guides</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.entries(suggestions).map(([category, items]) => (
                        <div key={category} className="text-left">
                          <h4 className="text-md font-semibold text-blue-300 mb-2">{category}</h4>
                          <div className="space-y-2">
                            {items.map((suggestion, index) => (
                              <div
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="cursor-pointer bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 hover:bg-purple-900 hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-300 text-sm font-medium transform hover:-translate-y-1"
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div>
                    <h4 className="text-md font-semibold text-blue-300 mb-2">Pro Tips</h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Ask about specific technologies (APIs, frameworks)",
                        "Get team formation strategies",
                        "Learn judging criteria for your track",
                      ].map((tip, idx) => (
                        <li
                          key={idx}
                          className="bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 text-sm text-white hover:bg-purple-900 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="messages space-y-4 p-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`message ${msg.role} ${
                      msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                    } animate-fade-in`}
                  >
                    <div 
                      className={`p-4 max-w-xs sm:max-w-sm rounded-xl shadow-lg ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                          : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                      }`}
                    >
                      <div className="message-content text-sm">{renderMessageContent(msg.content)}</div>
  
                      {msg.links && msg.links.length > 0 && (
                        <div className="message-links mt-2 text-xs text-blue-100">
                          <p className="font-semibold">Useful links:</p>
                          {msg.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block underline hover:text-white"
                            >
                              {link.text} ↗
                            </a>
                          ))}
                        </div>
                      )}
                      <div className="message-time text-xs text-gray-200 mt-2 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
  
                {isTyping && (
                  <div className="typing-indicator flex items-center space-x-2 text-sm text-gray-300 p-2">
                    <div className="dots flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
  
      <form
        className="input-area w-full bg-gray-900 border-t border-purple-900/50 p-4 flex justify-center"
        onSubmit={handleSubmit}
      >
        <div className="max-w-2xl w-full flex items-center gap-2">
          <input
            className="flex-1 p-3 rounded-xl border border-purple-500/30 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm placeholder-gray-400"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about hackathons..."
            disabled={isTyping}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-white p-3 rounded-xl disabled:opacity-50 shadow-lg hover:shadow-purple-500/50"
            disabled={isTyping || !inputMessage}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
  
}

export default Aegis;