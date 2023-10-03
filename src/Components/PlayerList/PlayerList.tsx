// UserList.tsx
import { ReactElement, useEffect, useState } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { get } from '../../Services/ApiClient';
import './PlayerList.css';

const PlayerList = (): ReactElement => {

  const pollingInterval = 10000; // Polling interval in milliseconds (10 seconds)

  const { player, players, setPlayers } = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get('/players');
      setPlayers(response);

      console.log("API response: ", response);
    };

    // Create a function to start the polling
    const startPolling = () => {
      fetchData();

      // Set a timeout to call the startPolling function again after the polling interval
      return setTimeout(() => {
        startPolling();
      }, pollingInterval);
    };

    // Start polling for backend API
    const timeoutId = startPolling();

    // Cleanup function to clear the timeout when the component is unmounted
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures the effect only runs once

  // List all players
  useEffect(() => {
    console.group("Scrum Poker - Players");
    players.forEach(p => console.log(p.name));
    console.groupEnd();
  }, [players]);

  // Always show current player on top of the list
  return (
    <div className='player-list'>
        <div key={player.id} className='player-name'>{player.name}</div>

        {players.map(p =>
            <div key={p.id} className='player-name'>{p.name}</div>
        )}
    </div>
  );
};

export default PlayerList;
