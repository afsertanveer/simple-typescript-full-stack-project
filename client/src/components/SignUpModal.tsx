import React from 'react';
import { user } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import styles from '../styles/utils.module.css';
import { useState } from 'react';
import { ConflictError } from '../errors/http_errors';

interface SignUpModalProps{
    onDismiss:()=>void,
    onSignUpSuccessful:(user:user)=>void
}
const SignUpModal = ({onDismiss,onSignUpSuccessful}:SignUpModalProps) => {
    const [errorText,setErrorText] = useState<string|null>(null);
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<SignUpCredentials>();
    async function onSubmit(credentials:SignUpCredentials){

        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser)
        } catch (error) {
            if(error instanceof ConflictError){
                setErrorText(error.message);
            }else{
                alert(error);
            }
            console.log(error);
        }
    }
    return (
        <div>
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>Sign Up</Modal.Header>
                <Modal.Body>
                    {
                        errorText && <Alert variant='danger'>{errorText}</Alert>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="username"
                        register={register}
                        registerOptions={{required:"Required"}}
                        error={errors.username}
                        />
                        
                        <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required:"Required"}}
                        error={errors.email}
                        />
                        <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        registerOptions={{required:"Required"}}
                        error={errors.password}
                        />
                    <Button type="submit" disabled={isSubmitting}
                        className={styles.width100}
                    >Sign Up</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SignUpModal;