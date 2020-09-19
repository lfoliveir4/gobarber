import React from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";

import Input from "../../components/Input";
import Button from "../../components/Button";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

const SignIn: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Styles.Container>
      <Styles.Background />
      <Styles.Content>
        <img src={logo} alt="Gobarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input name="email" icon={FiMail} placeholder="email" type="text" />

          <Input
            name="password"
            icon={FiLock}
            placeholder="senha"
            type="password"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Styles.Content>
    </Styles.Container>
  );
};

export default SignIn;
