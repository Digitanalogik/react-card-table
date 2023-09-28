import Table from './Components/Table/Table';
import './App.css';

const App = (): JSX.Element => {

  const CARDS = [
    { "number": 1, "title": "Card 1" },
    { "number": 2, "title": "Card 2" },
    { "number": 3, "title": "Card 3" },
    { "number": 4, "title": "Card 4" },
    { "number": 5, "title": "Card 5" },
    { "number": 6, "title": "Card 6" },
    { "number": 7, "title": "Card 7" },
    { "number": 8, "title": "Card 8" },
    { "number": 9, "title": "Card 9" },
    { "number": 10, "title": "Card 10" }
  ]

  return (
    <Table cards={CARDS}/>
  );
}

export default App;
