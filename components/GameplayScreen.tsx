import React from 'react';
import { GameMode, User } from '../types';

interface GameplayScreenProps {
  mode: GameMode;
  onExit: () => void;
  isAgentRacing: boolean;
  user: User | null;
}

const GameplayScreen: React.FC<GameplayScreenProps> = ({ mode, onExit, isAgentRacing, user }) => {
  const agentIdText = user && isAgentRacing ? `(${user.agentId})` : '';
  
  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full p-8">
      <div className="relative mb-8">
        <div className="absolute -inset-2 bg-cyan-500 rounded-lg blur opacity-50 animate-pulse"></div>
        <h2 className="relative text-3xl font-bold font-orbitron">Race in Progress!</h2>
      </div>
      <p className="text-lg text-gray-300 mb-2">
        Mode: <span className="font-bold text-white">{mode}</span>
        {isAgentRacing && (
          <span className="ml-4 px-3 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-300 rounded-full animate-pulse border border-cyan-500">
            AI AGENT ACTIVE {agentIdText}
          </span>
        )}
      </p>
      <p className="text-gray-400 mb-8">
        {isAgentRacing
          ? "Your AI Agent is racing through Bangalore's streets on your behalf!"
          : "This is where the magic happens. For now, imagine yourself cycling through Bangalore's streets!"}
      </p>
      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-8">
        <div className="h-1 bg-cyan-400 animate-loading-bar"></div>
      </div>
      <button
        onClick={onExit}
        className="px-8 py-3 text-md font-bold bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300/50"
      >
        End Race & Return to Lobby
      </button>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GameplayScreen;
