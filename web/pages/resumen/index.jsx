import Layout from '/components/Layout'
import React from "react";
import Link from 'next/link'
import styles from  '/styles/pages/Resumen.module.css'
import { IoBagHandle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";

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
                                <span className={styles.icon}>
                                    <IoBagHandle/>
                                </span>
                                <span>A renovar</span>
                            </div>
                            <h2 className={styles.valor }>500</h2>
                        </div>
                        <div className={`${styles.box} ${styles.renewed}`}>
                            <div className={styles.contentIconTitle}>
                                <span className={styles.icon}>
                                    <FaUser/>
                                </span>
                                <span>Renovados</span>
                            </div>
                            <h2 className={styles.valor}>230</h2>
                        </div>
                        <div className={`${styles.box} ${styles.canceled}`}>
                            <div className={styles.contentIconTitle}>
                                <span className={styles.icon}>
                                    <BsArrowCounterclockwise/>
                                </span>
                                <span>Cancelados</span>
                            </div>
                            <h2 className={styles.valor}>60</h2>
                        </div>
                        <div className={`${styles.box} ${styles.persistence}`}>
                            <div className={styles.contentIconTitle}>
                                <span>Persistencia</span>
                            </div>
                            <h2 className={styles.valor}>230</h2>
                        </div>
                        <div className={`${styles.box} ${styles.levelIncentive}`}>
                            <span>Nivel de incentivo</span>
                            <div>
                                2k
                            </div>
                        </div>
                        <div className={`${styles.box} ${styles.approximate}`}>
                            <span>Valor aproximado de incentivo</span>
                            <div>
                                2k
                            </div>
                        </div>
                        <div className={`${styles.box} ${styles.closing}`}>
                            <span>Fecha de cierre</span>
                            <h2 className={styles.dateClosing}>8 de Octubre</h2>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}
