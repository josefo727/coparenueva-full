import styles from '/styles/FormKpi.module.css';
import { Input, Spacer } from "@nextui-org/react";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function FormKpiUser( {kpi, setInput, selected, setSelected, setSelect, createKpi, updateKpi, isCreate = true, message}) {

    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [months, setMonths] = useState(null);
    const getMonths = useCallback(async () => {
        setMonths(null);
        try {
            const resp = await axios.get(`${API_URL}/api/months`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMonths(resp.data.months);
        } catch (e) {
            console.log(e)
        }
    }, []);
    const options = useMemo(() => {
        return months?.map(month => {
            return { value: month, label: month }
        });
    },[months]);
    useEffect(() => {
        if (!months) {
            getMonths().then(() => null)
        }
    },[months]);

    useEffect(() => {
        if(!!kpi) {
            const MEMBER = options?.find(option => option.value === kpi?.month)
            setSelected(MEMBER)
        }
    },[kpi]);

    useEffect(() => {
        if (document.querySelector('#renewalTargetAudience')) {
            document.querySelector('#renewalTargetAudience').value = kpi?.renewal_target_audience || 0;
            document.querySelector('#renewedPolicies').value = kpi?.renewed_policies || 0;
            document.querySelector('#incentivePercentage').value = kpi?.incentive_percentage || 0;
            document.querySelector('#renewedPremium').value = kpi?.renewed_premium || 0;
            document.querySelector('#canceledPolicies').value = kpi?.canceled_policies || 0;
        }
    },[kpi]);
    return (
        <>
            <form className={styles.form}>
                {isCreate ?
                    <h1>Crear KPI</h1>
                    :
                    <h1>Editar KPI</h1>
                }
                <label className='nextui-c-hzQjrs nextui-input-block-label' htmlFor="member">Mes</label>
                <Select
                    className={styles.inputs}
                    options={options}
                    value={selected}
                    onChange={e => setSelect(e)}
                />
                <Spacer y={1} />
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
                    label="Pólizas canceladas"
                    defaultValue={kpi?.canceled_policies}
                    onChange={e => setInput(e)}
                />
                <Spacer y={1} />
                {message && (<p className={styles.messageAlert}>{message}</p>)}
                {isCreate ?
                    <a className={styles.btnKpi} onClick={() => createKpi(kpi)}>Crear</a>
                    :
                    <a className={styles.btnKpi} onClick={() => updateKpi(kpi)}>Editar</a>
                }
            </form>
        </>
    )
}
