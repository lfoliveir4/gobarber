import React, { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

import * as Styles from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Styles.Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Styles.Container>
);

export default Input;
