import './Card.css';

export interface CardProps {
  type: string;
  value: number;
  title: string;
  description?: string
  image?: string;
}

const Card = ({ type, value, title, description, image }: CardProps): JSX.Element => {

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
    console.log("Render special card: ", image);
    return (
      <div className="card">
        <span className="card-text">{title}</span>
        <img className="card-image" src={image} alt={description} />
        <div className="card-title">{description}</div>
      </div>  
    );
  };

  return renderCard();
}

export default Card
