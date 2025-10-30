
import React from 'react';
import { GameMode } from '../types.ts';
import { Bike, Compass, Trophy } from 'lucide-react';

interface LobbyScreenProps {
  onModeSelect: (mode: GameMode) => void;
}

const ModeButton: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-gray-700 rounded-md text-cyan-400">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold font-orbitron text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  </button>
);

const LobbyScreen: React.FC<LobbyScreenProps> = ({ onModeSelect }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 font-orbitron text-gray-100">Select Your Mode</h2>
      <p className="text-center text-gray-400 mb-8">Choose how you want to experience the streets of Bangalore.</p>
      <div className="space-y-4">
        <ModeButton
          icon={<Trophy size={24} />}
          title="Race Mode"
          description="Compete against others to be the fastest."
          onClick={() => onModeSelect(GameMode.Race)}
        />
        <ModeButton
          icon={<Bike size={24} />}
          title="Practice Mode"
          description="Hone your skills on a specific track."
          onClick={() => onModeSelect(GameMode.Practice)}
        />
        <ModeButton
          icon={<Compass size={24} />}
          title="Just Roam"
          description="Explore the city at your own pace."
          onClick={() => onModeSelect(GameMode.JustRoam)}
        />
      </div>
    </div>
  );
};

export default LobbyScreen;