import { ReactElement } from 'react';
import Table from './Components/Table/Table';
import PlayerList from './Components/PlayerList/PlayerList';
import Header from './Components/Header/Header';
import './App.css';
import { GameContextProvider, useGameContext } from './Context/GameContext';

const App = (): ReactElement => {

  const { 
    isLogged, setIsLogged, 
    room, setRoom, 
    player, setPlayer } = useGameContext();

  const CARDS = [
    { id: 0, type: 'numeric', value: 0.5, title: 'Half' },
    { id: 1, type: 'numeric', value: 1, title: 'One' },
    { id: 2, type: 'numeric', value: 2, title: 'Two' },
    { id: 3, type: 'numeric', value: 3, title: 'Three' },
    { id: 4, type: 'numeric', value: 5, title: 'Five' },
    { id: 5, type: 'numeric', value: 8, title: 'Eight' },
    { id: 6, type: 'numeric', value: 10, title: 'Ten' },
    { id: 7, type: 'numeric', value: 13, title: 'Thirteen' },
    { id: 8, type: 'special', value: 0, title: 'Zero', description: "Shouldn't implement", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/No-Symbol.svg/240px-No-Symbol.svg.png' },
    { id: 9, type: 'special', value: 0, title: 'Confused', description: "Don't understand", image: 'https://cdn-icons-png.flaticon.com/512/5969/5969738.png' },
    { id: 10, type: 'special', value: 0, title: 'Coffee Break', description: "Let's have a break", image: 'https://icons.iconarchive.com/icons/iconarchive/fat-sugar-food/256/Drink-Coffee-icon.png' },
  ];

  const PLAYERS = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eva' },
    { id: 6, name: 'Fiona' },
    { id: 7, name: 'George' },
    { id: 8, name: 'Hannah' },
    { id: 9, name: 'Igor' },
    { id: 10, name: 'Jane' }
  ];

  const logout = () => {
    if (window.confirm("Exit room?")) {
      setIsLogged(false);
    }
  }

  const enterRoom = () => {
    setIsLogged(true);
  }

  const renderCardTable = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title={room} logout={logout} />
        <div className='content'>
          <Table player={player} room={room} cards={CARDS}/>
          <PlayerList players={PLAYERS}/>
        </div>
      </div>
    );
  };

  const renderRoomSelect = (): ReactElement => {
    return (
      <div className='card-table-app'>
        <Header title='Select Room' noLogout />
        <div className='content'>
          <div className='login'>
            <div className='login-input'>
              <span className='label'>Player</span>
              <input type="text"
                  id='player'
                  className='player'
                  aria-label='Player name'
                  placeholder='Enter player name'
                  value={player}
                  onChange={(event) => setPlayer(event.target.value)}
                />
            </div>
            <div className='login-input'>
              <span className='label'>Room</span>
              <input type="text"
                  id='room'
                  className='room'
                  aria-label='Room name'
                  placeholder='Enter room name'
                  value={room}
                  onChange={(event) => setRoom(event.target.value)}
                  onKeyDown={async (event) => {
                    if (event.key === 'Enter') {
                      enterRoom()
                    } else if (event.key === 'Escape') {
                      setRoom("");
                    }
                  }}
                />
            </div>
            <button id='enter' onClick={e => enterRoom()}>Enter</button>
          </div>
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
