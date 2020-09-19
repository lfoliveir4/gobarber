import React from 'react';
import {View, Text, Image} from 'react-native';

import * as Styles from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Styles.Container>
      <Image source={logo} />

      <Styles.Title>Faça seu logon</Styles.Title>

      <Input name="email" icon="mail" placeholder="Email" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Styles.Container>
  );
};

export default SignIn;
