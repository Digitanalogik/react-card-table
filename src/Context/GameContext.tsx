import { ReactElement, createContext, useContext, useState, useMemo } from 'react';

type GameContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  
  room: string;
  setRoom: (room: string) => void;

  player: string;
  setPlayer: (player: string) => void;
}

interface GameContextProps {
  children: ReactElement;

}

const GameContext = createContext<GameContextType>({} as GameContextType);

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
}

const GameContextProvider = ({ children }: GameContextProps): ReactElement => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("Default Room");
  const [player, setPlayer] = useState<string>("Default Player");

  const gameContextProviderValue = useMemo(() => (
    { isLogged, setIsLogged, room, setRoom, player, setPlayer }),
    [ isLogged, setIsLogged, room, setRoom, player, setPlayer ]);

  return (
    <GameContext.Provider value={gameContextProviderValue}>
      {children}
    </GameContext.Provider>
  );
}
export { GameContext, GameContextProvider, useGameContext };
