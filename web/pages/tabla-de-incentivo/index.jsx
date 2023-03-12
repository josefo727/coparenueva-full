import Layout from '/components/Layout'
import {useEffect, useState, useCallback} from "react";
import styles from '/styles/pages/TableIncentives.module.css'
import axios from "axios";
import {Loading} from "@nextui-org/react";
import { Image } from '@nextui-org/react';

export default function IncentivesTable() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [load, setLoad] = useState(true);
    const [incentiveTable, setIncentiveTable] = useState(null);

    const getImage = useCallback(async () => {
        setLoad(true);
        setIncentiveTable(null);
        const resp = await axios.get(`${API_URL}/api/user-incentive-table`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setIncentiveTable(resp.data.url);
        setLoad(false);
    }, []);

    useEffect(() => {
        getImage()
            .then(() => null);
    },[getImage])
    return (
        <>
            <Layout title='Tabla de incentivos' descripcion='Tabla de incentivos' navTitle='Tabla de incentivos' ruta='incentive'>
                <div className={styles.containerTableIncentives}>
                    {!load ?
                        <div className={styles.tableIncentives}>
                            {!!incentiveTable ?
                                <Image
                                    width={'100%'}
                                    height={'100%'}
                                    src={`${API_URL}${incentiveTable}`}
                                    alt='Tabla de incentivos'
                                    objectFit="cover"
                                />
                            :
                                <p>Todavía no se ha cargado una imagen para este módulo.</p>
                            }
                        </div>
                    :
                        <div className={styles.tableIncentives}>
                            <h3>Cargando Tabla de Incentivos</h3>
                            <Loading/>
                        </div>
                    }
                </div>
            </Layout>
        </>
    )
}