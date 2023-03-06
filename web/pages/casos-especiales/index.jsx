import Layout from '/components/Layout'
import styles from '/styles/pages/SpecialCases.module.css'
import FormSpecialCases from '/components/Forms/FormSpecialCases'
import { Spacer } from "@nextui-org/react";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";


export default function SpecialCases() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [specialCases, setSpecialCases] = useState([]);
    const [pending, setPending] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idSpecialDelete, setIdSpecialDelete] = useState('');

    const getSpecialCases = useCallback(async () => {
        setPending(true);
        const resp = await axios.get(`${API_URL}/api/special-cases`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setSpecialCases(resp.data);
        setPending(false);
    }, []);

    const deleteSpecialCases = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.delete(`${API_URL}/api/special-cases/${idSpecialDelete}`, headers)
            await closeModal();
            await getSpecialCases();
        }catch (e) {
        }
    }


    const isModal = (id) => {
        setShowModal(true);
        setIdSpecialDelete(id);
    }
    const closeModal = () => {
        setShowModal(false);
        setIdSpecialDelete('');

    }
    const columns = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
            left: true,
            reorder: false,
            maxWidth: '150px'
        },
        {
            name: 'E-mail',
            selector: row => row.email,
            sortable: true,
            reorder: false,
            left: true,
            maxWidth: '200px'
        },
        {
            name: 'acciones',
            selector: row => actions(row.id),
            sortable: false,
            reorder: false,
            right: true
        }
    ];

    const actions = (id) => {
        return (
            <>
                <Link className={styles.actions} href={`/casos-especiales/editar/${id}`}><MdModeEdit /></Link>
                <a className={styles.actions} onClick={() => isModal(id)}><MdDeleteForever /></a>
            </>
        )
    }

    const DetailComponent = ({ data }) => <p> {data.detail} </p>;

    useEffect(() => {
        getSpecialCases()
            .then(() => null);
    }, [getSpecialCases])
    return (
        <>
            <Layout
                title='Casos Especiales'
                descripcion='Casos Especiales'
                navTitle='Casos Especiales'
                ruta='specials'
            >
                <div className={styles.containerSpecialCases}>
                    <div className={styles.table}>
                        <DataTable
                            columns={columns}
                            expandableRows
                            expandableRowsComponent={DetailComponent}
                            data={specialCases}
                            progressPending={pending}
                            pagination
                        />
                    </div>
                    <div className={styles.contentTextForm}>
                        <div className={styles.specialCases}>
                            <p>
                                <em>¿Qué son? – <strong>Los casos especiales son aquellos casos que no están</strong> </em>tipificados dentro de las bases y condiciones.
                                El único canal de consulta habilitado para los casos especiales será a través de este formulario.
                            </p>
                            <Spacer y={1} />
                            <p>
                                <strong>Importante: Solo se evaluarán aquellos casos que no estén tipificados en las bases y condiciones de la campaña.</strong>
                            </p>
                            <Spacer y={2.5} />
                        </div>
                        <div className={styles.FormSpecialCases}>
                            <FormSpecialCases getSpecialCases={getSpecialCases}/>
                        </div>
                    </div>

                    {showModal ?
                        <div className={styles.contentDeleteConfirm}>
                            <div className={styles.deleteConfirm}>
                                <p>Esta seguro de eliminar este usuario</p>
                                <div >
                                    <a className={styles.btnConfirm} onClick={() => deleteSpecialCases()}>Confirmar</a>
                                    <a className={styles.btnCancel} onClick={() => closeModal()}>Cancelar</a>
                                </div>
                            </div>
                        </div>
                    :null}
                </div>

            </Layout>
        </>
    )
}
