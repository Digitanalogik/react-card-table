import { ReactElement }from 'react';
import { useGameContext  } from '../../Context/GameContext';
import { useWebSocketContext } from '../../Context/WebSocketContext';
import './Header.css';

interface HeaderProps {
  title: string;
  noLogout?: boolean;
}

const Header = ({ title, noLogout }: HeaderProps): ReactElement => {

  const { isLogged, setIsLogged  } = useGameContext();
  const { sendMessage } = useWebSocketContext();

  const newGame = () => {
    if (window.confirm("Start new game?")) {
      const NEW_ACTION = `{"action":"new"}`;
      console.log("Sending message over WebSocket: ", NEW_ACTION);
      sendMessage(NEW_ACTION);
    }
  }

  const flipCards = () => {
    if (window.confirm("Flip cards?")) {
      const FLIP_ACTION = `{"action":"flip"}`;
      sendMessage(FLIP_ACTION);
    }
  }

  const confirmLogout = () => {
    if (window.confirm("Exit room?")) {
      const LOGOUT_ACTION = `{"action":"logout"}`;
      sendMessage(LOGOUT_ACTION);
      setIsLogged(false);
    }
  }

  if (noLogout || !isLogged) {
    return (
      <div className='header'>{title}</div>
    );
  } else {
    return (
      <div className='header'>
        <span className='header-title'>{title}</span>
        <button id='new' onClick={newGame}>New Game</button>
        <button id='flip' onClick={flipCards}>Flip Cards</button>
        <button id='logout' onClick={confirmLogout}>Exit</button>
      </div>
    );
  }
};

export default Header;
