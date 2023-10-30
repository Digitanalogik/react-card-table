import React, { ReactElement, createContext, useContext, useState, useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useGameContext } from './GameContext';
import { ScrumPokerPlayer, ScrumPokerVote } from '../Model/ScrumGame';

type WebSocketMessageType = {
  message: string;
  timestamp: string;
};

type WebSocketContextType = {
  connectionStatus: string;

  lastMessage: MessageEvent | null;
  
  messageHistory: WebSocketMessageType[];
  setMessageHistory: (messageHistory: WebSocketMessageType[]) => void;

  sendMessage: (message: string) => void;
}

interface WebSocketContextProps {
  children: ReactElement;
}

const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType);

const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
}

const WebSocketContextProvider = ({ children }: WebSocketContextProps): ReactElement => {

  const { player, addPlayer, removePlayer, isLogged, vote, allPlayersHaveVoted } = useGameContext();
  const [ connectionStatus, setConnectionStatus ] = useState<string>("");

  const [ messageHistory, setMessageHistory ] = useState<WebSocketMessageType[]>([]);

  const DEFAULT_URL = "wss://bu0l60z3k2.execute-api.eu-north-1.amazonaws.com/production";
  const [ websocketURL, setWebsocketURL ] = useState<string | null>(null);

  useEffect(() => {
    console.log("WebSocketContext - useEffect - Player:", player);
    if (player?.id !== "0" && isLogged) {
      console.log("Connecting WebSocket URL: ", `${DEFAULT_URL}?id=${player.id}&name=${player.name}`);
      setWebsocketURL(`${DEFAULT_URL}?id=${player.id}&name=${player.name}`);
    } else {
      setWebsocketURL(null);
    }
  }, [player, isLogged, setWebsocketURL]);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(websocketURL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      console.log("WebSocket message event: ", event);

      let newMessage: WebSocketMessageType = { message: '', timestamp: Date.now().toString() };

      try {
        if (event.data) {
          const data = JSON.parse(event.data);
          console.log("WebSocket event data: ", data);

          if (data?.action === "player-join") {
            const newPlayer: ScrumPokerPlayer = { id: data.id, name: data.name, room: player.room };
            addPlayer(newPlayer);
            newMessage.message = data.name + " joined the game.";
          } else if (data?.action === "player-logout") {
            removePlayer(data.id);
            newMessage.message = data.name + " left the game.";
          } else if (data?.action === "player-disconnect") {
            removePlayer(data.id);
            newMessage.message = data.name + " is disconnected from the game.";
          } else if (data?.action === "player-vote") {
            newMessage.message = data.name + " voted.";
            const receivedVote: ScrumPokerVote = { cardValue: parseFloat(data.cardValue), cardTitle: data.cardTitle };
            vote(data.id, receivedVote);

            if (allPlayersHaveVoted()) {
              newMessage.message = "All players have voted!";
            }

          } else if (data?.action === "player-message") {
            newMessage.message = data.name + ": " + data.message;
          } else {
            // ToDo: Handle more actions...
            newMessage.message = "Unknown action: " + data.action + " (" + JSON.stringify(data) + ")";
          }
        } else {
          newMessage.message = event.data;
        }
      } catch (error) {
        console.error("Error while parsing JSON message.");
      }

      const newBuffer = [ newMessage, ...messageHistory ];
      setMessageHistory(newBuffer);

    },
    onClose: () => {
      console.log('WebSocket connection disconnected.');
    },
    onError: (event) => {
      console.log("WebSocket error: ", event);
    },

    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  }, isLogged);

  useEffect(() => {
    switch(readyState) {
      case ReadyState.CONNECTING:
        setConnectionStatus("Connecting...");
        break;
      case ReadyState.OPEN:
        setConnectionStatus("Connected!");
        break;
      case ReadyState.CLOSING:
        setConnectionStatus("Closing...");
        break;
      case ReadyState.CLOSED:
        setConnectionStatus("Closed.");
        break;
      case ReadyState.UNINSTANTIATED:
        setConnectionStatus("Uninstantiated.");
        break;
      default:
        setConnectionStatus("Unknown state.");
        break;
    };  
  }, [readyState]);

  const webSocketContextProviderValue = useMemo(() => (
    { connectionStatus, lastMessage, messageHistory, setMessageHistory, sendMessage, getWebSocket }),
    [ connectionStatus, lastMessage, messageHistory, setMessageHistory, sendMessage, getWebSocket ]);

  return (
    <WebSocketContext.Provider value={webSocketContextProviderValue}>
    {children}
  </WebSocketContext.Provider>

  );
}

export { WebSocketContext, WebSocketContextProvider, useWebSocketContext };
