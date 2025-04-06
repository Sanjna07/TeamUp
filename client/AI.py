from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)
users = [
    {"id": 2, "name": "Liam_Dev", "skills": "JavaScript, React, Node.js", "interests": "Web Development, Startups, Gaming"},
    {"id": 3, "name": "Zoe_Design", "skills": "UI/UX, Figma, Graphic Design", "interests": "Design Sprints, Freelancing, Art"},
    {"id": 4, "name": "Ethan_Cloud", "skills": "AWS, DevOps, Kubernetes", "interests": "Cloud Architecture, Cybersecurity, Travel"},
    {"id": 5, "name": "Mia_Data", "skills": "SQL, Python, Tableau", "interests": "Data Visualization, Startups, Cooking"},
    {"id": 6, "name": "Noah_AI", "skills": "TensorFlow, NLP, PyTorch", "interests": "AI Ethics, Research, Music"},
    {"id": 7, "name": "Olivia_FullStack", "skills": "React, Django, PostgreSQL", "interests": "Web Apps, Open Source, Hiking"},
    {"id": 8, "name": "Lucas_Mobile", "skills": "Swift, Kotlin, Firebase", "interests": "App Development, Freelancing, Photography"},
    {"id": 9, "name": "Emma_Cyber", "skills": "Ethical Hacking, Pen Testing, Linux", "interests": "Cybersecurity Conferences, Gaming, Blockchain"},
    {"id": 10, "name": "Aiden_Backend", "skills": "Java, Spring Boot, Microservices", "interests": "System Design, Coffee, Chess"},
    # 90 more curated users...
    {"id": 11, "name": "Sophia_ARVR", "skills": "Unity, Blender, C#", "interests": "Metaverse, 3D Modeling, Art"},
    {"id": 12, "name": "Elijah_Startup", "skills": "Product Management, Marketing, Python", "interests": "VC Funding, Pitch Decks, Networking"},
    {"id": 13, "name": "Ava_QA", "skills": "Selenium, Jest, Cypress", "interests": "Test Automation, Yoga, Reading"},
    {"id": 14, "name": "James_Embedded", "skills": "C++, Arduino, IoT", "interests": "Robotics, DIY Projects, Drones"},
    {"id": 15, "name": "Isabella_DevRel", "skills": "Technical Writing, Public Speaking, Go", "interests": "Community Building, Conferences, Travel"},
    {"id": 16, "name": "Benjamin_FinTech", "skills": "Blockchain, Solidity, DeFi", "interests": "Crypto, Investing, Economics"},
    {"id": 17, "name": "Mila_BioTech", "skills": "Python, Bioinformatics, Genomics", "interests": "Healthcare Innovation, Research, Running"},
    {"id": 18, "name": "Oliver_GameDev", "skills": "Unreal Engine, C++, 3D Modeling", "interests": "Game Design, Esports, Anime"},
    {"id": 19, "name": "Charlotte_Agile", "skills": "Scrum, JIRA, Product Ownership", "interests": "Team Coaching, Leadership, Skiing"},
    {"id": 20, "name": "William_SysAdmin", "skills": "Linux, Bash, Networking", "interests": "Homelabs, Open Source, Hardware"},
    # Continued with clear patterns...
    # Example: AI/ML cluster (IDs 21-30)
    {"id": 21, "name": "Henry_ML", "skills": "Python, PyTorch, Computer Vision", "interests": "AI Research, Kaggle, Chess"},
    {"id": 22, "name": "Amelia_DataSci", "skills": "Pandas, R, SQL", "interests": "Data Journalism, Visualization, Politics"},
    # Web Dev cluster (IDs 31-40)
    {"id": 31, "name": "Leo_Frontend", "skills": "TypeScript, Vue, Tailwind", "interests": "Design Systems, Accessibility, Cycling"},
    # Hardware cluster (IDs 41-50)
    {"id": 41, "name": "Luna_Robotics", "skills": "ROS, Python, Electronics", "interests": "DIY Robots, STEM Outreach, Drones"},
    # ... up to ID 100

]
users += [
    {"id": 42, "name": "Blazing", "skills": "Python, Data Science", "interests": "Startups, AI, Catgirls"},
    {"id": 23, "name": "Jack_Vision", "skills": "OpenCV, Python, C++", "interests": "Self-Driving Cars, Robotics, Vision AI"},
    {"id": 24, "name": "Harper_NLP", "skills": "BERT, HuggingFace, Transformers", "interests": "Linguistics, AI Ethics, Podcasts"},
    {"id": 25, "name": "Daniel_Research", "skills": "Matlab, Deep Learning, PyTorch", "interests": "PapersWithCode, Academia, Meditation"},
    {"id": 26, "name": "Grace_GANs", "skills": "GANs, TensorFlow, Python", "interests": "Synthetic Data, Anime, Fashion AI"},
    {"id": 27, "name": "Matthew_AIProd", "skills": "ML Ops, Docker, AWS", "interests": "Model Deployment, Scaling, Automation"},
    {"id": 28, "name": "Chloe_BioML", "skills": "R, Biostatistics, ML", "interests": "Genetics, Healthcare, Sustainability"},
    {"id": 29, "name": "Sebastian_AIArt", "skills": "Stable Diffusion, Midjourney, Prompting", "interests": "AI Art, NFTs, Philosophy"},
    {"id": 30, "name": "Ella_CompBio", "skills": "BioPython, Genomics, Data Science", "interests": "Lab Automation, Research, Space"},
    
    # Web Dev Cluster
    {"id": 32, "name": "Aria_Web3", "skills": "Solidity, React, Web3.js", "interests": "DeFi, DAOs, Crypto Art"},
    {"id": 33, "name": "Logan_DesignSys", "skills": "Figma, Tailwind, Storybook", "interests": "UX, Component Libraries, Theming"},
    {"id": 34, "name": "Layla_Stack", "skills": "Next.js, Prisma, TypeScript", "interests": "SaaS, Startups, Indie Hacking"},
    {"id": 35, "name": "Wyatt_Frontier", "skills": "Remix, GraphQL, CSS Tricks", "interests": "Speed, Animation, UI Polish"},
    {"id": 36, "name": "Scarlett_JSNinja", "skills": "Vanilla JS, D3.js, Three.js", "interests": "Visualizations, Music, Coding Streams"},
    {"id": 37, "name": "Jayden_Builder", "skills": "Webflow, JavaScript, SEO", "interests": "Freelancing, No-Code, Blogging"},
    {"id": 38, "name": "Victoria_WebAI", "skills": "TF.js, WebGPU, ML5.js", "interests": "Browser AI, Edge ML, WebXR"},
    {"id": 39, "name": "Leo_SSG", "skills": "Gatsby, Hugo, Markdown", "interests": "Jamstack, Blogging, Markdown Tools"},
    {"id": 40, "name": "Nora_Forms", "skills": "React Hook Form, Zod, UX", "interests": "Form Design, Microcopy, Accessibility"},

    # Hardware Cluster
    {"id": 42, "name": "Ella_Mech", "skills": "SolidWorks, CAD, Mechanics", "interests": "Prototyping, Formula SAE, Machining"},
    {"id": 43, "name": "Mason_FPGA", "skills": "Verilog, VHDL, FPGA", "interests": "Signal Processing, Crypto Mining, AI Acceleration"},
    {"id": 44, "name": "Lily_Aero", "skills": "Matlab, Aerodynamics, C", "interests": "Drones, Rockets, Aerospace"},
    {"id": 45, "name": "Jackson_IoT", "skills": "MQTT, ESP32, Sensors", "interests": "Smart Homes, DIY, Remote Control"},
    {"id": 46, "name": "Camila_Circuit", "skills": "PCB Design, KiCAD, Altium", "interests": "Wearables, Bicycles, Repairing Tech"},
    {"id": 47, "name": "Luke_HardwareAI", "skills": "Edge TPU, Jetson Nano, Python", "interests": "Surveillance, Edge ML, Security"},
    {"id": 48, "name": "Hannah_RoboticsAI", "skills": "ROS2, Lidar, Python", "interests": "Navigation, SLAM, Dogs"},
    {"id": 49, "name": "Anthony_Embedded", "skills": "C, RTOS, Embedded Linux", "interests": "Real-Time Systems, Music Synths, Space"},
    {"id": 50, "name": "Zoey_Maker", "skills": "Arduino, 3D Printing, Tinkercad", "interests": "DIY Kits, Teaching Kids, Maker Faires"},

    # Continue with other clusters: AR/VR, DevRel, QA, DevOps, FinTech, SysAdmin, Product, etc.
    {"id": 51, "name": "Stella_AR", "skills": "ARKit, Swift, Unity", "interests": "Storytelling, Mobile AR, Theater"},
    {"id": 52, "name": "Nathan_VR", "skills": "Oculus SDK, C#, Unreal", "interests": "VR Games, Immersive Media, Sci-Fi"},
    {"id": 53, "name": "Brooklyn_QAOps", "skills": "Playwright, Jenkins, Docker", "interests": "CICD, QA Automation, SRE"},
    {"id": 54, "name": "Levi_DevRel", "skills": "Go, Blogging, Talks", "interests": "Tech Evangelism, Open Source, Mentoring"},
    {"id": 55, "name": "Zara_Product", "skills": "Figma, Roadmaps, Analytics", "interests": "User Feedback, MVPs, Product Hunt"},
    {"id": 56, "name": "Hudson_Crypto", "skills": "Solana, Rust, Smart Contracts", "interests": "DeFi, NFTs, DAO Governance"},
    {"id": 57, "name": "Aurora_Admin", "skills": "PowerShell, AD, Windows Server", "interests": "SysAdmin Humor, Downtime Horror Stories, Reddit"},
    {"id": 58, "name": "Easton_Infra", "skills": "Terraform, Ansible, GCP", "interests": "Infra as Code, DevSecOps, Dark Mode"},
    {"id": 59, "name": "Paisley_AIOps", "skills": "ELK Stack, Prometheus, Grafana", "interests": "Incident Response, Metrics, Debugging"},
    {"id": 60, "name": "Connor_CTO", "skills": "Leadership, Architecture, Scaling", "interests": "Startups, Growth, Board Games"},]
users += [
    {"id": 61, "name": "Riley_HCI", "skills": "User Research, Prototyping, Usability", "interests": "Inclusive Design, Psychology, Accessibility"},
    {"id": 62, "name": "Parker_Growth", "skills": "SEO, A/B Testing, Analytics", "interests": "SaaS Growth, Funnels, Memes"},
    {"id": 63, "name": "Aaliyah_EduTech", "skills": "EdTech, LMS, React", "interests": "Education Reform, Teaching, Notion"},
    {"id": 64, "name": "Xavier_Security", "skills": "Wireshark, Nmap, Kali Linux", "interests": "CTFs, Reverse Engineering, Dark Web"},
    {"id": 65, "name": "Elena_Accessibility", "skills": "ARIA, WCAG, UX", "interests": "Inclusive Tech, Advocacy, UI Testing"},
    {"id": 66, "name": "Hunter_Bard", "skills": "Prompt Engineering, LLMs, LangChain", "interests": "AI Assistants, Creative Writing, Theater"},
    {"id": 67, "name": "Naomi_TechArtist", "skills": "Shader Graph, VFX, 3D Art", "interests": "Game Jams, Blender, Fantasy Worlds"},
    {"id": 68, "name": "Eli_SRE", "skills": "Kubernetes, Helm, Monitoring", "interests": "Infra Stability, Dev Memes, Incident Logs"},
    {"id": 69, "name": "Bella_AgenticAI", "skills": "Auto-GPT, Agents, LangGraph", "interests": "Autonomous AI, Experimentation, Sci-Fi"},
    {"id": 70, "name": "Caleb_DAO", "skills": "Governance, Smart Contracts, dApps", "interests": "Web3 Communities, Privacy, Philosophy"},

    {"id": 71, "name": "Lillian_MobileML", "skills": "TensorFlow Lite, ONNX, Kotlin", "interests": "Edge AI, Fitness Tech, Accessibility"},
    {"id": 72, "name": "Isaac_HackTools", "skills": "Metasploit, Python, Bash", "interests": "Security Tools, Open Source, Hacking Ethics"},
    {"id": 73, "name": "Samantha_SaaS", "skills": "Stripe, Firebase, React", "interests": "B2B Tools, Landing Pages, Micro SaaS"},
    {"id": 74, "name": "Nathaniel_NLP", "skills": "SpaCy, LLMs, Vector Search", "interests": "Knowledge Graphs, Language, Learning"},
    {"id": 75, "name": "Penelope_FinApps", "skills": "Plaid, Python, Flask", "interests": "Finance, Budgeting Tools, Startups"},
    {"id": 76, "name": "Andrew_GameAI", "skills": "Unity ML Agents, C#, AI", "interests": "Game Logic, NPCs, Strategy Games"},
    {"id": 77, "name": "Ariana_HelpDesk", "skills": "Jira, Zendesk, ITSM", "interests": "Support Automation, UX Writing, Empathy"},
    {"id": 78, "name": "Christopher_LLMOps", "skills": "LangChain, Weaviate, Vector DBs", "interests": "AI Agents, Pipelines, Docs-as-Code"},
    {"id": 79, "name": "Sadie_Viz", "skills": "D3.js, Observable, Chart.js", "interests": "Data Stories, Journalism, Scrollytelling"},
    {"id": 80, "name": "Thomas_Metaverse", "skills": "Three.js, WebXR, Blender", "interests": "Virtual Worlds, Fashion, NFTs"},

    {"id": 81, "name": "Hailey_HealthTech", "skills": "FHIR, APIs, Flutter", "interests": "Healthcare, Fitness, Biohacking"},
    {"id": 82, "name": "Christian_TechLead", "skills": "Mentorship, Architecture, DevOps", "interests": "Leadership, Strategy, Coffee"},
    {"id": 83, "name": "Layla_Quant", "skills": "Python, NumPy, Finance", "interests": "Quantitative Trading, Stats, Chess"},
    {"id": 84, "name": "Jonathan_CivicTech", "skills": "GovTech, Python, Django", "interests": "Policy, Transparency, Hack for Good"},
    {"id": 85, "name": "Audrey_Promptly", "skills": "Prompt Design, ChatGPT, LLMs", "interests": "AI Creativity, Roleplay, Tools for Thought"},
    {"id": 86, "name": "Adrian_VRDesign", "skills": "VR UI, Spatial Audio, Unity", "interests": "Design Ethics, AR Toys, Immersion"},
    {"id": 87, "name": "Skylar_DevOps", "skills": "CI/CD, Docker, Monitoring", "interests": "Infra Automation, Efficiency, Scripting"},
    {"id": 88, "name": "Genesis_Cloud", "skills": "Azure, APIs, Serverless", "interests": "Cloud Functions, Green Tech, Music"},
    {"id": 89, "name": "Josiah_LowCode", "skills": "Airtable, Zapier, Bubble", "interests": "Productivity Tools, Indie Apps, No-Code"},
    {"id": 90, "name": "Valentina_HCI", "skills": "UX Research, Eye Tracking, AR", "interests": "Human Factors, Behavior, Accessibility"},

    {"id": 91, "name": "Dominic_Robotics", "skills": "Servo Control, ROS, Sensors", "interests": "DIY Bots, Automation, Exploration"},
    {"id": 92, "name": "Faith_MLOps", "skills": "MLFlow, FastAPI, Docker", "interests": "Model Lifecycle, Clean Code, Cooking"},
    {"id": 93, "name": "Owen_Compiler", "skills": "LLVM, Rust, C", "interests": "Language Design, Efficiency, Reverse Engineering"},
    {"id": 94, "name": "Kinsley_Gamification", "skills": "Unity, Game Theory, Python", "interests": "Learning Games, Rewards, UX Psychology"},
    {"id": 95, "name": "Brayden_Speech", "skills": "Speech-to-Text, DeepSpeech, Audio", "interests": "Language, AI Interfaces, Podcasts"},
    {"id": 96, "name": "Paislee_BioHack", "skills": "Genomics, CRISPR, Python", "interests": "Longevity, Lab Tech, Futurism"},
    {"id": 97, "name": "Jaxon_Synth", "skills": "Supercollider, Pure Data, Audio DSP", "interests": "Sound Design, Experimental Music, Synths"},
    {"id": 98, "name": "Alina_DevTools", "skills": "VSCode Extensions, LSP, Node.js", "interests": "Tooling, Productivity, DX"},
    {"id": 99, "name": "Micah_AccessibleWeb", "skills": "HTML, WAI-ARIA, Testing", "interests": "Web for All, Color Contrast, Usability"},
    {"id": 100, "name": "Piper_Quantum", "skills": "Qiskit, Quantum Circuits, Python", "interests": "Quantum Computing, Theoretical Physics, Math"}
]



@app.route('/')
def home():
    return "Welcome to the ML Flask API!"

# Endpoint to get all users (useful for frontend UI)
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

# ML Recommendation Endpoint
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


@app.route('/api/recommend', methods=['GET'])
def recommend():
    input_skills = request.args.get('skills', '')
    input_interests = request.args.get('interests', '')

    if not input_skills and not input_interests:
        return jsonify({'error': 'Missing skills and interests'}), 400

    input_text = f"{input_skills} {input_interests}"
    user_texts = [f"{u['skills']} {u['interests']}" for u in users]

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([input_text] + user_texts)
    similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

    user_scores = []
    for i, user in enumerate(users):
        score = round(similarities[i] * 100, 2)
        user_copy = user.copy()
        user_copy['match_percentage'] = f"{score}%"
        user_scores.append(user_copy)

    sorted_users = sorted(user_scores, key=lambda u: float(u['match_percentage'].rstrip('%')), reverse=True)
    return jsonify(sorted_users[:5])

if __name__ == '__main__':
    app.run(debug=True)
