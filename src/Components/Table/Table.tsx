import { ReactElement } from 'react';
import Card, { CardProps } from '../Card/Card';
import './Table.css';

interface TableProps {
  cards?:  Array<CardProps>;
}

const Table = ({ cards }: TableProps): ReactElement => {

  const numericCards = cards?.filter(card => card.type === 'numeric');
  const specialCards = cards?.filter(card => card.type === 'special');

  const renderNumericCards = (): ReactElement => {
    return renderCards(numericCards, "numeric");
  };

  const renderSpecialCards = (): ReactElement => {
    return renderCards(specialCards, "special");
  };

  const renderCards = (cards: any, sectionName: string): ReactElement => {
    return (
      <div className={`cards ${sectionName}`}>
        {cards.map((card: any) => (
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

  return (
    <div className='table'>
      <div className="cards">
        {renderNumericCards()}
        {renderSpecialCards()}
      </div>
    </div>
  );
}

export default Table;
