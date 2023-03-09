import React, {useState, useCallback, useEffect} from 'react'

import styles from '/styles/FormRegisterRenovators.module.css'
import { Input, Radio, Spacer,} from "@nextui-org/react";
import axios from "axios";
import Router from "next/router";

export default function FormRegisterRenovators({renovator, isCreate, getMembers, createMember}) {

    const [data, setData] = useState({})
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState('');

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
        setMessage('')
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.post(`${API_URL}/api/members/`, res, headers);
            await getMembers()
        }catch (e){
            setMessage('Todos los camos son requeridos');
        }
    };

    const EditMember = async (res) => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.put(`${API_URL}/api/members/${res.id}`, res, headers);
            await getMembers();
            await createMember();
        }catch (e) {
            setMessage('Todos los camos son requeridos');
        }
    };

    const deleteMember = async () => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            await axios.delete(`${API_URL}/api/members/${idUserDelete}`, headers);
            await getMembers();
            await createMember();
        }catch (e) {
        }
    };


    const isModal = (id) => {
        setShowModal(true);
        setIdUserDelete(id);
    }
    const closeModal = () => {
        setShowModal(false);
        setIdUserDelete('');
    }
    useEffect(() => {
        setData(renovator)
    },[renovator])
    useEffect(() => {
        document.querySelector('#member_name').value = data?.name || ''
    },[data])

    return (
        <>
            <form className={styles.form}>
                { !isCreate ? <a className={styles.createMember} onClick={() => createMember()}>Crear Miembro</a> :null }
                <p>Registra tu equipo de renovadores</p>
                <Input
                    id='member_name'
                    clearable
                    bordered
                    label="Nombre completo"
                    name="name"
                    defaultValue={data?.name}
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
                {!!message ? <p className={styles.error}>{message}</p> : <Spacer y={1} /> }
                {
                    isCreate ?
                        <a className={styles.registerRenovators} onClick={() => RegisterRenovators(data)}>REGISTRAR</a>
                    :
                        <div className={styles.actions}>
                            <a className={styles.editRenovators} onClick={() => EditMember(data)}>EDITAR</a>
                            <a className={styles.deleteRenovators} onClick={() => isModal(data.id)}>ELIMINAR</a>
                        </div>
                }
                {showModal ?
                    <div className={styles.contentDeleteConfirm}>
                        <div className={styles.deleteConfirm}>
                            <p>Esta seguro de eliminar a este miembro</p>
                            <div >
                                <a className={styles.btnConfirm} onClick={() => deleteMember()}>Confirmar</a>
                                <a className={styles.btnCancel} onClick={() => closeModal()}>Cancelar</a>
                            </div>
                        </div>
                    </div>
                :null}
            </form>
        </>
    )
}