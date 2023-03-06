import styles from '../../styles/FormLogin.module.css'
import { Input, Spacer, Button, useInput, Image, Text} from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function FormLogin( {data, setInput, login }) {

    return (
        <>
            <form className={styles.form} onSubmit={e => login(e)}>
                <Image
                    src="/renoNegro.png"
                    alt="background"
                />
                <Spacer y={0.5} />
                <p>Por favor inicia sesión para continuar.</p>
                <Input
                    name='email'
                    value={data?.email}
                    onChange={e => setInput(e)}
                    className={styles.user}
                    bordered
                    placeholder="usuario*"S
                    required
                />
                <Spacer y={1} />
                <Input.Password
                    name='password'
                    value={data?.password}
                    onChange={e => setInput(e)}
                    className={styles.password}
                    bordered
                    placeholder="contraseña*"
                    visibleIcon={<BsEyeSlashFill/>}
                    hiddenIcon={<BsEyeFill/>}
                    required
                />
                <Spacer y={1} />
                <button type="submit" className={styles.LoginButton}>INGRESAR</button>
                <Spacer y={2.5} />
            </form>
        </>
    )
}
