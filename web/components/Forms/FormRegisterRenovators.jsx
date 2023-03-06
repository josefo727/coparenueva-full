import React, {useState, useCallback, useEffect} from 'react'

import styles from '/styles/FormRegisterRenovators.module.css'
import { Input, Radio, Spacer,} from "@nextui-org/react";
import axios from "axios";
import Router from "next/router";

export default function FormRegisterRenovators({renovator, isCreate, getMembers, createMember}) {

    const [data, setData] = useState({})
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const setName = e => {
        setField(e.target.name, e.target.value);
    }
    const setGender = e => {
        setField('genre', e);
    }
    const setField = (field, value) => {
        setData({
            ...data,
            [field] : value
        });
    }
    const RegisterRenovators = async (res) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/members/`, res, headers);
            await getMembers()
        }catch (e) {
        }
    };

    const EditRenovators = async (res) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.put(`${API_URL}/api/members/${res.id}`, res, headers);
            await getMembers();
            await createMember()
        }catch (e) {
        }
    };
    useEffect(() => {
        setData(renovator)
    },[renovator])

    return (
        <>
            <form className={styles.form}>
                { !isCreate ? <a className={styles.createMember} onClick={() => createMember()}>Crear Miembro</a> :null }
                <p>Registra tu equipo de renovadores</p>
                <Input
                    clearable
                    bordered
                    label="Nombre completo"
                    name="name"
                    value={data?.name}
                    onChange={e => setName(e)}
                    required={true}
                />
                <Spacer y={1} />
                <Radio.Group
                    className={styles.gender}
                    label="Género"
                    name='genre'
                    value={data?.genre}
                    onChange={e => setGender(e)}
                >
                    <Radio value="male">Hombre</Radio>
                    <Radio value="female">Mujer</Radio>
                </Radio.Group>
                <Spacer y={1} />
                {
                    isCreate ?
                        <a className={styles.registerRenovators} onClick={() => RegisterRenovators(data)}>REGISTRAR</a>
                    :
                        <a className={styles.editRenovators} onClick={() => EditRenovators(data)}>EDITAR</a>
                }
            </form>
        </>
    )
}