import React, { useCallback, useRef, useContext } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import GetValidationErrors from "../../utils/GetValidationErrors";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { user, signIn } = useAuth();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
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

        await signIn({ email: data.email, password: data.password });

        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao fazer login, cheque as credenciais",
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.AnimationContainer>
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

          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </Styles.AnimationContainer>
      </Styles.Content>

      <Styles.Background />
    </Styles.Container>
  );
};

export default SignIn;
