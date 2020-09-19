import React, {useCallback, useRef} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleRegister = useCallback(() => {}, []);

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
              <Styles.Title>Crie sua conta</Styles.Title>
            </View>

            <Form ref={formRef} onSubmit={handleRegister}>
              <Input name="name" icon="user" placeholder="Crie sua conta" />
              <Input name="email" icon="mail" placeholder="Email" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Crie sua conta
              </Button>
            </Form>
          </Styles.Container>
        </ScrollView>

        <Styles.BackToSignIn onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="##ff9000" />

          <Styles.BackToSignInText>Voltar para logon</Styles.BackToSignInText>
        </Styles.BackToSignIn>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
