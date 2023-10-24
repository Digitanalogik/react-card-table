import React, { useState, useCallback } from "react";
import { useWebSocketContext } from "../../Context/WebSocketContext";
import "./InputBox.css";

const InputBox = (): React.ReactElement => {

  const [ message, setMessage ] = useState<string>("");
  const { sendMessage } = useWebSocketContext();

  const handleSendMessage = useCallback(() => {
    const jsonMessage = `{"action": "sendmessage", "message": "${message}"}`;
    sendMessage(jsonMessage);
    setMessage("");
  }, [sendMessage, setMessage, message]);

  return (
    <div className="input-box">
      <input id="message-box" type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button id="send-button" onClick={handleSendMessage}>Send</button>
    </div>
  )
};

export default InputBox;
