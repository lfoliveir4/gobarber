import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";

import GetValidationErrors from "../../utils/GetValidationErrors";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    console.log(data);

    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("Senha Obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.log(error);

      const errors = GetValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Styles.Container>
      <Styles.Content>
        <img src={logo} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

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
