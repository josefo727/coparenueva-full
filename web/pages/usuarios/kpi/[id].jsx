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
        'canceled_policies': 0,
        'broker_id': Number(id),
    })

    const getKpi = useCallback(async () => {
      if (id) {
          try {
              const resp = await axios.get(`${API_URL}/api/kpis-user/${id}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              });
              setKpi(resp.data);
              setIsCreate(false)
          } catch (error) {
              console.error(error);
          }
      }
    }, [id]);

    const createKpi = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/kpis`, kpi, headers);
            await Router.push('/usuarios');
        }catch (e) {
        }
    };
    const updateKpi = async (data) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.put(`${API_URL}/api/kpis/${data.id}`, data, headers);
            await Router.push('/usuarios');
        }catch (e) {
        }
    };

    useEffect(() => {
        console.log(kpi)
    }, [kpi])

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
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Público objetivo de renovación"
                                name="renewal_target_audience"
                                value={kpi?.renewal_target_audience}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Pólizas renovadas"
                                name="renewed_policies"
                                value={kpi?.renewed_policies}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Índice de renovación"
                                name="incentive_percentage"
                                value={kpi?.incentive_percentage}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="Prima renovada"
                                name="renewed_premium"
                                value={kpi?.renewed_premium}
                                onChange={e => setInput(e)}
                            />
                            <Spacer y={1} />
                            <Input
                                bordered
                                type='number'
                                min="0"
                                step="1"
                                label="pólizas canceladas"
                                name="canceled_policies"
                                value={kpi?.canceled_policies}
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
