import styles from '../../styles/FormUser.module.css'
import { Input, Spacer, Button, Textarea, Checkbox } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function FormUser( {data, setInput, userEdit,  isCreate = false}) {
    console.log(!!data?.is_admin)
    return (
        <>
            <form className={styles.form} >
                <Spacer y={1.5} />
                <Input
                    className={styles.name}
                    name='name'
                    value={data?.name}
                    onChange={e => setInput(e)}
                    bordered
                    label="Nombre*"
                    required
                />
                <Spacer y={1} />
                <Input
                    className={styles.email}
                    name='email'
                    value={data?.email}
                    onChange={e => setInput(e)}
                    bordered
                    label="E-mail*"
                    required
                />
                <Spacer y={1} />
                <Input
                    className={styles.url}
                    name='url'
                    value={data?.url}
                    onChange={e => setInput(e)}
                    bordered
                    label="URL"
                    required
                />
                <Spacer y={1} />
                <Textarea
                    bordered
                    className={styles.terms}
                    name='terms'
                    label="Términos y Condiciones"
                    value={data?.terms}
                    onChange={e => setInput(e)}
                />
                <Spacer y={1} />
                <Input.Password
                    bordered
                    className={styles.password}
                    name='password'
                    label="Contraseña*"
                    visibleIcon={<BsEyeSlashFill/>}
                    hiddenIcon={<BsEyeFill/>}
                    value={data?.password}
                    onChange={e => setInput(e)}
                    required
                />
                <Spacer y={1} />
                {
                    isCreate ?
                        <>
                            <Button type="submit" className={styles.buttonCreateEdit}>Crear</Button>
                        </>
                    :
                        <>
                            <Button type="submit"
                                    className={styles.buttonCreateEdit}
                                    onClick={() => userEdit()}
                            >Editar</Button>
                        </>
                }
                <Spacer y={1.5} />
            </form>
        </>
    )
}
