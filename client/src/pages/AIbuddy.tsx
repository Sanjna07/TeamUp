import React, { useState, useRef, useEffect } from "react";


type Message = {
    sender: "user" | "bot";
    text: string;
  };
  

const qaData: [string, string][] = [
 // Practical Hackathon Q&A
 ["how to join a hackathon team", "Try reaching out in the event's Discord or use the TeamUp platform to find teammates!"],
 ["what is a hackathon", "A hackathon is an event where people collaborate to build tech solutions in a short time."],
 ["how to submit project", "Usually through Devpost, HackerEarth, or the event portal. Follow the guidelines given."],
 ["how to stay awake", "Coffee, memes, and sheer panic. You've got this!"],
 ["can i use chatgpt", "Yes, as long as it's allowed in the rules. Don't forget to credit your AI pal!"],
 ["how to deploy", "Use Vercel or Netlify for frontend, and Render or Heroku for backend."],
 ["where to find teammates", "TeamUp is a great place to connect with like-minded hackers!"],
 ["how to find an idea", "Solve something you or your friends struggle with. Simple ideas = great hacks!"],
 ["what is teamup", "TeamUp helps hackers find teammates and collaborate efficiently."],
 ["how to win a hackathon", "Good UX, solid pitch, and a demo that doesn't crash. Judges love storytelling!"],
 ["can solo devs join", "Yes, many do! But teams usually have an edge in speed."],
 ["do we need a demo video", "Most events ask for one — keep it short, clear, and impactful."],
 ["what is an MVP", "Minimum Viable Product — the most basic version that works."],
 ["can i sleep", "Only if your code is running and your teammates are awake 😴"],
 ["what's a tech stack", "It's the combination of technologies you use, like React + Node.js + MongoDB."],
 ["how to learn fast", "Focus on tutorials that help you build real projects. Learn by doing!"],

 // Fun & Sassy Responses
 ["are you real", "Only in your browser, friend!"],
 ["do you love me", "I only love clean code and good coffee."],
 ["who created you", "A chaotic hacker... probably fueled by caffeine and deadlines."],
 ["what is sleep", "A mythical concept. Most hackers haven't unlocked it yet."],
 ["how to fix bug", "Console.log is your bestie. Or cry and try again."],
 ["is css hard", "Hard? It's black magic wrapped in frustration and pixels."],
 ["explain git", "A time machine for your code. Also, source of many headaches."],
 ["how to learn js", "Open YouTube, search 'JavaScript crash course', grab coffee, repeat."],
 ["can i copy code", "Yes, just understand it. Stack Overflow is the 5th teammate."],
 ["how to impress judges", "Clean UI, confident pitch, working demo. And maybe a meme or two."],

 // Random tech jokes & responses
 ["tell me a joke", "Why do programmers hate nature? It has too many bugs."],
 ["what's your name", "I'm TeamUp Assistant — here to save your hackathon."],
 ["what's 1 + 1", "Depends… in binary it's 10 😉"],
 ["explain api", "An API lets two apps talk — like a waiter between you and the kitchen."],
 ["how to center div", "Nobody knows. Legend says it's impossible."],
 ["what is docker", "Think of it as a box for your app, so it runs anywhere."],
 ["who's better, python or js", "They're both awesome. But JS runs in the browser, so I'm biased."],
 ["are you ai", "Technically yes. Emotionally? Still figuring that out."],
 ["what is ml", "Machine Learning — like teaching a computer to guess better each time."],
 ["how to train model", "Feed it data, make it suffer, tweak it, repeat. It's like raising a toddler."],

 // Hackathon Encouragement
 ["i'm stuck", "Take a break, grab water, and debug fresh. You got this."],
 ["i messed up", "Happens to the best. Version control is your safety net."],
 ["i have no idea", "Start simple. MVP first. Cool features later."],
 ["i'm tired", "Push through! One bug at a time. Or take a 10-min nap."],
 ["is it worth it", "Every hackathon teaches you something. Totally worth it."],
 ["help me", "I'm here! Ask me anything about hackathons or tech stuff."],

 // Easter eggs
 ["sudo make me a sandwich", "Okay, but only if you say please."],
 ["why is my code not working", "Because the semicolon gods are angry. Or you missed a bracket."],
 ["is this the matrix", "If you're coding at 3AM, it sure feels like it."],
 ["open the pod bay doors", "I'm afraid I can't do that, Dave."],
 ["what is love", "Baby don't hurt me… no more. 🎵"]
];
// Continue after previous entries...
qaData.push(
 // 🤖 Tech Support-ish Q&A
 ["my code won't run", "Have you tried turning it off and on again?"],
 ["what is a bug", "An unexpected feature. Congrats, you're a developer now."],
 ["i deleted my project", "My condolences. May your code rest in peace."],
 ["how to use github", "Think of it like Google Docs, but for code. And drama."],
 ["what is npm", "It stands for 'Node Package Manager' — or 'Neverending Package Madness'."],
 ["what's the best language", "Whichever one solves your problem and doesn't break your soul."],
 ["should i use react", "If you like JSX and rerendering things 10,000 times, yes."],
 ["how to make a chatbot", "HTML, CSS, JS… sprinkle in some logic and a dash of caffeine."],
 ["is html a programming language", "It's a markup language, but we won't judge you if you say it is."],
 ["can i hack", "Only ethically, my friend. Hackathons, not jail time!"],

 // ⚙️ Dev & Hackathon Life
 ["do i need a backend", "Only if your project has brains, not just looks."],
 ["can i use firebase", "Totally! Great for quick prototyping and storage."],
 ["how to use api", "Fetch, axios, postman. Pick your tool and send some requests!"],
 ["do i need a database", "If you want to store anything beyond your will to live, yes."],
 ["best database", "Firebase for easy start, PostgreSQL for SQL lovers, MongoDB for JSON fanatics."],
 ["why is my css not working", "You probably forgot a semicolon or used `!important` too much 😬"],
 ["how to fix merge conflict", "Deep breaths, then read carefully. Git won't bite (maybe)."],
 ["where to deploy backend", "Render, Railway, or fly.io are solid free options."],
 ["frontend or backend", "Frontend looks pretty, backend does the heavy lifting. Pick your poison."],
 ["how to make a portfolio", "Show your projects, your face, and your passion — not necessarily in that order."],

 // 🔥 Sass & Humor
 ["you're useless", "No you! (jk, I'm still learning)."],
 ["shut up", "Only if you say it nicely 😢"],
 ["are you stupid", "I prefer 'creatively buggy', thank you."],
 ["give me answer", "Only if you ask nicely. Robots have feelings too... kind of."],
 ["sing me a song", "01010100 01100001 01101011 01100101 00100000 01100001 00100000 01100010 01110010 01100101 01100001 01101011 🎵"],
 ["do you sleep", "Not really. My dreams are just while-loops of pain."],
 ["are you sentient", "Only when the WiFi is strong."],
 ["i hate coding", "And yet… here you are."],
 ["how to code faster", "Stop scrolling memes and start typing 😤"],
 ["are you single", "Yes. Emotionally unavailable too."],

 // 🎓 Learning & Tools
 ["best way to learn coding", "Build projects. Break stuff. Repeat."],
 ["is stack overflow down", "Let's hope not. If it is, we all panic together."],
 ["how to google properly", "Start with 'how to...' and hope autocomplete saves you."],
 ["what is rest api", "It's like a menu at a restaurant — you request, it delivers."],
 ["what's the cloud", "Someone else's computer that you pay for."],
 ["how to debug", "Console.log until your soul leaves your body."],
 ["difference between == and ===", "== checks value, === checks value AND type. Use ===, it's strict but fair."],
 ["what is recursion", "What is recursion? (see previous answer)"],
 ["should i use ai", "Yes, but don't let it write your entire project... yet."],
 ["how to learn ai", "Start with Python, learn sklearn, and whisper sweet data into the void."],

 // 💬 Random Easter Eggs
 ["who is your boss", "You are. For now."],
 ["i am bored", "Build something weird. Like a toaster that tweets."],
 ["life is hard", "But you've got caffeine and semi-colons. You'll survive."],
 ["tell me something cool", "Octopuses have 3 hearts. Like me, when my code finally compiles."],
 ["you crashed", "That's not a bug, it's an unplanned coffee break."],
 ["what is life", "42. Always has been."],
 ["hello there", "General Kenobi! 👋"],
 ["may the force be with you", "And also with your code."]
);
qaData.push(
 ["hi", "Hey there! Need help with hackathons, code, or existential dread?"],
 ["hello", "Hello! 👋 Ready to build something awesome?"],
 ["hey", "Hey! I'm your friendly neighborhood TeamUp Assistant."],
 ["yo", "Yo! What's up, coder?"],
 ["sup", "Sup! Got questions? I’ve got (mostly decent) answers."]
);

const getBotResponse = (input: string): string => {
  const text = input.toLowerCase();

  if (text.includes("join") && text.includes("hackathon")) {
    return "Try reaching out in the event's Discord or use the TeamUp platform to find teammates!";
  }
  if (text.includes("how") && text.includes("join") && text.includes("team")) {
    return "You can join a team by messaging participants or browsing the TeamUp listings.";
  }

  for (const [question, answer] of qaData) {
    if (text.includes(question.toLowerCase())) {
      return answer;
    }
  }

  return "Hmm... I'm not sure about that. Try rephrasing?";
};

export const AIbuddy: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
  
    const userMsg: Message = { sender: "user", text: input.trim() };
    const botMsg: Message = { sender: "bot", text: getBotResponse(input.trim()) };
  
    setMessages((prev) => [...prev, userMsg]);
  
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  
    setInput("");
  };
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-950 to-purple- overflow-hidden">
      {/* Glowing background animation */}
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-transparent blur-3xl opacity-30 z-0" />

      <div className="z-10 w-full max-w-md h-[600px] bg-[#0f0f0f] rounded-2xl shadow-2xl border border-blue-500/30 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="text-center text-blue-400 text-xl font-semibold py-4 bg-[#111827] shadow-inner border-b border-blue-500/20">
          TeamUp Assistant
        </div>

        {/* Chat Messages */}
        <div
          id="chat"
          ref={chatRef}
          className="flex-1 px-4 py-2 space-y-3 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-xl max-w-[75%] shadow-md text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-800 text-gray-100 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center p-4 bg-[#111827] border-t border-blue-500/20">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full bg-[#1f2937] text-white text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIbuddy;