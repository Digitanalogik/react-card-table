import { ReactElement } from 'react';
import './Card.css';

export interface CardProps {
  type: string;
  value: number;
  title: string;
  description?: string
  image?: string;
  selected?: boolean;
  onClick?: () => void;
}

const Card = ({ type, value, title, description, image, selected, onClick }: CardProps): ReactElement => {

  let cardClass = "card";
  if (selected) {
    cardClass += " selected";
  }

  console.log("Render Card - selected Card is", selected);

  const renderCard = () => {
    if (type === 'numeric') {
      return renderNumeric();
    } else {
      return renderSpecial();
    }
  };

  const renderNumeric = () => {
    return (
      <div className={cardClass} onClick={onClick}>
        <span className="card-number">{value}</span>
        <div className="card-title">{title}</div>
      </div>  
    );
  };

  const renderSpecial = () => {
    return (
      <div className={cardClass}>
        <span className="card-text">{title}</span>
        <img className="card-image" src={image} alt={description} />
        <div className="card-title">{description}</div>
      </div>  
    );
  };

  return renderCard();
}

export default Card
