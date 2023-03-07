import Layout from '/components/Layout'
import styles from '/styles/pages/PlayersBase.module.css'
import {Spacer,Text} from '@nextui-org/react';
import {useEffect, useState} from "react";
import {user} from "../../auth";

export default function PlayerBase() {

    const [urlDetail, setUrlDetail] = useState({});
    useEffect(() => {
        const USER = user();
        setUrlDetail(USER?.url);
    }, [])
    return (
        <>
            <Layout title='Base de jugadores' descripcion='base de jugadores' navTitle='Base de jugadores' ruta='playersBase'>
                <div className={styles.containerPlayersBase}>
                    <div className={styles.playersBase}>
                        <p>
                            Renovadores, antes de iniciar la temporada de renovaciones no olvides leer las todas las instrucciones ubicadas en el menú.
                        </p>
                        <Spacer y={1} />
                        <p>
                            Sabemos que todos nuestros jugadores (clientes) son importantes, sin embargo, necesitamos renovar nuestros jugadores estrella. Descarga la base y descubre cuáles son.
                        </p>
                        <Spacer y={2} />
                        {!!urlDetail &&
                            <a
                                href={urlDetail}
                                target='_blank'
                                className={styles.downloadLink}
                                rel="noreferrer"
                            >Descargar base de jugadores</a>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}
