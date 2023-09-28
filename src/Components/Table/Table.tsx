import Card from '../Card/Card';
import './Table.css';

interface TableProps {
  cards?:  any;
}

const Table = ({ cards }: TableProps) => {
  return (
    <div className="table">
      {cards.map((card: any, index: number) => (
        <Card key={card.id} number={card.number} title={card.title} />
      ))}
    </div>
  );
}

export default Table;