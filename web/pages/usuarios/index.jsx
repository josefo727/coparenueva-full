import { useState } from 'react';
import Layout from '/components/Layout'
import styles from '/styles/pages/MyTeam.module.css'
import { Image, Grid, Text, Avatar } from "@nextui-org/react";
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Usuario',
        selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Rol',
        selector: row => row.is_admin ? 'Admin' : 'User',
    },
];

export default function Users() {
    const API_URL = `${process.env.SERVER_API_HOST}/api/`;
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const resp = await axios.get(`${API_URL}users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(resp.data.data);
    }

    useEffect(() => {
        getUsers()
            .then(() => null);
    }, [])

    return (
        <>
            <Layout title='Usuarios' descripcion='Usuarios del sistema' navTitle='Usuarios del sistema' ruta='usuarios'>
                <div className={styles.containerMyTeam}>
                    <div className={styles.team}>
                        <Grid.Container gap={2} className={styles.grid}>
                            <DataTable
                                columns={columns}
                                data={users}
                            />
                        </Grid.Container>
                    </div>
                </div>
            </Layout>
        </>
    )
}
