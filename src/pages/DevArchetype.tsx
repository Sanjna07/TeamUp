import React, { useState } from 'react';

const DevArchetype = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animation, setAnimation] = useState(false);

  const questions = [
    {
      id: 1,
      text: "When faced with a complex technical problem, you prefer to:",
      options: [
        { value: "architect", text: "Map out the entire system before diving in" },
        { value: "hacker", text: "Jump in and start coding solutions immediately" },
        { value: "analyst", text: "Research existing solutions and best practices" },
        { value: "collaborator", text: "Discuss with team members to brainstorm approaches" },
        { value: "perfectionist", text: "Break it down into manageable components with detailed plans" }
      ]
    },
    {
      id: 2,
      text: "Your ideal work environment is:",
      options: [
        { value: "visionary", text: "Open and flexible with freedom to explore new ideas" },
        { value: "craftsman", text: "Quiet and focused where you can concentrate deeply" },
        { value: "architect", text: "Structured with clear processes and documentation" },
        { value: "collaborator", text: "Collaborative with frequent team interaction" },
        { value: "hacker", text: "Fast-paced with exciting challenges and minimal bureaucracy" }
      ]
    },
    {
      id: 3,
      text: "When learning a new technology, you typically:",
      options: [
        { value: "hacker", text: "Build a small project to experiment with it" },
        { value: "analyst", text: "Read documentation and tutorials thoroughly" },
        { value: "craftsman", text: "Follow structured learning paths and practice exercises" },
        { value: "visionary", text: "Explore creative applications beyond typical use cases" },
        { value: "collaborator", text: "Join communities or study groups to learn together" }
      ]
    },
    {
      id: 4,
      text: "Which statement best describes your approach to deadlines?",
      options: [
        { value: "perfectionist", text: "I prefer extra time to ensure quality and completeness" },
        { value: "hacker", text: "I thrive under pressure and often work intensely near deadlines" },
        { value: "craftsman", text: "I pace myself with consistent daily progress" },
        { value: "architect", text: "I create detailed timelines and stick to them rigorously" },
        { value: "analyst", text: "I build in buffer time for unexpected complications" }
      ]
    },
    {
      id: 5,
      text: "When collaborating on code, you value:",
      options: [
        { value: "perfectionist", text: "Meticulous code reviews and adherence to standards" },
        { value: "collaborator", text: "Clear communication and inclusive decision-making" },
        { value: "visionary", text: "Creative solutions that push boundaries" },
        { value: "craftsman", text: "Clean, efficient, and elegant implementations" },
        { value: "hacker", text: "Quick iterations and practical results" }
      ]
    },
    {
      id: 6,
      text: "How do you prefer to handle project documentation?",
      options: [
        { value: "architect", text: "Comprehensive documentation before implementation begins" },
        { value: "analyst", text: "Well-structured documentation that evolves with the project" },
        { value: "hacker", text: "Minimal documentation focusing on critical components only" },
        { value: "craftsman", text: "Clean inline comments and self-documenting code" },
        { value: "collaborator", text: "Collaborative wikis and living documents" }
      ]
    },
    {
      id: 7,
      text: "When it comes to new tools or frameworks, you tend to:",
      options: [
        { value: "visionary", text: "Be an early adopter, excited to explore cutting-edge technology" },
        { value: "analyst", text: "Evaluate thoroughly before adoption, weighing pros and cons" },
        { value: "craftsman", text: "Master the fundamentals before moving to new technologies" },
        { value: "architect", text: "Consider how they fit into the larger technical ecosystem" },
        { value: "hacker", text: "Try them out immediately if they might solve a pressing problem" }
      ]
    },
    {
      id: 8,
      text: "Your approach to refactoring code is:",
      options: [
        { value: "perfectionist", text: "Regularly refactor to maintain high code quality" },
        { value: "hacker", text: "Refactor only when necessary to implement new features" },
        { value: "architect", text: "Plan comprehensive refactoring phases into project timelines" },
        { value: "craftsman", text: "Incrementally improve code while preserving functionality" },
        { value: "analyst", text: "Analyze performance metrics to identify refactoring priorities" }
      ]
    }
  ];

  const archetypes = {
    "architect": {
      title: "The Strategic Architect",
      description: "You excel at designing complex systems with an eye for scalability and future needs. You prefer thorough planning and systematic approaches, often creating comprehensive documentation and architecture diagrams. Your strength lies in creating robust foundations that withstand the test of time.",
      strengths: "System design, long-term planning, technical documentation",
      challenges: "May sometimes get caught in analysis paralysis or overengineering",
      color: "bg-indigo-100 border-indigo-500",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-indigo-700",
      icon: "M12 6V2m0 4h4m-4 0h-4m4 18v-4m0 4h-4m4 0h4m-6-6h8m8-6h-4m0 0v-4m0 4v4m-18-4h4m0 0v4m0-4v-4"
    },
    "hacker": {
      title: "The Agile Innovator",
      description: "You're a quick-thinking problem solver who thrives under pressure. You value practical results and aren't afraid to use creative approaches to overcome obstacles. Your rapid prototyping abilities and comfort with experimentation make you excellent at finding solutions in uncharted territory.",
      strengths: "Rapid prototyping, creative problem-solving, adaptability",
      challenges: "May sometimes prioritize speed over maintainability or documentation",
      color: "bg-red-100 border-red-500",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-700",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    "craftsman": {
      title: "The Code Artisan",
      description: "You approach coding as a craft, valuing elegance, efficiency, and quality. You take pride in writing clean, well-structured code that others can easily understand and maintain. Your attention to detail and commitment to excellence results in reliable, optimized solutions.",
      strengths: "Code quality, optimization, maintainable implementations",
      challenges: "May sometimes spend too much time perfecting details that aren't critical",
      color: "bg-amber-100 border-amber-500",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-700",
      icon: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
    },
    "analyst": {
      title: "The Methodical Sage",
      description: "You approach technical challenges with careful research and analysis. You value evidence-based decisions and thorough understanding of problems before implementing solutions. Your comprehensive knowledge and systematic approach ensure reliable outcomes and fewer surprises.",
      strengths: "Research, risk assessment, technical evaluation",
      challenges: "May sometimes hesitate to act without complete information",
      color: "bg-emerald-100 border-emerald-500",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-700",
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    },
    "collaborator": {
      title: "The Team Catalyst",
      description: "You shine in collaborative environments where ideas can be shared and refined. You value effective communication and inclusive processes that leverage diverse perspectives. Your ability to bridge technical and interpersonal domains makes you excellent at coordinating complex projects.",
      strengths: "Team coordination, knowledge sharing, integrating diverse inputs",
      challenges: "May sometimes depend too heavily on consensus for technical decisions",
      color: "bg-sky-100 border-sky-500",
      gradientFrom: "from-sky-500",
      gradientTo: "to-sky-700",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    "visionary": {
      title: "The Tech Trailblazer",
      description: "You're drawn to innovation and pushing boundaries with technology. You easily spot emerging trends and creative applications of new tools. Your forward-thinking perspective and willingness to explore uncharted territory make you a valuable driver of technological advancement.",
      strengths: "Innovation, trend-spotting, creative applications",
      challenges: "May sometimes pursue novelty at the expense of proven approaches",
      color: "bg-purple-100 border-purple-500",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-700",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    "perfectionist": {
      title: "The Quality Guardian",
      description: "You have exacting standards and a meticulous approach to technical work. You value thorough testing, comprehensive edge case handling, and polished deliverables. Your commitment to excellence ensures reliable, high-quality outcomes that stand up to scrutiny.",
      strengths: "Quality assurance, attention to detail, comprehensive solutions",
      challenges: "May sometimes struggle with deadlines due to high standards",
      color: "bg-teal-100 border-teal-500",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-700",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    }
  };

  const calculateResult = () => {
    const counts = {};
    
    // Count the occurrences of each value
    Object.values(answers).forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    
    // Find the value with the highest count
    let maxCount = 0;
    let primaryType = '';
    let secondaryType = '';
    let secondMaxCount = 0;
    
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        secondaryType = primaryType;
        secondMaxCount = maxCount;
        primaryType = type;
        maxCount = count;
      } else if (count > secondMaxCount) {
        secondaryType = type;
        secondMaxCount = count;
      }
    });
    
    return {
      primary: primaryType,
      secondary: secondaryType
    };
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion]: option };
      setAnswers(newAnswers);
      
      setAnimation(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
        } else {
          const result = calculateResult();
          setResult(result);
          setShowResult(true);
        }
        setAnimation(false);
      }, 400);
    }, 300);
  };

  const resetQuiz = () => {
    setAnimation(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
      setResult(null);
      setSelectedOption(null);
      setAnimation(false);
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-block p-2 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">DevArchetype</h1>
        <p className="text-gray-600">Discover your technical personality profile</p>
      </div>
      
      <div className={`transition-all duration-300 ${animation ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
        {!showResult ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{questions[currentQuestion].text}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-4 border rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none ${
                      selectedOption === option.value 
                        ? 'bg-blue-50 border-blue-400 shadow-md' 
                        : 'hover:bg-blue-50 hover:border-blue-300 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 border transition-all duration-200 ${
                        selectedOption === option.value
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option.value && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <div className="inline-block p-3 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={archetypes[result.primary].icon} />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">Your DevArchetype™ Profile</h2>
              <p className="text-gray-600 mb-6">Based on your responses, here's your technical personality profile</p>
            </div>
            
            <div className={`p-6 rounded-lg border-l-4 mb-6 shadow-md ${archetypes[result.primary].color}`}>
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-4 bg-gradient-to-br ${archetypes[result.primary].gradientFrom} ${archetypes[result.primary].gradientTo}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={archetypes[result.primary].icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Primary: {archetypes[result.primary].title}</h3>
                  <p className="mb-4">{archetypes[result.primary].description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p><strong>Key Strengths:</strong> {archetypes[result.primary].strengths}</p>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p><strong>Growth Areas:</strong> {archetypes[result.primary].challenges}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg border-l-4 mb-8 shadow-md ${archetypes[result.secondary].color}`}>
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-4 bg-gradient-to-br ${archetypes[result.secondary].gradientFrom} ${archetypes[result.secondary].gradientTo}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={archetypes[result.secondary].icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Secondary: {archetypes[result.secondary].title}</h3>
                  <p>{archetypes[result.secondary].description}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">What This Means For Your Work</h3>
              </div>
              <p className="mb-4">
                Your combination of {archetypes[result.primary].title} and {archetypes[result.secondary].title} suggests you excel in environments that balance 
                {result.primary === "architect" || result.primary === "perfectionist" || result.primary === "analyst" ? " structure" : 
                 result.primary === "hacker" || result.primary === "visionary" ? " innovation" : 
                 " craftsmanship"} with 
                {result.secondary === "collaborator" ? " teamwork" : 
                 result.secondary === "visionary" || result.secondary === "hacker" ? " creativity" : 
                 " methodical approaches"}.
              </p>
              <p>
                This profile thrives on projects that require both 
                {result.primary === "architect" ? " systemic thinking" : 
                 result.primary === "hacker" ? " quick problem-solving" : 
                 result.primary === "craftsman" ? " technical excellence" : 
                 result.primary === "analyst" ? " deep analysis" : 
                 result.primary === "collaborator" ? " team coordination" : 
                 result.primary === "visionary" ? " innovative thinking" : 
                 " quality assurance"} and 
                {result.secondary === "architect" ? " structured planning" : 
                 result.secondary === "hacker" ? " adaptability" : 
                 result.secondary === "craftsman" ? " attention to detail" : 
                 result.secondary === "analyst" ? " methodical evaluation" : 
                 result.secondary === "collaborator" ? " effective communication" : 
                 result.secondary === "visionary" ? " forward-thinking" : 
                 " thoroughness"}.
              </p>
            </div>
            
            <div className="text-center">
              <button 
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
              >
                Take The Test Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevArchetype;