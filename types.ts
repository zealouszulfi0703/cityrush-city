export enum GameScreen {
  Lobby = 'LOBBY',
  PreRace = 'PRE_RACE',
  Gameplay = 'GAMEPLAY',
}

export enum GameMode {
  Practice = 'PRACTICE',
  Race = 'RACE',
  JustRoam = 'JUST_ROAM',
}

export interface User {
  userId: string;
  agentId: string;
}

export interface GameState {
  screen: GameScreen;
  mode?: GameMode;
  isAgentRacing?: boolean;
}
