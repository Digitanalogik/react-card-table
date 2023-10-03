// UserList.tsx
import  { ReactElement } from 'react';
import { ScrumPokerPlayer } from '../../Model/ScrumGame';
import { useGameContext } from '../../Context/GameContext';
import './PlayerList.css';

interface UserListProps {
  players:  ScrumPokerPlayer[];
}

const PlayerList = ({ players }: UserListProps): ReactElement => {

  const { player } = useGameContext();

  // Always show current player on top of the list
  return (
    <div className='player-list'>
        <div key={player.id} className='player-name'>{player.name}</div>

        {players.filter(p => p.name !== player.name)
          .sort((a, b) => a.name.localeCompare(b.name)).map(p =>
            <div key={p.id} className='player-name'>{p.name}</div>
        )}
    </div>
  );
};

export default PlayerList;
