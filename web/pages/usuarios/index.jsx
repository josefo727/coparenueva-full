import { useState, useCallback } from 'react';
import Layout from '/components/Layout'
import styles from '/styles/pages/Users.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdModeEdit, MdDeleteForever, MdTableChart } from 'react-icons/md';
import Link from "next/link";
import {BsTable} from "react-icons/bs";
import {Tooltip} from "@nextui-org/react";


export default function Users() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState('');

    const getUsers = useCallback(async () => {
        setPending(true);
        const resp = await axios.get(`${API_URL}/api/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setUsers(resp.data.data);
        setPending(false);
    }, []);

    useEffect(() => {
        getUsers()
            .then(() => null);
    }, [getUsers])

    const deleteUser = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.delete(`${API_URL}/api/users/${idUserDelete}`, headers)
            await closeModal();
            await getUsers();
        }catch (e) {
        }
    }
    const isModal = (id) => {
        setShowModal(true);
        setIdUserDelete(id);
    }
    const closeModal = () => {
        setShowModal(false);
        setIdUserDelete('');
    }
    const buttonCreate = (id) => {
        return (
            <Link className={styles.buttonCreate}  href={`/usuarios/crear`}>Crear Usuario</Link>
        )
    }
    const actions = (id, is_admin) => {
      return (
        <div className={styles.contentIcon}>
            <Link className={styles.kpi} href={`/usuarios/kpi/${id}`}>kpi</Link>
            <Tooltip content={'Tabla de Incentivos'}><Link className={styles.actions} href={`/usuarios/tabla-de-incentivos/${id}`}><MdTableChart/></Link></Tooltip>
            <Link className={styles.actions} href={`/usuarios/editar/${id}`}><MdModeEdit /></Link>
            {!is_admin ? <a className={styles.actions} onClick={() => isModal(id)}><MdDeleteForever /></a> :null}
        </div>
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
            selector: row => actions(row.id, row.is_admin),
            sortable: false,
            right: true,
            reorder: false
        }
    ];

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
                {showModal ?
                    <div className={styles.contentDeleteConfirm}>
                        <div className={styles.deleteConfirm}>
                            <p>Esta seguro de eliminar este usuario</p>
                            <div >
                                <a className={styles.btnConfirm} onClick={() => deleteUser()}>Confirmar</a>
                                <a className={styles.btnCancel} onClick={() => closeModal()}>Cancelar</a>
                            </div>
                        </div>
                    </div>
                :null}
            </Layout>
        </>
    )
}
