import { ReactElement } from 'react';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Table from './Components/Table/Table';
import Result from './Components/Result/Result';
import PlayerList from './Components/PlayerList/PlayerList';
import MessageBox from './Components/MessageBox/MessageBox';
import VerticalContainer from './Components/VerticalContainer/VerticalContainer';
import { useGameContext } from './Context/GameContext';
import { CARDS } from './Model/ScrumGame';
import './App.css';

const App = (): ReactElement => {

  const { isLogged, room, players, allPlayersHaveVoted } = useGameContext();

  const renderResults = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title={`Results in ${room}`} />
        <div className='content'>
          <Result />
          <VerticalContainer>
            <PlayerList />
            <MessageBox />
          </VerticalContainer>
        </div>
      </div>
    );
  };

  const renderCardTable = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title={room} />
        <div className='content'>
          <Table cards={CARDS}/>
          <VerticalContainer>
            <PlayerList />
            <MessageBox />
          </VerticalContainer>
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
    if (allPlayersHaveVoted()) {
      return renderResults();
    } else {
      return renderCardTable();
    }
  } else {
    return renderRoomSelect();
  }
}

export default App;
