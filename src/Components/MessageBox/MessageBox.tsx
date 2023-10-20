import React from "react";
import { useWebSocketConnection } from "../../Context/WebSocketContext";
import InfoRow from "../InfoRow/InfoRow";
import "./MessageBox.css";

const MessageBox = () => {

  const { connectionStatus } = useWebSocketConnection();

  return (
    <div className="message-box">
      <InfoRow data="Message Box" />
      <InfoRow data={connectionStatus} />
    </div>
  )
};

export default MessageBox;
