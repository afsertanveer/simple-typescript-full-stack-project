import React from "react";
import { user } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styles from "../styles/utils.module.css";
interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessfull: (user: user) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessfull }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();
  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessfull(user);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="username"
              label="Username"
              type="text"
              placeholder="username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />

            <TextInputField
              name="password"
              label="Password"
              type="password"
              placeholder="password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className={styles.width100}
            >
              Log In
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default LoginModal;
