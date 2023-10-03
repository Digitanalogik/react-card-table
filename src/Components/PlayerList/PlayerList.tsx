// UserList.tsx
import  { ReactElement } from 'react';
import Player from '../../Interfaces/Player';
import { useGameContext } from '../../Context/GameContext';
import './PlayerList.css';

interface UserListProps {
  players:  Player[];
}

const PlayerList = ({ players }: UserListProps): ReactElement => {

  const { player } = useGameContext();

  // Always show current player on top of the list
  return (
    <div className='player-list'>
        <div key={player} className='player-name'>{player}</div>

        {players.filter(p => p.name !== player)
          .sort((a, b) => a.name.localeCompare(b.name)).map(p =>
            <div key={p.id} className='player-name'>{p.name}</div>
        )}
    </div>
  );
};

export default PlayerList;
