import { ReactElement, createContext, useContext, useState, useMemo } from 'react';
import { ScrumPokerPlayer, DEFAULT_PLAYER } from '../Model/ScrumGame';

type GameContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  
  room: string;
  setRoom: (room: string) => void;

  player: ScrumPokerPlayer;
  setPlayer: (player: ScrumPokerPlayer) => void;

  players: ScrumPokerPlayer[];
  setPlayers: (players: ScrumPokerPlayer[]) => void;

  addPlayer: (player: ScrumPokerPlayer) => void;
  removePlayer: (id: string) => void;

  secret: string;
  setSecret: (secret: string) => void;
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
  const [secret, setSecret] = useState<string>("");
  const [player, setPlayer] = useState<ScrumPokerPlayer>(DEFAULT_PLAYER);
  const [players, setPlayers] = useState<Array<ScrumPokerPlayer>>([] as ScrumPokerPlayer[]);

  const addPlayer = (player: ScrumPokerPlayer) => {
    setPlayers([ ...players, player ]);
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  }

  const gameContextProviderValue = useMemo(() => (
    { isLogged, setIsLogged, room, setRoom, secret, setSecret, player, setPlayer, players, setPlayers, addPlayer, removePlayer }),
    [ isLogged, setIsLogged, room, setRoom, secret, setSecret, player, setPlayer, players, setPlayers, addPlayer, removePlayer ]);

  return (
    <GameContext.Provider value={gameContextProviderValue}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider, useGameContext };
