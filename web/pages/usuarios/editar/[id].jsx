import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";
import styles from '/styles/pages/UserCreateEdit.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import FormUser from "../../../components/Forms/FormUser";
import Router from 'next/router';
import Link from "next/link";

export default function Edit() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [user, setUser] = useState([]);

    const getUser = useCallback(async () => {
      try {
        const resp = await axios.get(`${API_URL}/api/users/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(resp.data);
      } catch (error) {
        console.error(error);
      }
    }, [id]);

    useEffect(() => {
        getUser()
            .then(() => null);
    }, [getUser])

    const updateUser = async () => {
        if ( !!user.name && !!user.email ) {
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            try {
                const response = await axios.put(`${API_URL}/api/users/`+id, user, headers);
                console.log(response);
                await Router.push('/usuarios');
            }catch (e) {
            }
        }
    };

    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field, value) => {
        setUser({
            ...user,
            [field] : value
        });
    }

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
                        <Link className={styles.goBack} href='/usuarios'><AiOutlineArrowLeft/> regresar</Link>
                        {user ?
                            <FormUser
                                user={user}
                                setInput={setInput}
                                updateUser={updateUser}
                            />
                        :null
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
