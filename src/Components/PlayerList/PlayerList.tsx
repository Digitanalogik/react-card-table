// UserList.tsx
import  { ReactElement } from 'react';
import Player from '../../Interfaces/Player';
import './PlayerList.css';

interface UserListProps {
  players:  Player[];
}

const PlayerList = ({ players }: UserListProps): ReactElement => {

  return (
    <div className='player-list'>
      {players.map(player => 
        <div key={player.id} className='player-name'>{player.name}</div>
      )}
    </div>
  );
};

export default PlayerList;