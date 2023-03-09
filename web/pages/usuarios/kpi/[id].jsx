import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";
import styles from '/styles/FormPki.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import FormUser from "../../../components/Forms/FormUser";
import Router from 'next/router';
import Link from "next/link";
import {Input, Radio, Spacer} from "@nextui-org/react";

export default function Pki() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [isCreate, setIsCreate] = useState(true)
    const [kpi, setKpi] = useState({
        'renewal_target_audience': 0,
        'renewed_policies': 0,
        'renewed_premium': 0,
        'incentive_percentage': 0,
        'canceled_policies': 0
    })

    const getKpi = useCallback(async () => {
      if (id) {
          try {
              const resp = await axios.get(`${API_URL}/api/kpis-user/${id}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              });
              setKpi({
                  ...kpi,
                  ...resp.data,
                  ['broker_id'] : Number(id)
              });
              setIsCreate(Object.keys(resp.data).length === 0)
          } catch (error) {
              console.error(error);
          }
      }
    }, [id]);

    const createKpi = async (res) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/kpis`, res, headers);
            await Router.push('/usuarios');
        }catch (e) {
        }
    };
    const updateKpi = async (res) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.put(`${API_URL}/api/kpis/${res.id}`, res, headers);
            await Router.push('/usuarios');
        }catch (e) {
        }
    };

    useEffect(() => {
        getKpi()
            .then(() => null);
    }, [getKpi])

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
                title='KPI'
                descripcion='KPI'
                navTitle='KPI'
            >
                <div className={styles.containerPki}>
                    <div className={styles.pki}>
                        <Link className={styles.goBack} href='/usuarios'><AiOutlineArrowLeft/> regresar</Link>
                        <form className={styles.form}>
                            {isCreate ?
                                <h1>Crear PKI</h1>
                            :
                                <h1>Editar PKI</h1>
                            }
                            <Input
                                id="renewalTargetAudience"
                                name="renewal_target_audience"
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Público objetivo de renovación"
                                defaultValue={kpi?.renewal_target_audience}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                id="renewedPolicies"
                                name="renewed_policies"
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Pólizas renovadas"
                                defaultValue={kpi?.renewed_policies}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                id="incentivePercentage"
                                name="incentive_percentage"
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Porcentaje de incentivo"
                                defaultValue={kpi?.incentive_percentage}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                id="renewedPremium"
                                name="renewed_premium"
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Prima renovada"
                                defaultValue={kpi?.renewed_premium}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                id="canceledPolicies"
                                name="canceled_policies"
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="pólizas canceladas"
                                defaultValue={kpi?.canceled_policies}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            {isCreate ?
                                <a className={styles.btnKpi} onClick={() => createKpi(kpi)}>Crear</a>
                            :
                                <a className={styles.btnKpi} onClick={() => updateKpi(kpi)}>Editar</a>
                            }
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
