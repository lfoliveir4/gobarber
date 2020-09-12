import React from "react";
import { FiLogIn } from "react-icons/fi";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

const SignIn: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <img src={logo} alt="Gobarber" />

        <form>
          <h1>Faça seu login</h1>

          <input placeholder="email" type="text" />

          <input placeholder="senha" type="password" />

          <button type="submit">Entrar</button>

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
