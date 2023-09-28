import './Card.css';

interface CardProps {
  number: number;
  title: string;
}

const Card = ({ number, title }: CardProps): JSX.Element => {
  return (
    <div className='card'>
      <div className='card-number'>{number}</div>
      <div className='card-title'>{title}</div>
    </div>
  );
}

export default Card
