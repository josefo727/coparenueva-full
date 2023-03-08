import styles from './../styles/Login.module.css'
import FormLogin from '../components/Forms/FormLogin'
import React, {useState} from 'react';
import { login } from './../auth'
import Router from 'next/router';
import { Image } from '@nextui-org/react';

export default function Login() {
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field: string, value: string) => {
        setData({
            ...data,
            [field] : value
        });
    }

    const logIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('');
        e.preventDefault()
        const resp = await login(data.email, data.password);
        if (!resp) {
            setMessage('Credenciales incorrectas')
        } else {
            await Router.push('/resumen');
        }
    }

    return (
        <main className={styles.mainLogin}>
            <Image
                src="/backgroundCopa.png"
                alt="background"
                objectFit="cover"
            />
            <FormLogin
                setInput={setInput}
                data={data}
                login={logIn}
                message={message}
            />
        </main>
    )
}
