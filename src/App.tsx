import { ReactElement } from 'react';
import Table from './Components/Table/Table';
import PlayerList from './Components/PlayerList/PlayerList';
import Header from './Components/Header/Header';
import './App.css';

const App = (): ReactElement => {

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

  return (
    <div className='card-table-app'>
      <Header title='Card Table' />
      <div className='content'>
        <Table cards={CARDS}/>
        <PlayerList players={PLAYERS}/>
      </div>
    </div>
  );
}

export default App;
