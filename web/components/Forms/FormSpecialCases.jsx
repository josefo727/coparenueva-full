import React, {useState, useEffect, useMemo} from 'react'
import styles from '/styles/FormSpecialCases.module.css'
import {Input, Spacer, Textarea, Dropdown } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import {AiOutlineArrowLeft} from "react-icons/ai";
import Router from "next/router";
import Select from "react-select";


export default function FormSpecialCases({special, isEdit, getSpecialCases}) {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [data, setData] = useState({member_id: '', email: '', detail: ''});
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [selected, setSelected] = useState({ value: null, label: null });


    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        setMembers(null);
        const resp = await axios.get(`${API_URL}/api/members`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setMembers(resp.data.data);
    };

    useEffect(() => {
        getMembers()
            .then(()=>null)
    },[]);

    const options = useMemo(() => {
        return members?.map(member => {
            return { value: member.id, label: member.name }
        });
    },[members]);


    useEffect(() => {
        if(!!special) {
            setData(special);
            const MEMBER = options?.find(option => option.value === special?.member_id)
            setSelected(MEMBER)
        }
    },[special]);

    const setInput = e => {
        setField(e.target.name, e.target.value);
    }
    const setSelect = e => {
        setSelected(e);
        setField('member_id', e.value);
    }
    const setField = (field, value) => {
        setData({
            ...data,
            [field] : value
        });
    }
    const ReportCase = async (res) => {
        setAlert(false);
        console.log(res)
        if (
            !!res?.member_id &&
            !!res?.email &&
            !!res?.detail
        ){
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            try {
                const response = await axios.post(`${API_URL}/api/special-cases`, res, headers);
                if (response.statusText === "Created") {
                    await getSpecialCases()
                    setMessage('Reporte creado satisfactoriamente.');
                    setData({member_id: '', email: '', detail: ''});
                    setSelected({ value: null, label: null })
                    setTimeout(() => {
                        setMessage('');
                    },3000)
                }
            }catch (e) {
                console.log(e)
            }
        } else {
            setAlert(true)
        }
    };
    const updateSpecialCases = async (res) => {
        if (
            !!res.member_id &&
            !!res.email &&
            !!res.detail
        ){
            const headers = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            try {
                const response = await axios.put(`${API_URL}/api/special-cases/${res.id}`, res, headers);
                if (response.statusText === "OK") {
                    setData({member_id: '', email: '', detail: ''});
                    Router.push('/casos-especiales');
                }
            }catch (e) {
                console.log(e)
            }
        } else {
            setAlert(true)
        }
    };



    useEffect(() => {
        document.querySelector('#email').value = data?.email || '';
        document.querySelector('#detail').value = data?.detail || '';
    },[data])
    return (
        <>
            <form className={styles.form}>
                {isEdit ? <Link className={styles.goBack} href='/casos-especiales'><AiOutlineArrowLeft/> regresar</Link> :null}
                <Spacer y={1} />
                <h3 className={styles.title}>¿Deseas reportar un caso?</h3>
                <Spacer y={2} />
                <label className='nextui-c-hzQjrs nextui-input-block-label' htmlFor="member">Miembro de equipo</label>
                <Select
                    id={'member'}
                    className={styles.inputs}
                    options={options}
                    value={selected}
                    onChange={e => setSelect(e)}
                />
                <Spacer y={1} />
                <Input
                    id='email'
                    className={styles.inputs}
                    clearable
                    bordered
                    label="Correo electrónico"
                    name="email"
                    type='email'
                    defaultValue={data?.email}
                    onChange={e => setInput(e)}
                    required='true'
                />
                <Spacer y={1} />

                <Textarea
                    id='detail'
                    clearable
                    bordered
                    className={styles.inputs}
                    label="Detalle de caso"
                    name='detail'
                    defaultValue={data?.detail}
                    onChange={e => setInput(e)}
                    required='true'
                    rows={12}
                />

                {alert ? <p className={styles.messageAlert}>Todos los campos son requeridos</p> : <Spacer y={1} />}
                {isEdit ?
                    <a className={styles.evaluarCaso} onClick={() => updateSpecialCases(data)}>Editar</a>
                :
                    <a className={styles.evaluarCaso} onClick={() => ReportCase(data)}>EVALUAR</a>
                }
                {!!message ? <p className={styles.message}>{message}</p> : <Spacer y={1} />}
                <Spacer y={1} />
            </form>
        </>
    )
}
