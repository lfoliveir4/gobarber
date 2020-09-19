import React from 'react';
import * as Styles from './styles';

import {RectButtonProperties} from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <Styles.Container {...rest}>
      <Styles.ButtonText>{children}</Styles.ButtonText>
    </Styles.Container>
  );
};

export default Button;
