import React, { useCallback, useRef, useState } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useToast } from "../../context/ToastContext";

import GetValidationErrors from "../../utils/GetValidationErrors";

import * as Styles from "./styles";

import logo from "../../assets/images/logo.svg";
import api from "../../services/ApiClient";

interface ForgotPasswordFormdata {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormdata) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/forgot", { email: data.email });

        addToast({
          type: "success",
          title: "E-mail de recuperação enviado.",
          description:
            "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description:
            "Ocorreu um erro ao tentar realizar a recuperação de senha senha, tente novamente",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.AnimationContainer>
          <img src={logo} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>

            <Input name="email" icon={FiMail} placeholder="email" type="text" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Voltar ao login
          </Link>
        </Styles.AnimationContainer>
      </Styles.Content>

      <Styles.Background />
    </Styles.Container>
  );
};

export default ForgotPassword;
