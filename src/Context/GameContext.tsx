import { ReactElement, createContext, useContext, useState, useMemo } from 'react';
import { ScrumPokerPlayer, DEFAULT_PLAYER, ScrumPokerVote } from '../Model/ScrumGame';

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

  vote: (playerId: string, vote: ScrumPokerVote) => void;
  allPlayersHaveVoted: () => boolean;

  showCards: boolean;
  setShowCards: (isLogged: boolean) => void;

  startNewGame: () => void;
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
  const [ isLogged, setIsLogged ] = useState<boolean>(false);
  const [ room, setRoom ] = useState<string>("Default Room");
  const [ secret, setSecret ] = useState<string>("");
  const [ player, setPlayer ] = useState<ScrumPokerPlayer>(DEFAULT_PLAYER);
  const [ players, setPlayers ] = useState<Array<ScrumPokerPlayer>>([] as ScrumPokerPlayer[]);
  const [ showCards, setShowCards ] = useState<boolean>(false);

  const gameContextProviderValue = useMemo(() => {
    const addPlayer = (player: ScrumPokerPlayer) => {
      setPlayers([ ...players, player ]);
    };
  
    const removePlayer = (id: string) => {
      setPlayers(players.filter(player => player.id !== id));
    };

    const vote = (playerId: string, vote: ScrumPokerVote) => {
      const votedPlayer = players.find(p => p.id === playerId);
      
      if (votedPlayer) {
        votedPlayer.hasVoted = true;
        votedPlayer.vote = vote;
      }
      setPlayers([ ...players ]);
      
      if (player.id === playerId) {
        const updatedPlayer = { ...player };
        updatedPlayer.hasVoted = true;
        updatedPlayer.vote = vote;
        setPlayer(updatedPlayer);
      }
    };

    const allPlayersHaveVoted = (): boolean => {
      return players.length > 0 && players.every(player => player.hasVoted);
    };

    const startNewGame = (): void => {
      // Clear all votes
      setPlayers(players.map(player => {
        player.hasVoted = false;
        player.vote = undefined;
        return player;  
      }));

      // Also the current player
      player.hasVoted = false;
      player.vote = undefined;

      // Disable condition to show results
      setShowCards(false);
    };

    return {
      isLogged, setIsLogged,
      room, setRoom,
      secret, setSecret,
      player, setPlayer,
      players, setPlayers,
      addPlayer, removePlayer,
      vote, allPlayersHaveVoted,
      showCards, setShowCards,
      startNewGame
    };
  }, [ isLogged, setIsLogged, room, setRoom, secret, setSecret, player, setPlayer, players, setPlayers, showCards, setShowCards ]);
  
  return (
    <GameContext.Provider value={gameContextProviderValue}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider, useGameContext };
