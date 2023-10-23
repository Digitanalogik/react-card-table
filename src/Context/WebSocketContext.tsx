import React, { ReactElement, createContext, useContext, useState, useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useGameContext } from './GameContext';

type WebSocketContextType = {
  connectionStatus: string;

  lastMessage: MessageEvent | null;
  
  messageHistory: string[];
  setMessageHistory: (messageHistory: string[]) => void;

  sendMessage: (message: string) => void;
}

interface WebSocketContextProps {
  children: ReactElement;
}

const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType);

const useWebSocketConnection = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
}

const WebSocketContextProvider = ({ children }: WebSocketContextProps): ReactElement => {
  const { player, isLogged, setIsLogged } = useGameContext();
  const [ connectionStatus, setConnectionStatus ] = useState<string>("");

  const [ messageHistory, setMessageHistory ] = useState<string[]>([]);

  const DEFAULT_URL = "wss://bu0l60z3k2.execute-api.eu-north-1.amazonaws.com/production";
  const [websocketURL, setWebsocketURL] = useState<string>(`${DEFAULT_URL}?id=${player.id}&name=${player.name}`);

  const { sendMessage, lastMessage, readyState } = useWebSocket(websocketURL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      setIsLogged(true);
    },
    onMessage: (event) => {
      console.log("WebSocket message: ", event);
      
      const newBuffer = [ event.data, ...messageHistory ];
      setMessageHistory(newBuffer);

    },
    onClose: () => {
      console.log('WebSocket connection disconnected.');
      setIsLogged(true);
    },
    onError: (event) => {
      console.log("WebSocket error: ", event);
    },

    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  useEffect(() => {
    if (isLogged) {
      console.log("Current Player: ", player);
      setWebsocketURL(`${DEFAULT_URL}?id=${player.id}&name=${player.name}`); 
    }
  }, [player, isLogged, setWebsocketURL]);


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
    { connectionStatus, lastMessage, messageHistory, setMessageHistory, sendMessage }),
    [ connectionStatus, lastMessage, messageHistory, setMessageHistory, sendMessage ]);

  return (
    <WebSocketContext.Provider value={webSocketContextProviderValue}>
    {children}
  </WebSocketContext.Provider>

  );
}

export { WebSocketContext, WebSocketContextProvider, useWebSocketConnection };
