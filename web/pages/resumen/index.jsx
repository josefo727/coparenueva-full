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
                navTitle='¡Hola, Agente Renovador!'
                navSubTitle='Bienvenida/o a la Temporada de Renovaciones. Renueva más, gana más'
                ruta='resumen'>

                <div className={styles.containerResumen}>
                    <section className={styles.containerBox}>
                        <div className={`${styles.box} ${styles.policies}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Pólizas a renovar <br/> “Público objetivo”</span>
                            </div>
                            <h1 className={styles.valor }>100</h1>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Pólizas <br/> renovadas</span>
                            </div>
                            <h2 className={styles.valor}>82</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Índice de <br/> renovación</span>
                            </div>
                            <h2 className={styles.valor}>82%</h2>
                        </div>
                        <div className={`${styles.box}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Prima  <br/> renovada</span>
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
                            <span>Pólizas <br/> canceladas </span>
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
                            <a className={styles.downloadLink}>Descargar informe detallado</a>
                        </div>
                        <div>
                            <Text css={{ color: "#808B96" }}>
                                Este reporte se actualizará cada semana
                                Fecha de actualización: 12 de Marzo 2023
                            </Text>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
