import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import {useRouter} from "next/router";
import styles from '/styles/FormKpi.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import Router from 'next/router';
import Link from "next/link";
import FormKpiUser from "../../../../components/Forms/FormKpiUser";
import Layout from "../../../../components/Layout";
import {Loading} from "@nextui-org/react";

export default function CreateKpi() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [selected, setSelected] = useState({ value: null, label: null });
    const [message, setMessage] = useState(null);
    const [load, setLoad] = useState(false);
    const [kpi, setKpi] = useState({
        'renewal_target_audience': 0,
        'renewed_policies': 0,
        'renewed_premium': 0,
        'incentive_percentage': 0,
        'canceled_policies': 0,
        'month': ''
    })

    const createKpi = async (res) => {
        setLoad(true)
        kpi.broker_id = id
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/kpis`, res, headers);
            await Router.push(`/usuarios/kpi/${id}`);
        }catch (e) {
            setMessage('El mes ya se ha tomado.')
        }
        setLoad(false)
    };

    const setSelect = e => {
        setSelected(e);
        setKpi({
            ...kpi,
            ['month'] : e.value
        });
    }
    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setField = (field, value) => {
        setKpi({
            ...kpi,
            [field] : Number(value)
        });
    }

    return(
        <>
            <Layout
                title='Crear KPI'
                descripcion='Crear KPI'
                navTitle='Crear KPI'
            >
                <div className={styles.containerKpi}>
                    <div className={styles.kpi}>
                        <Link className={styles.goBack} href={`/usuarios/kpi/${id}`}><AiOutlineArrowLeft/> regresar</Link>
                        {!load ?
                            <FormKpiUser
                                kpi={kpi}
                                setInput={setInput}
                                selected={selected}
                                setSelected={setSelected}
                                setSelect={setSelect}
                                createKpi={createKpi}
                                message={message}
                            />
                        :
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                                <Loading/>
                            </div>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
