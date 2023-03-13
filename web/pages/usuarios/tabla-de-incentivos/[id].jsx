import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import Layout from "../../../components/Layout";
import styles from '/styles/FormIncentivesTable.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import Router, {useRouter} from 'next/router';
import Link from "next/link";
import {Image, Loading, Spacer} from "@nextui-org/react";
import {isAuthenticated} from "../../../auth";

export default function Edit() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [load, setLoad] = useState(true);
    const [incentiveTable, setIncentiveTable] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const getImage = useCallback(async (ID) => {
        setLoad(true);
        setIncentiveTable(null);
        const resp = await axios.get(`${API_URL}/api/user-incentive-table?id=${ID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setIncentiveTable(resp.data.url);
        setLoad(false);
    }, []);

    const handleImageChange = (event) => {
        if (event?.target?.files[0]) {
            setImagePreview(null);
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file);
            setNewImage(file);
        }
    };
    const updateIncentiveTable = async () => {
        setLoad(true);
        const form = new FormData();
        form.append('userId', id);
        form.append('image', newImage);
        form.append('_method', 'PUT');
        const URL = `${API_URL}/api/user-incentive-table`;

        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        };

        try {
            await axios.post(URL, form, config);
            // await Router.push('/usuarios');
        } catch (e) {
            console.log(e);
        }
        setLoad(false);
    }

    useEffect(() => {
        if (!!id){
            getImage(id)
                .then(() => null);
        }
    },[id])
    return(
        <>
            <Layout
                title='Editar Usuarios'
                descripcion='Edición de usuarios'
                navTitle='Editar usuarios'
                ruta='users'
            >
                <div className={styles.containerIncentivesTable}>
                    <div className={styles.incentivesTable}>
                        <Link className={styles.goBack} href='/usuarios'><AiOutlineArrowLeft/> regresar</Link>
                        <Spacer y={1}/>
                        {!load && (
                            <>
                                <div className={styles.tableIncentives}>
                                    {!!incentiveTable ?
                                        <Image
                                            width={'100%'}
                                            height={'100%'}
                                            src={`${API_URL}${incentiveTable}`}
                                            alt='Tabla de incentivos'
                                            objectFit="cover"
                                        />
                                        :
                                        <p>Todavía no se ha cargado una imagen para este módulo.</p>
                                    }
                                </div>
                                <form>
                                    <label htmlFor="image" className={styles.addImage}>
                                        Click to add image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        onChange={e => handleImageChange(e)}
                                        style={{display: 'none'}}
                                    />
                                    {imagePreview && (
                                        <>
                                            <Image
                                                src={imagePreview}
                                                alt='Tabla de incentivos'
                                                objectFit="cover"
                                                width={576}
                                            />
                                            <a className={styles.btnUpdateImage} onClick={updateIncentiveTable}>Subir imagen</a>
                                        </>
                                    )}
                                </form>
                            </>
                        )}

                    </div>
                </div>
            </Layout>
        </>
    )
}
