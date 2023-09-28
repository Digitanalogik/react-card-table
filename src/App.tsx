import Table from './Components/Table/Table';
import './App.css';

const App = (): JSX.Element => {

  const CARDS = [
    { id: 1, type: 'numeric', value: 1, title: 'One' },
    { id: 2, type: 'numeric', value: 2, title: 'Two' },
    { id: 3, type: 'numeric', value: 3, title: 'Three' },
    { id: 4, type: 'numeric', value: 4, title: 'Four' },
    { id: 5, type: 'numeric', value: 5, title: 'Five' },
    { id: 6, type: 'numeric', value: 6, title: 'Six' },
    { id: 7, type: 'numeric', value: 7, title: 'Seven' },
    { id: 8, type: 'numeric', value: 8, title: 'Eight' },
    { id: 9, type: 'numeric', value: 9, title: 'Nine' },
    { id: 10, type: 'numeric', value: 10, title: 'Ten' },
    { id: 11, type: 'special', value: 0, title: 'Coffee Break', description: "Let's have a coffee break" },
    { id: 12, type: 'special', value: 0, title: 'Confused', description: "I didn't understand the question" },
  ];

  return (
    <Table cards={CARDS}/>
  );
}

export default App;
