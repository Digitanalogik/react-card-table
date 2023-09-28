// UserList.tsx
import React, { FunctionComponent } from 'react';
import Player  from '../../Interfaces/Player';
import './PlayerList.css';

interface UserListProps {
  players:  Player[];
}

const PlayerList: FunctionComponent<UserListProps> = ({ players }) => {

  console.log("Render players:", players);

  return (
    <div className='player-list'>
      {players.map(player => 
        <div key={player.id} className='player-name'>{player.name}</div>
      )}
    </div>
  );
};

export default PlayerList;