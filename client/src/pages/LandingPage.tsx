import React, { useEffect } from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Users, Code2, Rocket, MessageCircle, Globe, Zap } from 'lucide-react';

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.4)_0%,transparent_50%)]"></div>
      
      {/* Floating elements backdrop */}
      {/* Floating elements backdrop */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(20)].map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 15 + Math.random() * 15;

    return (
      <div 
        key={i}
        className="absolute bg-white/5 rounded-full w-12 h-12 animate-float"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      ></div>
    );
  })}
</div>


      {/* Header Navigation */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-white text-2xl font-bold">&lt;/TeamUp&gt;</h2>
          </div>
          <nav className="hidden md:flex space-x-6 text-white/80">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#events" className="hover:text-white transition-colors">Events</a>
          </nav>
          <SignInButton mode="modal">
            <button className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all">
              Sign In
            </button>
          </SignInButton>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="mb-6 animate-fadeIn">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-7xl font-extrabold">
              &lt;/TeamUp&gt;
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 animate-slideUp opacity-0" style={{animationDelay: "0.3s", animationFillMode: "forwards"}}>
            Find your perfect hackathon teammates
          </h1>
          <p className="text-xl mb-8 text-white/80 animate-slideUp opacity-0" style={{animationDelay: "0.5s", animationFillMode: "forwards"}}>
            Connect with developers, designers, and innovators who share your passion for building amazing projects
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-12 animate-fadeIn" style={{animationDelay: "0.7s"}}>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all transform hover:scale-105 w-48 md:w-auto">
                Get Started
              </button>
            </SignInButton>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all w-48 md:w-auto">
              Learn More
            </button>
          </div>
        </div>
        
        
      </div>
      
      {/* Features Section */}
      <div id="features" className="relative z-10 py-24 bg-gradient-to-b from-black/0 via-purple-900/20 to-black/0">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">How TeamUp Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transform transition duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-500/40 transition-all">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect</h3>
              <p className="text-white/70">Discover like-minded developers and creators based on skills, interests, and goals. Build your perfect hackathon team with our smart matching algorithm.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transform transition duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-500/40 transition-all">
                <MessageCircle className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Collaborate</h3>
              <p className="text-white/70">Join specialized chat rooms and project spaces. Share ideas, code snippets, and resources in real-time with integrated collaboration tools.</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transform transition duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="bg-indigo-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-indigo-500/40 transition-all">
                <Rocket className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Create</h3>
              <p className="text-white/70">Build amazing projects together with powerful project management tools. Track progress, assign tasks, and showcase your work to the community.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Community Section */}
      <div id="community" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Join our Thriving Community</h2>
            <p className="text-xl text-white/70">Connect with developers across the globe and build something amazing together</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Globe className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Network</h3>
              <p className="text-white/70">Access a worldwide community of developers, designers, and innovators ready to collaborate.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Code2 className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Skill Exchange</h3>
              <p className="text-white/70">Learn from peers and share your expertise in a collaborative environment.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Zap className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Hackathon Events</h3>
              <p className="text-white/70">Stay updated on upcoming hackathons and form your dream team before the competition.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.4)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.4)_0%,transparent_50%)]"></div>
            <div className="p-12 md:p-16 relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to find your dream team?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Join thousands of developers who've already found their perfect hackathon teammates</p>
              <SignInButton mode="modal">
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105">
                  Start Building Together
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-white text-2xl font-bold">&lt;/TeamUp&gt;</h2>
              <p className="text-white/60 mt-2">Find your perfect hackathon teammates</p>
            </div>
            <div className="flex space-x-8 text-white/60">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-white/40 text-sm">
            © 2025 TeamUp. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;