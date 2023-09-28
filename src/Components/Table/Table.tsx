import Card from '../Card/Card';
import './Table.css';

interface TableProps {
  cards?:  any;
}

const Table = ({ cards }: TableProps) => {
  return (
    <div className="table">
      {cards.map((card: any, index: number) => (
        <Card key={card.id} 
          type={card.type}
          value={card.value}
          title={card.title}
          description={card?.description}
          image={card?.image}
        />
      ))}
    </div>
  );
}

export default Table;