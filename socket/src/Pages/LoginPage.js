import React, {useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import { login } from "../Api/api";
import { useStoreActions, useStoreState } from "easy-peasy";
const ENDPOINT = "wss://dev.picnicapp.link/";


export const LoginPage = () => {

    const login = useStoreActions((action) => action.conversation.login);

const [formValue,setFormValue]=useState({
    device_token:"",
    email:"",
    password:""
})

const { register, handleSubmit } = useForm();

const onSubmit = async(data)=>{
      console.log(data)
  let payload=    {
    "email": data?.email,
    "password": data?.password,
    "device_token": ""
}
await login(payload)
}

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control {...register("email", { required: true})} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control {...register("password", { required: true})} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}
