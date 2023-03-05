import { useState } from 'react';
import Layout from '/components/Layout'
import styles from '/styles/pages/Users.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';


export default function Users() {


    const createUser = (user) => {
        console.log('editUser', user)
    }
    const editUser = (user) => {
        console.log('editUser', user)
    }
    const deleteUser = (user) => {
        console.log('deleteUser', user)
    }
    const buttonCreate = (user) => {
        return (
            <a className={styles.buttonCreate} onClick={() => createUser()}>Crear Usuario</a>
        )
    }
    const actions = (user) => {
      return (
        <>
            <a className={`${styles.actions} ${styles.editUser}`} onClick={() => editUser(user)}><MdModeEdit /></a>
            <a className={`${styles.actions} ${styles.deleteUser}`} onClick={() => deleteUser(user)}><MdDeleteForever /></a>
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
            selector: row => actions(row),
            sortable: false,
            right: true,
            reorder: false
        }
    ];

    const API_URL = `${process.env.SERVER_API_HOST}/api/`;
    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true);

    const getUsers = async () => {
        setPending(true)
        const resp = await axios.get(`${API_URL}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(resp.data.data);
        setPending(false)
    }

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
