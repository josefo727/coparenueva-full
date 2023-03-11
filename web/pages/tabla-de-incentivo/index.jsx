import Layout from '/components/Layout'
import { useState } from "react";
import styles from '/styles/pages/Instructions.module.css'
import axios from "axios";
import {router} from "next/client";

export default function TableIncentives() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const DATA = {
            ...post,
            ['recipes']: selectedRecipes,
            ['status']: 'published',
        };
        const form = new FormData();
        if(image) form.append('images', image)
        Object.keys(POST).forEach(key => {
            if (!['products', 'images'].includes(key)) form.set(key, POST[key]);
        });

        const URL = `${API_URL}/api/user-incentive-table`;

        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        };

        try {
            const resp = await axios.post(URL, form, config);
            console.log(resp)
        } catch (e) {

        } finally {
        }
    }


    return (
        <>
            <Layout title='Tabla de incentivos' descripcion='Tabla de incentivos' navTitle='Tabla de incentivos' ruta='incentive'>
                <div className={styles.containerInstructions}>
                    <div className={styles.instructions}>
                        <h1>Instrucciones generales</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
                            <button type="submit">Upload Image</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}