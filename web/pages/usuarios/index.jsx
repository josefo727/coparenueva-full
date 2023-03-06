import { useState } from 'react';
import Layout from '/components/Layout'
import styles from '/styles/pages/Users.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
import Link from "next/link";


export default function Users() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true);

    const getUsers = async () => {
        setPending(true);
        const resp = await axios.get(`${API_URL}/api/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setUsers(resp.data.data);
        setPending(false);
    }
    const deleteUser = (user) => {
        console.log('deleteUser', user)
    }
    const buttonCreate = (id) => {
        return (
            <Link className={styles.buttonCreate}  href={`/usuarios/crear`}>Crear Usuario</Link>
        )
    }
    const actions = (id) => {
        console.log(id)

      return (
        <>
            <Link href={`/usuarios/editar/${id}`}><MdModeEdit /></Link>
            <a onClick={() => deleteUser()}><MdDeleteForever /></a>
        </>
      )
    }
    const columns = [
        {
            name: 'Usuario',
            selector: row => row.name,
            sortable: true,
            reorder: true
        },
        {
            name: 'E-mail',
            selector: row => row.email,
            sortable: true,
            reorder: true
        },
        {
            name: 'Rol',
            selector: row => row.is_admin ? 'Admin' : 'User',
            sortable: true,
            reorder: true
        },
        {
            name: 'acciones',
            selector: row => actions(row.id),
            sortable: false,
            right: true,
            reorder: false
        }
    ];

    useEffect(() => {
        getUsers()
            .then(() => null);

    }, [])

    return (
        <>
            <Layout
                title='Usuarios'
                descripcion='Usuarios del sistema'
                navTitle='Usuarios del sistema'
                ruta='users'
            >
                <div className={styles.containerUsers}>
                    <div className={styles.users} id='tableUsers'>
                        <DataTable
                            columns={columns}
                            data={users}
                            progressPending={pending}
                            pagination
                            actions={buttonCreate()}
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}
