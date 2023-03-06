import Layout from '/components/Layout'
import styles from '/styles/pages/PlayersBase.module.css'
import {Spacer,Text} from '@nextui-org/react';

export default function PlayerBase() {
    return (
        <>
            <Layout title='Base de jugadores' descripcion='base de jugadores' navTitle='Base de jugadores' ruta='playersBase'>
                <div className={styles.containerPlayersBase}>
                    <div className={styles.playersBase}>
                        <Text>
                            Renovadores, antes de iniciar la temporada de renovaciones no olvides leer las todas las instrucciones ubicadas en el menú.
                        </Text>
                        <Spacer y={1} />
                        <p>
                            Sabemos que todos nuestros jugadores (clientes) son importantes, sin embargo, necesitamos renovar nuestros jugadores estrella. Descarga la base y descubre cuáles son.
                        </p>
                        <Spacer y={2} />
                        <a className={styles.downloadLink}>Descargar base de jugadores</a>
                    </div>
                </div>
            </Layout>
        </>
    )
}
