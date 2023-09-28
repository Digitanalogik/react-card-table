import './Card.css';

interface CardProps {
  type: string;
  value: number;
  title: string;
  description?: string
}

const Card = ({ type, value, title, description }: CardProps): JSX.Element => {
  return (
  <div className="card">
    <div className={`card-content ${type}`}>
      {type === 'numeric' ? (
        <span className="card-number">{value}</span>
      ) : (
        <span className="card-text">{description}</span>
      )}
    </div>
    <div className="card-title">{title}</div>
  </div>  );
}

export default Card
