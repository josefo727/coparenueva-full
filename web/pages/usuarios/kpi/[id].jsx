import { useState, useCallback } from 'react';
import styles from '/styles/pages/Users.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdModeEdit, MdDeleteForever, MdTableChart } from 'react-icons/md';
import Link from "next/link";
import {BsTable} from "react-icons/bs";
import {Tooltip} from "@nextui-org/react";
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";


export default function Users() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [kpisUser, setKpisUser] = useState([]);
    const [pending, setPending] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idKpiDelete, setIdKpiDelete] = useState('');

    const getKpisUser = useCallback(async (ID) => {
        setPending(true);
        const resp = await axios.get(`${API_URL}/api/kpis?brokerId=${ID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setKpisUser(resp.data);
        setPending(false);
    }, []);

    const deleteKpi = async () => {
        setPending(true);
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.delete(`${API_URL}/api/kpis/${idKpiDelete}`, headers)
            await closeModal();
            await getKpisUser(id);
        }catch (e) {
        }
        setPending(false);
    }
    const isModal = (id) => {
        setShowModal(true);
        setIdKpiDelete(id);
    }
    const closeModal = () => {
        setShowModal(false);
        setIdKpiDelete('');
    }
    const buttonCreate = () => {
        return (
            <Link className={styles.buttonCreate}  href={`/usuarios/kpi/crear/${id}`}>Crear KPI</Link>
        )
    }
    const actions = (id) => {
      return (
        <div className={styles.contentIcon}>
            <Link className={styles.actions} href={`/usuarios/kpi/editar/${id}`}><MdModeEdit /></Link>
            <a className={styles.actions} onClick={() => isModal(id)}><MdDeleteForever /></a>
        </div>
      )
    }

    useEffect(() => {
        if (!!id) {
            getKpisUser(id).then(() => null);
        }
    }, [id])

    const columns = [
        {
            name: 'Mes',
            selector: row => row.month,
            sortable: true,
            reorder: true,
            width: '100px',
            padding: '0 10px'
        },
        {
            name: 'Público Objetivo',
            selector: row => row.renewal_target_audience,
            sortable: true,
            reorder: true,
            width: '160px',
            padding: '0 10px'
        },
        {
            name: 'Pólizas Renovadas',
            selector: row => row.renewed_policies,
            sortable: true,
            reorder: true,
            width: '160px',
            padding: '0 10px'
        },
        {
            name: 'Porcentaje de Incentivo',
            selector: row => row.incentive_percentage,
            sortable: true,
            reorder: true,
            width: '180px',
            padding: '0 10px'
        },
        {
            name: 'Prima Renovada',
            selector: row => row.renewed_premium,
            sortable: true,
            reorder: true,
            width: '160px',
            padding: '0 10px'
        },
        {
            name: 'Pólizas Canceladas',
            selector: row => row.canceled_policies,
            sortable: true,
            reorder: true,
            width: '160px',
            padding: '0 10px'
        },
        {
            name: 'Acciones',
            selector: row => actions(row.id),
            sortable: false,
            right: true,
            reorder: false
        }
    ];
    return (
        <>
            <Layout
                title='KPI'
                descripcion='KpI'
                navTitle='KPI'
                ruta='users'
            >
                <div className={styles.containerUsers}>
                    <div className={styles.users} id='tableUsers'>
                        <DataTable
                            columns={columns}
                            data={kpisUser}
                            progressPending={pending}
                            pagination
                            actions={buttonCreate()}
                        />
                    </div>
                </div>
                {showModal ?
                    <div className={styles.contentDeleteConfirm}>
                        <div className={styles.deleteConfirm}>
                            <p>Esta seguro de eliminar este KPI</p>
                            <div >
                                <a className={styles.btnConfirm} onClick={() => deleteKpi()}>Confirmar</a>
                                <a className={styles.btnCancel} onClick={() => closeModal()}>Cancelar</a>
                            </div>
                        </div>
                    </div>
                :null}
            </Layout>
        </>
    )
}
