import React, { ButtonHTMLAttributes } from "react";

import * as Styles from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Styles.Container type="button" {...rest}>
    {children}
  </Styles.Container>
);

export default Button;
