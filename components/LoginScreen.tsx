
import React from 'react';
import { User } from '../types.ts';
import { ShieldCheck, User as UserIcon } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  
  const handleLogin = () => {
    // In a real app, this would come from an authentication service.
    // Here, we generate unique IDs on the client for simulation.
    const user: User = {
      userId: `BR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      agentId: `AGENT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    };
    onLogin(user);
  };

  return (
    <div className="text-center animate-fade-in p-4">
      <div className="flex justify-center mb-6">
        <ShieldCheck className="w-16 h-16 text-cyan-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold font-orbitron text-gray-100">Production Environment</h2>
      <p className="text-gray-400 mt-2 mb-8">
        For security and to ensure unique race results, you need a unique Racer ID to continue.
      </p>

      <button
        onClick={handleLogin}
        className="w-full max-w-sm mx-auto py-4 text-lg font-bold bg-cyan-500 text-gray-900 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 shadow-lg shadow-cyan-500/30 flex items-center justify-center space-x-3"
      >
        <UserIcon size={22} />
        <span>Get Your Racer ID & Enter</span>
      </button>

      <div className="mt-8 text-sm text-gray-500">
        <p>In the Dev/Test environment, you can access the game directly without this step.</p>
        <p>This measure prevents duplicate entries and secures your race achievements.</p>
      </div>
    </div>
  );
};

export default LoginScreen;