import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import api from "../../services/ApiClient";

import { useToast } from "../../context/ToastContext";

import GetValidationErrors from "../../utils/GetValidationErrors";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post("/users", data);

        history.push("/");

        addToast({
          type: "success",
          title: "Cadastro realizado",
          description: "Voce ja pode fazer seu logon no Gobarber",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "Ocorreu um erro ao fazer cadastro, tente novamente",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Styles.Container>
      <Styles.Background />
      <Styles.Content>
        <Styles.AnimationContainer>
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

          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </Styles.AnimationContainer>
      </Styles.Content>
    </Styles.Container>
  );
};

export default SignIn;
