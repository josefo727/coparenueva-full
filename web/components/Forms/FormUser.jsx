import styles from '../../styles/FormUser.module.css'
import { Input, Spacer, Button } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function FormUser( {user, setInput, createUser, updateUser, isCreate = false}) {

    return (
        <>
            <form className={styles.form} >
                <Spacer y={1.5} />
                <Input
                    className={styles.name}
                    name='name'
                    value={user?.name}
                    onChange={e => setInput(e)}
                    bordered
                    label="Nombre*"
                    required
                />
                <Spacer y={1} />
                <Input
                    className={styles.email}
                    name='email'
                    value={user?.email}
                    onChange={e => setInput(e)}
                    bordered
                    label="E-mail*"
                    required
                    type='email'
                    autocomplete="off"
                />
                <Spacer y={1} />
                <Input
                    className={styles.url}
                    name='url'
                    value={user?.url}
                    onChange={e => setInput(e)}
                    bordered
                    label="URL"
                />
                <Spacer y={1} />
                <Input.Password
                    bordered
                    className={styles.password}
                    name='password'
                    label="Contraseña*"
                    visibleIcon={<BsEyeSlashFill/>}
                    hiddenIcon={<BsEyeFill/>}
                    value={user?.password}
                    onChange={e => setInput(e)}
                    autocomplete="off"
                    required
                />
                <Spacer y={1} />
                {
                    isCreate ?
                        <>
                            <Button
                                className={styles.buttonCreateEdit}
                                onClick={() => createUser()}
                            >Crear</Button>
                        </>
                    :
                        <>
                            <Button
                                className={styles.buttonCreateEdit}
                                onClick={() => updateUser()}
                            >Editar</Button>
                        </>
                }
                <Spacer y={1.5} />
            </form>
        </>
    )
}
