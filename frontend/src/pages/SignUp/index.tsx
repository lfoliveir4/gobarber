import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
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
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().min(6, "No minimo 6 digitos"),
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
      <Styles.Background />
      <Styles.Content>
        <img src={logo} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
