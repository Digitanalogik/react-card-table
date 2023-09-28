import { ReactElement }from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): ReactElement => {
  return (
    <div className='header'>{title}</div>
  );
};

export default Header;