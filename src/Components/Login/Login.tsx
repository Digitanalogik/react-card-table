import { ReactElement } from 'react';
import { useGameContext } from '../../Context/GameContext';
import { post } from '../../Services/ApiClient';
import './Login.css';

const Login = (): ReactElement => {

  const { setIsLogged, player, setPlayer, room, setRoom, secret, setSecret } = useGameContext();

  const enterRoom = async () => {
    // JSON data to send to the API as HTTP POST body payload
    const data = {
      playerName: player,
      roomName: room,
      roomSecret: secret
    }

    // Display debug information in the client browser
    console.group('Scrum Poker - Enter Room');
    console.log('Player: ', player);
    console.log('Room: ', room);
    console.log('Secret: ', secret);
    console.groupEnd();

    try {
      const response = await post('/player', JSON.stringify(data));
      console.log('Response from API:', response);
      setIsLogged(true);
    } catch (error) {
      console.error('Error during API request:', error);
      setIsLogged(false);
    }
  }

  return (
    <div className='login'>
    <div className='login-input'>
      <span className='label'>Player</span>
      <input type="text"
          id='player'
          className='player'
          aria-label='Player name'
          placeholder='What is your name?'
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
          placeholder='Where do you want to play?'
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
    <div className='login-input'>
      <span className='label'>Secret</span>
      <input type="text"
          id='secret'
          className='secret'
          aria-label='Room secret'
          placeholder='Optional: room secret'
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === 'Enter') {
              if (window.confirm("Enter room " + room + " as " + player + "?")) {
                enterRoom();
              }
            } else if (event.key === 'Escape') {
              setSecret("");
            }
          }}
        />
    </div>
    <button id='enter' onClick={e => enterRoom()}>Enter</button>
  </div>
  );
}

export default Login;
