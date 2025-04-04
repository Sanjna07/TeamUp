import React from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Users, Code2, Rocket } from 'lucide-react';

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">TeamUp</h1>
          <p className="text-xl mb-8">Find your perfect hackathon teammates</p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Users className="w-12 h-12 mb-4 mx-auto text-white" />
              <h3 className="text-lg font-semibold">Connect</h3>
              <p className="text-sm opacity-80">Meet like-minded developers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Code2 className="w-12 h-12 mb-4 mx-auto text-white" />
              <h3 className="text-lg font-semibold">Collaborate</h3>
              <p className="text-sm opacity-80">Join specialized chat rooms</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Rocket className="w-12 h-12 mb-4 mx-auto text-white" />
              <h3 className="text-lg font-semibold">Create</h3>
              <p className="text-sm opacity-80">Build amazing projects together</p>
            </div>
          </div>

          <SignInButton mode="modal">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;