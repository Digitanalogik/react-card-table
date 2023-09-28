import './Card.css';

interface CardProps {
  type: string;
  value: number;
  title: string;
  description?: string
}

const Card = ({ type, value, title, description }: CardProps): JSX.Element => {

  const renderCard = () => {
    if (type === 'numeric') {
      return renderNumeric();
    } else {
      return renderSpecial();
    }
  };

  const renderNumeric = () => {
    return (
      <div className="card">
        <span className="card-number">{value}</span>
        <div className="card-title">{title}</div>
      </div>  
    );
  };

  const renderSpecial = () => {
    return (
      <div className="card">
        <span className="card-text">{title}</span>
        <div className="card-title">{description}</div>
      </div>  
    );
  };

  return renderCard();
}

export default Card
