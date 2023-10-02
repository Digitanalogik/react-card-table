import { ReactElement }from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  noLogout?: boolean;
  logout?: () => void;
}

const Header = ({ title, noLogout, logout }: HeaderProps): ReactElement => {
  if (noLogout) {
    return (
      <div className='header'>{title}</div>
    );
  } else {
    return (
      <div className='header'>{title}
        <button id='logout' onClick={logout}>Exit</button>
      </div>
    );
  }
};

export default Header;
