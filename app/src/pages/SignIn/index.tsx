import React, {useCallback, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import * as Styles from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback((data: object) => {}, []);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Styles.Container>
            <Image source={logo} />

            <View>
              <Styles.Title>Faça seu logon</Styles.Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="Email" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <Styles.ForgotPassword onPress={() => {}}>
              <Styles.ForgotPasswordText>
                Esqueci minha senha
              </Styles.ForgotPasswordText>
            </Styles.ForgotPassword>
          </Styles.Container>
        </ScrollView>

        <Styles.CreateAccountButton
          onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="##ff9000" />

          <Styles.CreateAccountButtonText>
            Criar uma conta
          </Styles.CreateAccountButtonText>
        </Styles.CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
