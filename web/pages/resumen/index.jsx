import Layout from '/components/Layout'
import React from "react";
import Link from 'next/link'
import styles from  '/styles/pages/Resumen.module.css'
import { IoBagHandle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { Text } from '@nextui-org/react';

export default function Resumen() {
    return (
        <>
            <Layout
                title='Resumen'
                descripcion='Resumen'
                navTitle='¡Hola, renovador!'
                navSubTitle='Bienvenido a la COPA RENUEVA. Más renuevo, más gano.'
                ruta='resumen'>
     
                <div className={styles.containerResumen}>
                    <section className={styles.containerBox}>
                        <div className={`${styles.box} ${styles.policies}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Polizas a renovar <br/> Grupo objetivo</span>
                            </div>
                            <h1 className={styles.valor }>100</h1>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Polizas <br/> Renovadas</span>
                            </div>
                            <h2 className={styles.valor}>82</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Indice de <br/> Renovación</span>
                            </div>
                            <h2 className={styles.valor}>82%</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Prima <br/> Renovada</span>
                            </div>
                            <h2 className={styles.valor}>$50k</h2>
                        </div>
                        <div className={`${styles.box2}`}>
                            <Text>Nivel de incentivo</Text>
                            <div className={styles.tres} >
                                <Text> 3 </Text>
                            </div>
                            <div className={styles.dos} >
                                <Text> 2 </Text>
                            </div>
                            <div className={styles.uno} >
                                <Text> 1 </Text>
                            </div>
                        </div>
                        <div className={`${styles.box}`}>
                            <span>Valor <br/> aproximado <br/> de incentivo</span>
                            <h2 className={styles.valor}>
                                $6k
                            </h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <span>Pólizas <br/> Canceladas </span>
                            <h2 className={styles.valor}>
                                30
                            </h2>
                        </div>
                        {/* <div className={`${styles.box} ${styles.closing}`}>
                            <span>Fecha de cierre</span>
                            <h2 className={styles.dateClosing}>8 de Octubre</h2>
                        </div> */}
                    </section>
                    <div className={`${styles.containerBoxEnd}`}>
                        <div>
                            <a className={styles.downloadLink}>Descargar base de jugadores</a>
                        </div>
                        <div>
                            <Text css={{ color: "#808B96" }}>
                                Este reporte se actualizará cada semana.<br/>
                                Fecha de corte: 12 Marzo 2023
                            </Text>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
