import React, { ReactElement, useEffect } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { ScrumPokerPlayer } from '../../Model/ScrumGame';
import { get } from '../../Services/ApiClient';
import './PlayerList.css';

const PlayerList = (): ReactElement => {

  const { player, players, setPlayers, room, secret } = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get(`/players?room=${room}&secret=${secret}`);
      console.log("API response: ", response);

      if (Array.isArray(response)) {
        const dtoPlayers: ScrumPokerPlayer[] = response.map(p => {
          const dtoPlayer: ScrumPokerPlayer = { id: p.id, name: p.name };
          return dtoPlayer;
        });

        setPlayers(dtoPlayers);
      }
    }

    fetchData();
  }, [room, secret, setPlayers]);
  
  // List all players
  useEffect(() => {
    console.groupCollapsed("Scrum Poker - Players");
    players.forEach(p => console.log(p.name));
    console.groupEnd();
  }, [players]);

  // Always show current player on top of the list
  return (
    <div className='player-list'>
        <div key={player.id} className='player-name'>{player.name}</div>

        {players.filter(p => p.id !== player.id).map(p =>
            <div key={p.id} className='player-name'>{p.name}</div>
        )}
    </div>
  );
};

export default PlayerList;
