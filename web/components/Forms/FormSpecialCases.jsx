import React, {useState, useEffect} from 'react'
import styles from '/styles/FormSpecialCases.module.css'
import { Input, Radio, Spacer,} from "@nextui-org/react";

export default function FormSpecialCases() {
    const [data, setData] = useState({name: '', email: '', broker: '', details: ''})
    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field, value) => {
        setData({
            ...data,
            [field] : value
        });
    }
    const validateEmail = () => {
        return data.email.match('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i');
    };
    const validEmail = validateEmail();

    const ReportCase = (e) => {
        e.preventDefault();
        console.log(validEmail)
        if (
            validEmail,
            !!data.name &&
            !!data.email &&
            !!data.broker &&
            !!data.details
        ){
            console.log('valido')
        } else {
            console.log('not valid')
        }
    }
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
                    value={data.name}
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
                    value={data.email}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />
                <Input
                    className={styles.inputs}
                    clearable
                    bordered
                    type='text'
                    label="Bróker al cual pertenezco"
                    name="broker"
                    value={data.broker}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />
                <Input
                    className={styles.inputs}
                    clearable
                    bordered
                    type='text'
                    label="Detalle de caso"
                    name="details"
                    value={data.details}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />
                <a className={styles.evaluarCaso} onClick={e => ReportCase(e)}>EVALUAR</a>
                <Spacer y={2} />
            </form>
        </>
    )
}