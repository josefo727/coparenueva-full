import Layout from '/components/Layout'
import React, {useEffect, useState, useCallback, useMemo } from "react";
import styles from  '/styles/pages/Resumen.module.css'
import { Text } from '@nextui-org/react';
import {user} from "../../auth";
import axios from "axios";
import Select from "react-select";

export default function Resumen() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [urlSummaryDetail, setUrlSummaryDetail] = useState({});
    const [kpi, setKpi] = useState({});
    const [months, setMonths] = useState(null);
    const [selected, setSelected] = useState({ value: null, label: null });

    const getKpi = async (value) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            const response = await axios.get(`${API_URL}/api/broker-kpi?month=${value}`, headers);
            const KPI = await response.data;
            setKpi(KPI);
        }catch (e) {
        }
    };
    const getMonths = useCallback(async () => {
        setMonths(null);
        try {
            const resp = await axios.get(`${API_URL}/api/months`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMonths(resp.data.all_options);
            console.log(resp.data.all_options)
        } catch (e) {
            console.log(e)
        }
    }, []);
    const setSelect = e => {
        setSelected(e);
        setKpi({
            ...kpi,
            ['month'] : e.value
        });
        getKpi(e.value).then(() => null);
    }

    const options = useMemo(() => {
        return months?.map(month => {
            return { value: month.value, label: month.label }
        });
    },[months]);

    useEffect(() => {
        if(!!options) {
            setSelected(options[0])
            getKpi(options[0].value).then(() => null);
        }
    },[options]);

    useEffect(() => {
        if (!months) {
            getMonths().then(() => null)
        }
    },[months]);
    useEffect(() => {
        getKpi().then(() => null)
        const USER = user();
        setUrlSummaryDetail(USER?.url_summary_detail);
    }, [])
    const level1 = kpi?.incentive_level === 1 ? `${styles.uno} ${styles.active}` : `${styles.uno}`
    const level2 = kpi?.incentive_level === 2 ? `${styles.dos} ${styles.active}` : `${styles.dos}`
    const level3 = kpi?.incentive_level === 3 ? `${styles.tres} ${styles.active}` : `${styles.tres}`
    const level4 = kpi?.incentive_level === 4 ? `${styles.cuatro} ${styles.active}` : `${styles.cuatro}`
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

                    <div style={{maxWidth: '400px'}}>
                        <Select
                            classNamePrefix={styles.selectMonth}
                            id='selectMonth'
                            options={options}
                            value={selected}
                            onChange={e => setSelect(e)}
                        />
                    </div>

                    <section className={styles.containerBox}>
                        <div className={styles.contentLeft}>
                            <div className={`${styles.box} ${styles.policies}`}>
                                <div className={styles.contentIconTitle}>
                                    <span>Pólizas a renovar <br/> “Público objetivo”</span>
                                </div>
                                <h1 className={styles.valor }>{kpi?.renewal_target_audience || '0'}</h1>
                            </div>
                            <p>*No te olvides que esta es solo  una proporción de todos los clientes a renovar.</p>
                        </div>
                        <div className={styles.contentRight}>
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
                                <h2 className={styles.valor}>{kpi?.renewal_rate || '0'}%</h2>
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
                                        <div className={level4} >
                                            <Text> 4 </Text>
                                        </div>
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
                        </div>
                    </section>
                    <div className={`${styles.containerBoxEnd}`}>
                        <div>
                            <Text css={{ color: "#010101" }}>
                                RECUERDA QUE ESTAS PÓLIZAS/CONTRATOS DEVEN PERMANECER ACTIVAS POR 100 DÍAS
                            </Text>
                        </div>
                        {!!urlSummaryDetail ?
                            <>
                                <div>
                                    <Text css={{ color: "#808B96" }}>
                                        Si quieres conocer el detalle de las pólizas/contratos renovados y cancelados, haz click aquí:
                                    </Text>
                                </div>
                                <a
                                    href={urlSummaryDetail}
                                    target='_blank' className={styles.downloadLink}
                                    rel="noreferrer"
                                >Descargar informe</a>
                            </>
                        :null
                        }
                        <div>
                            <Text css={{ color: "#808B96" }}>
                                Este reporte se actualizará cada semana. Ultima fecha de actualización: {kpi?.updated_at}
                            </Text>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
