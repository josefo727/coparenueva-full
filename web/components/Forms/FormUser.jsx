import styles from '../../styles/FormUser.module.css'
import { Input, Spacer, Button } from "@nextui-org/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import {useEffect} from "react";

export default function FormUser( {user, setInput, createUser, updateUser, isCreate = false}) {
    useEffect(() => {
        document.querySelector('#name').value = user?.name || '';
        document.querySelector('#email').value = user?.email || '';
        document.querySelector('#url').value = user?.url || '';
        document.querySelector('#urlDetail').value = user?.url_summary_detail || '';
        document.querySelector('#password').value = user?.password || '';
    },[user])
    return (
        <>
            <form className={styles.form} >
                <Spacer y={1.5} />
                <Input
                    id='name'
                    name='name'
                    className={styles.name}
                    defaultValue={user?.name}
                    onChange={e => setInput(e)}
                    bordered
                    label="Nombre*"
                    required
                />
                <Spacer y={1} />
                <Input
                    id='email'
                    name='email'
                    className={styles.email}
                    defaultValue={user?.email}
                    onChange={e => setInput(e)}
                    bordered
                    label="E-mail*"
                    required
                    type='email'
                    autocomplete="off"
                />
                <Spacer y={1} />
                <Input
                    id='url'
                    name='url'
                    className={styles.url}
                    defaultValue={user?.url}
                    onChange={e => setInput(e)}
                    bordered
                    label="URL"
                />
                <Spacer y={1} />
                <Input
                    id='urlDetail'
                    name='url_summary_detail'
                    className={styles.url}
                    defaultValue={user?.url_summary_detail}
                    onChange={e => setInput(e)}
                    bordered
                    label="URL resumen"
                />
                <Spacer y={1} />
                <Input.Password
                    id='password'
                    bordered
                    className={styles.password}
                    name='password'
                    label="Contraseña*"
                    visibleIcon={<BsEyeSlashFill/>}
                    hiddenIcon={<BsEyeFill/>}
                    defaultValue={user?.password}
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
