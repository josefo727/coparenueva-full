import Layout from '/components/Layout'
import React, {useEffect, useState} from "react";
import styles from  '/styles/pages/Resumen.module.css'
import { Text } from '@nextui-org/react';
import {user} from "../../auth";
import axios from "axios";

export default function Resumen() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [urlSummaryDetail, setUrlSummaryDetail] = useState({});
    const [kpi, setKpi] = useState({});

    const getKpi = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            const response = await axios.get(`${API_URL}/api/broker-kpi/`, headers);
            const KPI = await response.data;
            setKpi(KPI);
        }catch (e) {
        }
    };

    useEffect(() => {
        if (kpi) {
            console.log(kpi);
        }
    },[kpi])

    useEffect(() => {
        getKpi().then(() => null)
        const USER = user();
        setUrlSummaryDetail(USER?.url_summary_detail);
    }, [])

    const level1 = kpi?.incentive_level === 1 ? `${styles.uno} ${styles.levelActive}` : `${styles.uno}`
    const level2 = kpi?.incentive_level === 2 ? `${styles.dos} ${styles.levelActive}` : `${styles.dos}`
    const level3 = kpi?.incentive_level === 3 ? `${styles.tres} ${styles.levelActive}` : `${styles.tres}`

    return (
        <>
            <Layout
                title='Resumen'
                descripcion='Resumen'
                navTitle='¡Hola, Agente Renovador!'
                navSubTitle='Bienvenida/o a la Temporada de Renovaciones. Renueva más, gana más'
                ruta='resumen'
            >
                <div className={styles.containerResumen}>
                    <section className={styles.containerBox}>
                        <div className={`${styles.box} ${styles.policies}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Pólizas a renovar <br/> “Público objetivo”</span>
                            </div>
                            <h1 className={styles.valor }>{kpi?.renewed_policies || '0'}</h1>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Pólizas <br/> renovadas</span>
                            </div>
                            <h2 className={styles.valor}>{kpi?.renewed_policies || '0'}</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Índice de <br/> renovación</span>
                            </div>
                            <h2 className={styles.valor}>{kpi?.incentive_percentage || '0'}%</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Prima  <br/> renovada</span>
                            </div>
                            <h2 className={styles.valor}>${kpi?.renewed_premium || '0'}k</h2>
                        </div>
                        {
                            kpi.success ?
                                <div className={`${styles.box2}`}>
                                    <Text>Nivel de incentivo</Text>
                                    <div className={level3} >
                                        <Text> 3 </Text>
                                    </div>
                                    <div className={level2} >
                                        <Text> 2 </Text>
                                    </div>
                                    <div className={level1} >
                                        <Text> 1 </Text>
                                    </div>
                                </div>
                            :null
                        }
                        <div className={`${styles.box}`}>
                            <span>Valor <br/> aproximado <br/> de incentivo</span>
                            <h2 className={styles.valor}>
                                ${kpi?.approximate_incentive_value || '0'}k
                            </h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <span>Pólizas <br/> canceladas </span>
                            <h2 className={styles.valor}>
                                {kpi?.canceled_policies || '0'}
                            </h2>
                        </div>
                    </section>
                    {!!urlSummaryDetail ?
                        <div className={`${styles.containerBoxEnd}`}>
                            <div>
                                <a
                                    href={urlSummaryDetail}
                                    target='_blank' className={styles.downloadLink}
                                    rel="noreferrer"
                                >Descargar informe detallado</a>
                            </div>
                            <div>
                                <Text css={{ color: "#808B96" }}>
                                    Este reporte se actualizará cada semana
                                    Fecha de actualización: 12 de Marzo 2023
                                </Text>
                            </div>
                        </div>
                    :null
                    }
                </div>
            </Layout>
        </>
    )
}
