import styles from '../../styles/FormLogin.module.css'
import { Input, Spacer, Button, useInput } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from 'next/link'

export default function FormLogin( {data, setInput, login, register }) {

    return (
        <>
            <form className={styles.form}>
                <Spacer y={2.5} />
                <h1>Bienvenidos Renovadores</h1>
                <p>Por favor inicia sesión para continuar.</p>
                <Input
                    name='name'
                    value={data?.name}
                    onChange={e => setInput(e)}
                    className={styles.user}
                    bordered
                    placeholder="usuario*"
                    onChange={e => setInput(e)}
                />
                <Spacer y={1} />
                <Input.Password
                    name='password'
                    value={data?.password}
                    onChange={e => setInput(e)}
                    className={styles.password}
                    bordered
                    placeholder="contraseña"
                    visibleIcon={<BsEyeSlashFill/>}
                    hiddenIcon={<BsEyeFill/>}
                />
                <Spacer y={1} />
                <a className={styles.LoginButton} onClick={e => login(e)}>INGRESAR</a>
                <Spacer y={2.5} />
            </form>
        </>
    )
}