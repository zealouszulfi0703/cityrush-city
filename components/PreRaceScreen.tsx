
import React, { useState, useEffect } from 'react';
import { GameMode } from '../types.ts';
import { getBangaloreRaceTip } from '../services/geminiService.ts';
import { Sun, Cloud, Wind, TrafficCone, Wrench, ArrowLeft, Lightbulb, Bot } from 'lucide-react';

interface PreRaceScreenProps {
  mode: GameMode;
  onStartRace: (isAgentRacing: boolean) => void;
  onBack: () => void;
}

const ConditionCard: React.FC<{ icon: React.ReactNode; title: string; value: string; colorClass: string }> = ({ icon, title, value, colorClass }) => (
    <div className="flex-1 min-w-[120px] bg-gray-800/60 p-3 rounded-lg flex items-center space-x-3">
        <div className={`p-2 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400">{title}</p>
            <p className="font-bold text-sm text-white">{value}</p>
        </div>
    </div>
);

const PreRaceScreen: React.FC<PreRaceScreenProps> = ({ mode, onStartRace, onBack }) => {
  const [raceTip, setRaceTip] = useState<string>('');
  const [loadingTip, setLoadingTip] = useState<boolean>(true);
  const [isAgentEnabled, setIsAgentEnabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchTip = async () => {
      setLoadingTip(true);
      const tip = await getBangaloreRaceTip();
      setRaceTip(tip);
      setLoadingTip(false);
    };
    fetchTip();
  }, []);

  const modeDetails = {
    [GameMode.Race]: { title: 'Race Mode', description: 'Get ready for a competitive race on the Outer Ring Road circuit.' },
    [GameMode.Practice]: { title: 'Practice Mode', description: 'Warm up session around the Cubbon Park loop.' },
    [GameMode.JustRoam]: { title: 'Just Roam', description: 'Explore the vibrant streets of Koramangala freely.' },
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <button onClick={onBack} className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
          <ArrowLeft size={18} />
          <span>Back to Lobby</span>
        </button>
        <h2 className="text-3xl font-bold font-orbitron text-center">{modeDetails[mode].title}</h2>
        <p className="text-center text-gray-400">{modeDetails[mode].description}</p>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <img src="https://picsum.photos/seed/map/800/200" alt="Race Map" className="w-full h-32 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-3">Live Conditions</h3>
          <div className="flex flex-wrap gap-3">
            <ConditionCard icon={<Sun size={20} />} title="Weather" value="Sunny" colorClass="bg-yellow-500/30 text-yellow-300" />
            <ConditionCard icon={<Wind size={20} />} title="Wind" value="5 km/h" colorClass="bg-blue-500/30 text-blue-300" />
            <ConditionCard icon={<TrafficCone size={20} />} title="Traffic" value="Moderate" colorClass="bg-orange-500/30 text-orange-300" />
            <ConditionCard icon={<Wrench size={20} />} title="Roads" value="Good" colorClass="bg-green-500/30 text-green-300" />
          </div>
        </div>
      </div>
      
      <div className="bg-cyan-900/40 border border-cyan-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-bold text-cyan-300 font-orbitron text-sm">AI RACE TIP</h4>
            {loadingTip ? (
              <p className="text-gray-400 italic text-sm animate-pulse">Generating strategic advice...</p>
            ) : (
              <p className="text-gray-200 text-sm">{raceTip}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 py-2">
        <Bot size={24} className={`transition-colors duration-300 ${isAgentEnabled ? 'text-cyan-400' : 'text-gray-500'}`} />
        <label htmlFor="agent-toggle" className="flex items-center cursor-pointer">
          <span className={`mr-3 font-bold transition-colors duration-300 ${isAgentEnabled ? 'text-white' : 'text-gray-400'}`}>
            Enable AI Agent Race
          </span>
          <div className="relative">
            <input
              id="agent-toggle"
              type="checkbox"
              className="sr-only"
              checked={isAgentEnabled}
              onChange={() => setIsAgentEnabled(!isAgentEnabled)}
              aria-label="Enable AI Agent Race"
            />
            <div className={`block w-14 h-8 rounded-full transition-colors ${isAgentEnabled ? 'bg-cyan-500' : 'bg-gray-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isAgentEnabled ? 'transform translate-x-6' : ''}`}></div>
          </div>
        </label>
      </div>

      <button
        onClick={() => onStartRace(isAgentEnabled)}
        className="w-full py-4 text-lg font-bold bg-cyan-500 text-gray-900 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 shadow-lg shadow-cyan-500/30"
      >
        {isAgentEnabled ? 'START AI AGENT' : 'START RACE'}
      </button>
    </div>
  );
};

export default PreRaceScreen;