
import React, { useState, useCallback, useEffect } from 'react';
import { GameScreen, GameState, GameMode, User } from './types.ts';
import LobbyScreen from './components/LobbyScreen.tsx';
import PreRaceScreen from './components/PreRaceScreen.tsx';
import GameplayScreen from './components/GameplayScreen.tsx';
import DeploymentGuide from './components/DeploymentGuide.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import { Bike, Car, Bot, Users, User as UserIcon, LogOut } from 'lucide-react';
import { IS_PRODUCTION } from './config/environment.ts';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({ screen: GameScreen.Lobby });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [bgImage, setBgImage] = useState<string>('');
  const [prevBgImage, setPrevBgImage] = useState<string>('');

  const bangaloreImages = [
    'https://images.unsplash.com/photo-1595134988358-68e1a5f1a561?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600882214347-15c2d3b3a37b?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595777457523-f3501a4e156a?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616297383611-658f8b417c9b?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567114631338-34a1b1842b5a?q=80&w=1920&auto=format&fit=crop',
  ];

  const selectRandomImage = useCallback(() => {
    const availableImages = bangaloreImages.filter(img => img !== bgImage);
    const newImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    setPrevBgImage(bgImage || newImage);
    setBgImage(newImage);
  }, [bgImage, bangaloreImages]);

  useEffect(() => {
    selectRandomImage();
  }, []); 

  const handleModeSelect = useCallback((mode: GameMode) => {
    setGameState({ screen: GameScreen.PreRace, mode });
  }, []);

  const handleStartRace = useCallback((isAgentRacing: boolean) => {
    if (gameState.mode) {
      setGameState({ 
        screen: GameScreen.Gameplay, 
        mode: gameState.mode,
        isAgentRacing: isAgentRacing,
      });
    }
  }, [gameState.mode]);

  const handleExitRace = useCallback(() => {
    setGameState({ screen: GameScreen.Lobby });
    selectRandomImage();
  }, [selectRandomImage]);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setGameState({ screen: GameScreen.Lobby });
  }, []);

  const renderGameContent = () => {
    switch (gameState.screen) {
      case GameScreen.PreRace:
        return <PreRaceScreen mode={gameState.mode!} onStartRace={handleStartRace} onBack={handleExitRace} />;
      case GameScreen.Gameplay:
        return <GameplayScreen mode={gameState.mode!} isAgentRacing={!!gameState.isAgentRacing} onExit={handleExitRace} user={currentUser} />;
      case GameScreen.Lobby:
      default:
        return <LobbyScreen onModeSelect={handleModeSelect} />;
    }
  };

  const renderScreen = () => {
    if (IS_PRODUCTION && !currentUser) {
      return <LoginScreen onLogin={handleLogin} />;
    }
    return renderGameContent();
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen antialiased">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" 
        style={{backgroundImage: `url('${prevBgImage}')`, opacity: 1, zIndex: 0}}
      ></div>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" 
        style={{backgroundImage: `url('${bgImage}')`, opacity: 1, zIndex: 1}}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-2"></div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 z-10">
        <header className="w-full max-w-7xl mb-4">
          <div className="flex justify-between items-center">
            <div className="w-24 text-left">
              {IS_PRODUCTION ? (
                <span className="px-2 py-1 text-xs font-bold bg-red-500/50 text-red-300 rounded border border-red-500">PROD</span>
              ) : (
                <span className="px-2 py-1 text-xs font-bold bg-green-500/50 text-green-300 rounded border border-green-500">DEV</span>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-cyan-400 tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,255,255,0.5)]">
                Bangalore Racer
              </h1>
              <p className="text-gray-400 font-light">MVP v1.0: The Bicycle Challenge</p>
            </div>
            <div className="w-24 text-right">
              {IS_PRODUCTION && currentUser && (
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-2 text-sm text-cyan-300">
                    <UserIcon size={16} />
                    <span>{currentUser.userId}</span>
                  </div>
                  <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center space-x-1">
                    <LogOut size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="w-full max-w-4xl flex-grow flex items-center justify-center">
          <div className="w-full bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 border border-cyan-500/20 p-6 md:p-8">
            {renderScreen()}
          </div>
        </main>
        
        <footer className="w-full max-w-7xl mt-8 text-center text-gray-500 text-sm">
          <DeploymentGuide />
          <div className="flex justify-center items-center space-x-6 mt-4 opacity-50">
            <div className="flex items-center space-x-2"><Bike size={16} /><p>Bicycle</p></div>
            <div className="flex items-center space-x-2 text-gray-600"><Car size={16} /><p>Cars (Soon)</p></div>
            <div className="flex items-center space-x-2 text-gray-600"><Bot size={16} /><p>AI Racers (Soon)</p></div>
            <div className="flex items-center space-x-2 text-gray-600"><Users size={16} /><p>Multiplayer (Soon)</p></div>
          </div>
          <p className="mt-4">&copy; {new Date().getFullYear()} Bangalore Racer Project. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;