import React, {useState, useEffect, useCallback} from 'react'
import styles from '/styles/FormSpecialCases.module.css'
import {Input, Spacer, Textarea,} from "@nextui-org/react";
import axios from "axios";

export default function FormSpecialCases() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [data, setData] = useState({name: '', email: '', detail: ''})
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState('')

    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field, value) => {
        setData({
            ...data,
            [field] : value
        });
    }
    const ReportCase = useCallback(async (res) => {
        setAlert(false)
        console.log(res)
        if (
            !!res.name &&
            !!res.email &&
            !!res.detail
        ){
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            try {
                const response = await axios.post(`${API_URL}/api/special-cases/`, res, headers);
                if (response.statusText === "Created") {
                    setMessage('Reporte creado satisfactoriamente.');
                    setData({name: '', email: '', detail: ''});
                    setTimeout(() => {
                        setMessage('');
                    },3000)

                }
            }catch (e) {
                console.log(e)
            }
        } else {
            setAlert(true)
        }
    }, []);
    useEffect(() => {
    },[])
    return (
        <>
            <form className={styles.form}>
                <h3 className={styles.title}>¿Deseas reportar un caso?</h3>
                <Spacer y={2} />
                <Input
                    className={styles.inputs}
                    clearable
                    bordered
                    type='text'
                    label="Nombre de renovador"
                    name="name"
                    value={data?.name}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />
                <Input
                    className={styles.inputs}
                    clearable
                    bordered
                    label="Correo electrónico"
                    name="email"
                    type='email'
                    value={data?.email}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />

                <Textarea
                    clearable
                    bordered
                    className={styles.inputs}
                    label="Detalle de caso"
                    name='detail'
                    value={data?.detail}
                    onChange={e => setInput(e)}
                    required='true'
                />

                {alert ? <p className={styles.messageAlert}>Todos los campos son requeridos</p> : <Spacer y={1} />}
                <a className={styles.evaluarCaso} onClick={() => ReportCase(data)}>EVALUAR</a>
                {!!message ? <p className={styles.message}>{message}</p> : <Spacer y={1} />}
                <Spacer y={2} />
            </form>
        </>
    )
}