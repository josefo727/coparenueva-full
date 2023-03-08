import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";
import styles from '/styles/pages/SpecialCases.module.css'
import FormSpecialCases from "../../../components/Forms/FormSpecialCases";

export default function Edit() {
    const router = useRouter()
    const { id } = router.query
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [data, setData] = useState([]);
    const [members, setMembers] = useState(null)

    const getSpecialCases = useCallback(async () => {
      try {
        const resp = await axios.get(`${API_URL}/api/special-cases/`+id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(resp.data);
      } catch (error) {
        console.error(error);
      }
    }, [id]);

    const getMembers = useCallback(async () => {
        setMembers(null);
        try {
            const resp = await axios.get(`${API_URL}/api/members`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMembers(resp.data.data);
        } catch (e) {}
    }, []);

    useEffect(() => {
        getMembers()
            .then(() => null);
        if (id) {
            getSpecialCases()
                .then(() => null);
        }
    }, [id])
    return(
        <>
            <Layout
                title='Editar Usuarios'
                descripcion='Edición de usuarios'
                navTitle='Editar usuarios'
                ruta='users'
            >
                <div className={styles.containerSpecialCases}>
                    <div className={styles.specialCasesEdit}>
                        {data ?
                            <FormSpecialCases
                                special={data}
                                members={members}
                                isEdit={true}
                            />
                        :null
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
