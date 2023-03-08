import Layout from '/components/Layout'
import styles from '/styles/pages/MyTeam.module.css'
import { Image, Text, Spacer } from "@nextui-org/react";
import FormRegisterRenovators from '/components/Forms/FormRegisterRenovators'
import {useEffect, useState, useCallback} from "react";
import axios from "axios";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function MyTeam() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [members, setMembers] = useState(null);
    const [renovator, setRenovator] = useState({name: '', genre: ''})
    const [isCreate, setIsCreate] = useState(true)
    const [load, setLoad] = useState(false);
    const [itemSlider, setItemSlider] = useState(1);

    const getMembers = useCallback(async () => {
        setLoad(true);
        setMembers(null);
        const resp = await axios.get(`${API_URL}/api/members`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setMembers(resp.data.data);
        setLoad(false);
        setIsCreate(true);
    }, []);


    const editMember = (member) => {
        setRenovator(({name: '', genre: ''}))
        setIsCreate(false);
        setRenovator(member)
    }
    const createMember = async () => {
        setRenovator(({name: '', genre: ''}))
        setIsCreate(true);
    }

    useEffect(() => {
        getMembers()
            .then(r => null)
    },[]);

    useEffect(() => {
        if (members) {
            if (members.length <= 2) {
                setItemSlider(members.length);
            } else {
                setItemSlider(3)
            }
        }
    },[members]);
    
    return (
        <>
            <Layout title='Mi equipo' descripcion='Mi equipo-Agentes Renovadores' navTitle='Mi equipo-Agentes Renovadores' ruta='team'>
                <div className={styles.containerMyTeam}>
                    <div className={styles.team}>
                        <Spacer y={2.5}/>
                        {!load ?
                            <>
                                <div className={styles.contentSlider}>
                                    <Slide
                                        slidesToScroll={itemSlider}
                                        slidesToShow={itemSlider}
                                        indicators={true}
                                    >
                                        {members?.map((member, index) => (
                                            <div key={index}>
                                                <Image
                                                    src={member.genre === 'male' ? 'male.png' : 'female.png'}
                                                    alt="Default Image"
                                                    width={200}
                                                    height={200}
                                                    className={styles.imageMember}
                                                    onClick={() => editMember(member)}
                                                />
                                                <Text className={styles.name}>{member.name}</Text>
                                            </div>
                                        ))}
                                    </Slide>
                                </div>

                                <FormRegisterRenovators
                                    renovator={renovator}
                                    isCreate={isCreate}
                                    getMembers={getMembers}
                                    createMember={createMember}
                                />
                            </>
                        :null
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
