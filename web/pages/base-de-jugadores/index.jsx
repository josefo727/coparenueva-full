import Layout from '/components/Layout'
import styles from '/styles/pages/PlayersBase.module.css'

export default function PlayerBase() {
    return (
        <>
            <Layout title='Base de jugadores' descripcion='base de jugadores' navTitle='Base de jugadores' ruta='playersBase'>
                <div className={styles.containerPlayersBase}>
                    <div className={styles.playersBase}>
                        <p>
                            Renovadores, antes de iniciar la copa queremos darte
                            información e instrucciones de la dinámica.
                        </p>
                        <p>
                            Sabemos que todos nuestros jugadores son importantes,
                            sin embargo, necesitamos renovar nuestro equipo titular,
                            por ello, hemos elegido a una base de jugadores para tenerlos
                            un año más con nosotros.
                        </p>
                        <a className={styles.downloadLink}>Descargar base de jugadores</a>
                    </div>
                </div>
            </Layout>
        </>
    )
}
