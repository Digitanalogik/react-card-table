import { ReactElement, useState } from 'react';
import Card, { CardProps } from '../Card/Card';
import { post } from '../../Services/ApiClient';
import './Table.css';

interface TableProps {
  cards?:  Array<CardProps>;
}

const Table = ({ cards }: TableProps): ReactElement => {

  const [selected, setSelected] = useState<number | null>(null);

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
            selected={isSelected(card.id)}
            onClick={() => select(card)}
        />
        ))}
      </div>
    );
  }

  const isSelected = (id: number): boolean => {
    return id === selected;
  };

  const select = async (card: any) => {
    console.log("Selected:", card);
    setSelected(card.id);

    const postData = {
      playerName: 'Default',
      cardValue: card?.value,
      cardTitle: card?.title
    };

    console.log("Post Data:", postData);

    try {
      const response = await post('/card', JSON.stringify(postData));
      console.log('Response from API:', response);
    } catch (error) {
      console.error('Error during API request:', error);
    }    
  };

  return (
    <div className='table'>
      {renderNumericCards()}
      {renderSpecialCards()}
    </div>
  );
}

export default Table;
