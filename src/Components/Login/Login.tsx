import React, { ReactElement } from 'react';
import './Login.css';
import { useGameContext } from '../../Context/GameContext';

const Login = (): ReactElement => {

  const { setIsLogged, player, setPlayer, room, setRoom } = useGameContext();

  const enterRoom = () => {
    setIsLogged(true);
  }


  return (
    <div className='login'>
    <div className='login-input'>
      <span className='label'>Player</span>
      <input type="text"
          id='player'
          className='player'
          aria-label='Player name'
          placeholder='Enter player name'
          value={player}
          onChange={(event) => setPlayer(event.target.value)}
        />
    </div>
    <div className='login-input'>
      <span className='label'>Room</span>
      <input type="text"
          id='room'
          className='room'
          aria-label='Room name'
          placeholder='Enter room name'
          value={room}
          onChange={(event) => setRoom(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === 'Enter') {
              enterRoom()
            } else if (event.key === 'Escape') {
              setRoom("");
            }
          }}
        />
    </div>
    <button id='enter' onClick={e => enterRoom()}>Enter</button>
  </div>
  );
}

export default Login;
