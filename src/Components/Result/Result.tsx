import { ReactElement } from 'react';
import Card from '../Card/Card';
import { useGameContext } from '../../Context/GameContext';
import './Result.css';
import { ScrumPokerPlayer } from '../../Model/ScrumGame';

const Result = (): ReactElement => {

  const { players } = useGameContext();

  const renderVotes = (): ReactElement => {

    console.log("Rendering results: ", players);

    return (
      <div className={`cards result`}>
        {players.map((player: any) => (
          <div className='player-vote' key={player.id}>{player.name}
            <Card
              type="numeric"
              value={player.vote?.cardValue}
              title={player.vote?.cardTitle}
              description={player.name}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderAverage = (): ReactElement => { 
    return (
      <div className='average'>Average: {calculateAverage()}</div>
    );
  };

  const calculateAverage = (): number => {
    // Loop through players and calculate average
    let total: number = 0;
    players.forEach((player: ScrumPokerPlayer) => {
      console.log("Player ", player, " voted ", player.vote);
      console.log("Total:", total);

      if (player.vote?.cardValue) {
        console.log("Adding...", player.vote?.cardValue);
        total += player.vote?.cardValue;
      }
    });
    console.log("Total: ", total);
    const average = total / players.length;
    console.log("Average: ", average);

    // Round average to two decimals
    return Math.round(average * 100) / 100;
  };

  return (
    <div className='table'>
      {renderVotes()}
      {renderAverage()}
    </div>
  );
}

export default Result;
