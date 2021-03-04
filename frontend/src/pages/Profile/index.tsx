import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Input from "../../components/Input";
import Button from "../../components/Button";

import api from "../../services/ApiClient";

import { useToast } from "../../context/ToastContext";

import GetValidationErrors from "../../utils/GetValidationErrors";

import * as Styles from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const { user } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Styles.Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <Styles.AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </Styles.AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input name="email" icon={FiMail} placeholder="email" type="text" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            placeholder="Senha atual"
            type="password"
          />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Nova senha"
            type="password"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar nova senha"
            type="password"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Styles.Content>
    </Styles.Container>
  );
};

export default Profile;
