import styles from '../../styles/FormLogin.module.css'
import { Input, Spacer, Button, useInput, Image, Text} from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function FormLogin( {data, setInput, login, message }) {

    return (
        <>
            <div className={styles.contentForm}>
                <Image
                    className={styles.bmiLogo}
                    src="/Logo-BMI_RGB_blanco.png"
                    alt="background"
                />
                <form className={styles.form} onSubmit={e => login(e)}>
                    <Image
                        src="/renoNegro.png"
                        alt="background"
                    />
                    <Spacer y={0.5} />
                    <p>Por favor inicia sesión para continuar.</p>
                    <Input
                        name='email'
                        defaultValue={data?.email}
                        onChange={e => setInput(e)}
                        className={styles.user}
                        bordered
                        placeholder="Usuario*"S
                        required
                    />
                    <Spacer y={1} />
                    <Input.Password
                        name='password'
                        defaultValue={data?.password}
                        onChange={e => setInput(e)}
                        className={styles.password}
                        bordered
                        placeholder="Contraseña*"
                        visibleIcon={<BsEyeSlashFill/>}
                        hiddenIcon={<BsEyeFill/>}
                        required
                    />
                    {!!message ? <p className={styles.error}>{message}</p>: <Spacer y={1} />}
                    <button type="submit" className={styles.LoginButton}>INGRESAR</button>
                    <Spacer y={2.5} />
                </form>
            </div>
        </>
    )
}
