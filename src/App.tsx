import { ReactElement } from 'react';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Table from './Components/Table/Table';
import PlayerList from './Components/PlayerList/PlayerList';
import { useGameContext } from './Context/GameContext';
import { CARDS, PLAYERS } from './Model/ScrumGame';
import './App.css';

const App = (): ReactElement => {

  const { isLogged, room } = useGameContext();

  const renderCardTable = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title={room} />
        <div className='content'>
          <Table cards={CARDS}/>
          <PlayerList players={PLAYERS}/>
        </div>
      </div>
    );
  };

  const renderRoomSelect = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title='Select Room' />
        <div className='content'>
          <Login />
        </div>
      </div>
    );
  };
  
  if (isLogged) {
    return renderCardTable();
  } else {
    return renderRoomSelect();
  }
}

export default App;
