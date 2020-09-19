import React from "react";

import * as Styles from "./styles";

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <Styles.Container className={className}>
      {children}
      <span>{title}</span>
    </Styles.Container>
  );
};

export default Tooltip;
