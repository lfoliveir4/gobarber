import React, { ButtonHTMLAttributes } from "react";

import * as Styles from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Styles.Container type="button" {...rest}>
    {loading ? "Carregando" : children}
  </Styles.Container>
);

export default Button;
