import React, { ReactElement } from "react";
import "./InfoRow.css";

interface InfoRowProps {
  data: string;
}

const InfoRow = ({ data }: InfoRowProps): ReactElement => {
  return (
    <div className="info-row">
      {data}
    </div>
  )
}

export default InfoRow;
