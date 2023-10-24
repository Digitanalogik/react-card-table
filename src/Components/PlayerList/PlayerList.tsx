import React, { ReactElement, useEffect } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { ScrumPokerPlayer } from '../../Model/ScrumGame';
import { get } from '../../Services/ApiClient';
import './PlayerList.css';

const PlayerList = (): ReactElement => {

  const pollingInterval = 60000; // Polling interval in milliseconds (30 seconds)

  const { player, players, setPlayers } = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get('/players');
      console.log("API response: ", response);

      if (Array.isArray(response)) {
        const dtoPlayers: ScrumPokerPlayer[] = response.map(p => {
          const dtoPlayer: ScrumPokerPlayer = { id: p.id, name: p.playerName };
          return dtoPlayer;
        }) 

        setPlayers(dtoPlayers);
      }
    }

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
  }, [setPlayers]); // Empty dependency array ensures the effect only runs once

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
