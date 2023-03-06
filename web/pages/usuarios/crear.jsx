import axios from "axios";
import { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import styles from '/styles/pages/UserCreateEdit.module.css'
import FormUser from "../../components/Forms/FormUser";
import Router from 'next/router';
import Link from "next/link";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default function Create() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        terms: '',
        url: ''
    })
    const API_URL = `${process.env.SERVER_API_HOST}`;

    const createUser = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/users/`, user, headers);
            await Router.push('/usuarios');
        }catch (e) {
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
                title='Crear Usuarios'
                descripcion='Crear usuarios'
                navTitle='Crear usuarios'
                ruta='users'
            >
                <div className={styles.containerUserCreate}>
                    <div className={styles.userCreate}>
                        <Link className={styles.goBack} href='/usuarios'><AiOutlineArrowLeft/> regresar</Link>
                        {user ?
                            <FormUser
                                user={user}
                                setInput={setInput}
                                createUser={createUser}
                                isCreate={true}
                            />
                            :null
                        }
                    </div>
                </div>
            </Layout>
        </>
    )

}