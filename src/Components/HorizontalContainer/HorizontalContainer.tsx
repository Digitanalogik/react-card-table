import React, { ReactElement } from "react";
import "./HorizontalContainer.css";

interface HorizontalContainerProps {
  children: React.ReactNode;
}

const HorizontalContainer = ({ children }: HorizontalContainerProps): ReactElement => {
  return (
    <div className="horizontal-container">
      {children}
    </div>
  )
}

export default HorizontalContainer;
