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
      <div className='header'>{title}
        <button id='logout' onClick={confirmLogout}>Exit</button>
      </div>
    );
  }
};

export default Header;
