import React, { ChangeEvent, useCallback, useRef } from "react";
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

import { AvatarInput, Container, Content } from "./styles";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const { user, updateUser } = useAuth();

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
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val) => !!val.length,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val) => !!val.length,
              then: Yup.string().required("Campo obrigatório"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password"), undefined], "Confirmação incorreta"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = Object.assign(
          { name, email },
          old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}
        );

        const response = await api.put("/profile", formData);

        updateUser(response.data);

        history.push("/dashboard");

        addToast({
          type: "success",
          title: "Perfil Aualizado",
          description:
            "Suas informações do perfil foram atualizadas com sucesso!",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na atualização",
          description: "Ocorreu um erro ao atualizar perfil, tente novamente",
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append("avatar", event.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser(response.data);
          addToast({ type: "success", title: "Avatar atualizado" });
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input
                type="file"
                name=""
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

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
      </Content>
    </Container>
  );
};

export default Profile;
