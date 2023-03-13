import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import Router, {useRouter} from "next/router";
import Layout from "../../../../components/Layout";
import styles from '/styles/FormKpi.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import Link from "next/link";
import FormKpiUser from "../../../../components/Forms/FormKpiUser";
import {Loading} from "@nextui-org/react";

export default function EditKpi() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [selected, setSelected] = useState({ value: null, label: null });
    const [kpi, setKpi] = useState(null);
    const [message, setMessage] = useState(null);
    const [load, setLoad] = useState(false);


    const getKpi = useCallback(async (ID) => {
        if (id) {
            try {
                const resp = await axios.get(`${API_URL}/api/kpis/${ID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setKpi(resp.data);
            } catch (error) {
                console.error(error);
            }
        }
    }, [id]);

    const updateKpi = async (res) => {
        setLoad(true);
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.put(`${API_URL}/api/kpis/${res.id}`, res, headers);
            await Router.push(`/usuarios/kpi/${res.broker_id}`);
        }catch (e) {
            setMessage('El mes ya se ha tomado.')
        }
        setLoad(false);
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

    useEffect(() => {
        if (id) {
            getKpi(id).then(() => null);
        }
    }, [id])

    useEffect(() => {
        if (document.querySelector('#renewalTargetAudience')) {
            document.querySelector('#renewalTargetAudience').value = kpi?.renewal_target_audience || 0;
            document.querySelector('#renewedPolicies').value = kpi?.renewed_policies || 0;
            document.querySelector('#incentivePercentage').value = kpi?.incentive_percentage || 0;
            document.querySelector('#renewedPremium').value = kpi?.renewed_premium || 0;
            document.querySelector('#canceledPolicies').value = kpi?.canceled_policies || 0;
        }
    },[kpi])
    return(
        <>
            <Layout
                title='Editar KPI'
                descripcion='Editar KPI'
                navTitle='Editar KPI'
            >
                <div className={styles.containerKpi}>
                    <div className={styles.kpi}>
                        <Link className={styles.goBack} href={`/usuarios/kpi/${kpi?.broker_id}`}><AiOutlineArrowLeft/> regresar</Link>
                        {!load ?
                            <FormKpiUser
                                kpi={kpi}
                                setInput={setInput}
                                selected={selected}
                                setSelected={setSelected}
                                setSelect={setSelect}
                                updateKpi={updateKpi}
                                isCreate={false}
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
