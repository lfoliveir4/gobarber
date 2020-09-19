import React from 'react';
import {TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as Styles from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
  return (
    <Styles.Container>
      <Styles.Icon name={icon} size={20} color="#666360" />

      <Styles.TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Styles.Container>
  );
};

export default Input;
