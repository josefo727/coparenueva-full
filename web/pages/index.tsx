import React from "react";
import styles from './../styles/Login.module.css'
import FormLogin from '../components/Forms/FormLogin'
import {useState} from 'react';
import { login } from './../auth'
import Router from 'next/router';

export default function Login() {
    const [data, setData] = useState({
        email: 'josefo727@gmail.com',
        password: '000000'
    });

    const setInput = (e: React.ChangeEvent<HTMLInputElement>)  => {
        e.preventDefault()
        setField(e.target.name, e.target.value);
    }

    const setField = (field: string, value: string) => {
        setData({
            ...data,
            [field] : value
        });
    }

    const logIn = async (e: React.ChangeEvent<HTMLInputElement>)  => {
        e.preventDefault();
        await login(data.email, data.password);
        await Router.push('/resumen');
    }

    return (
        <main className={styles.mainLogin}>
            <FormLogin
                setInput={setInput}
                data={data}
                login={logIn}
            />
        </main>
    )
}
