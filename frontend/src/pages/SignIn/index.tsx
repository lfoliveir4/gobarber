import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import Input from "../../components/Input";
import Button from "../../components/Button";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

const SignIn: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <img src={logo} alt="Gobarber" />

        <form>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="email" type="text" />

          <Input
            name="password"
            icon={FiLock}
            placeholder="senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>

          <a href="">Esqueci minha senha</a>
        </form>

        <a href="">
          <FiLogIn />
          Criar Conta
        </a>
      </Styles.Content>

      <Styles.Background />
    </Styles.Container>
  );
};

export default SignIn;
