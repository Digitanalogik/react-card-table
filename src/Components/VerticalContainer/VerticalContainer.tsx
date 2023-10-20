import React, { ReactElement } from "react";
import "./VerticalContainer.css";

interface VerticalContainerProps {
  children: React.ReactNode;
}

const VerticalContainer = ({ children }: VerticalContainerProps): ReactElement => {
  return (
    <div className="vertical-container">
      {children}
    </div>
  )
}

export default VerticalContainer;
