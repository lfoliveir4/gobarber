import React from 'react';
import {View, Text, Image} from 'react-native';

import * as Styles from './styles';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Styles.Container>
      <Image source={logo} />

      <Styles.Title>Faça seu logon</Styles.Title>
    </Styles.Container>
  );
};

export default SignIn;
