import React, { ReactElement } from "react";
import { useWebSocketContext } from "../../Context/WebSocketContext";
import InfoRow from "../InfoRow/InfoRow";
import "./MessageBox.css";
import InputBox from "../InputBox/InputBox";

const MessageBox = () => {

  const { connectionStatus, messageHistory } = useWebSocketContext();

  const renderMessages = (): ReactElement => {
    const messages: ReactElement[] = [];

    messageHistory.forEach(msg => messages.push(
      <InfoRow key={msg.timestamp} data={msg.message} />
    ));

    return (
      <React.Fragment>
        {messages}
      </React.Fragment>
    ) 
    
  }

  return (
    <div className="message-box">
      <InputBox />
      {renderMessages()}
      <InfoRow data={connectionStatus} />
    </div>
  )
};

export default MessageBox;
