import axios from "axios";
import { useState, useEffect } from 'react';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";
import styles from '/styles/pages/UserEdit.module.css'
import FormUser from "../../../components/Forms/FormUser";

export default function Edit() {
    const router = useRouter()
    const { id } = router.query

    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [user, setUser] = useState([]);

    const getUser = async () => {
        const resp = await axios.get(`${API_URL}/api/users/`+id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setUser(resp.data);
    }
    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field, value) => {
        setUser({
            ...user,
            [field] : value
        });
    }
    // CKeditor
    const userEdit = () => {
        console.log(user)      
    }

    useEffect(() => {
        if (id) {
            getUser()
                .then(() => null);
        }
    }, [id]);

    return(
        <>
            <Layout
                title='Editar Usuarios'
                descripcion='Edición de usuarios'
                navTitle='Editar usuarios'
                ruta='users'
            >
                <div className={styles.containerUserEdit}>
                    <div className={styles.userEdit}>
                        {user ?
                            <FormUser
                                data={user}
                                setInput={setInput}
                                userEdit={userEdit}
                            />
                        :null
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}