import React, { useState } from 'react';

interface MatchResult {
  name: string;
  match_percentage: number;
  skills: string;
  interests: string;
}

const AIMatchmaker: React.FC = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!skills.trim() || !interests.trim()) {
      alert('Please enter both skills and interests.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/recommend?skills=${encodeURIComponent(
          skills
        )}&interests=${encodeURIComponent(interests)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-8 text-center font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Find Your Hackathon Buddy 🤖</h1>

      <div className="max-w-xl mx-auto space-y-4 mb-6">
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (e.g. python, data science)"
          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] text-white text-base outline-none"
        />
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Enter your interests (e.g. ai, startups)"
          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] text-white text-base outline-none"
        />
        <button
          onClick={getRecommendations}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition duration-200"
        >
          {loading ? 'Matching...' : 'Get Recommendations'}
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {results.map((user, index) => (
          <div
            key={index}
            onClick={() => alert(`You clicked on ${user.name}`)}
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer text-left p-5 rounded-xl my-4 transition-transform transform hover:scale-[1.02]"
          >
            <div className="text-[#5ac8fa] text-xl font-bold">{user.name}</div>
            <div className="text-gray-300 mt-2">
              <strong>Match:</strong> {user.match_percentage}%
            </div>
            <div className="text-gray-300 mt-1">
              <strong>Skills:</strong> {user.skills}
            </div>
            <div className="text-gray-300 mt-1">
              <strong>Interests:</strong> {user.interests}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIMatchmaker;
