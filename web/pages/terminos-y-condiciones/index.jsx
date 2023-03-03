import Layout from '/components/Layout'
import styles from '/styles/pages/TermsAndConditions.module.css'
export default function TermsAndConditions() {
    return (
        <>
            <Layout title='Términos y Condiciones' descripcion='Términos y Condiciones' navTitle='Términos y condiciones' ruta='terms'>
                <div className={styles.containerTerms}>
                    <div className={styles.terms}>
                        <p>
                            Para cuantificar las pólizas que se considerarán para el resultado de la campaña, se tomó como
                            base la política del cálculo de persistencia, con ciertas variaciones detalladas a continuación:
                        </p>
                        <ul>
                            <li>
                                Si el cliente tiene dos o más pólizas y/o contratos que se encuentren en el grupo objetivo
                                de la campaña, cada uno será considerado de manera independiente para el cálculo de la persistencia.
                            </li>
                            <li>
                                Los cambios de plan/póliza/contrato serán considerados para el cálculo de persistencia
                                siempre que la vigencia del nuevo plan/póliza/contrato no exceda 31 días en relación a la
                                cancelación del plan/póliza/contrato anterior.
                            </li>
                            <li>
                                Los cambios de Titular a Dependiente serán considerados para el cálculo de persistencia
                                siempre que no vaya a una póliza/contrato que sea considerado nuevo negocio, es decir,
                                que exceda los 31 días después de la fecha de su emisión.
                            </li>
                            <li>
                                Los cambios de Dependiente a Titular, a pesar de ser considerados nuevo negocio en la política
                                general de persistencia, sí serán considerados para el cálculo de persistencia de la campaña.
                            </li>
                            <li>
                                Los cambios de agente no afectarán al cálculo de la persistencia, del Agente anterior,
                                siempre y cuando la póliza y/o contrato se mantenga vigente durante el periodo establecido
                                para la campaña. Es decir, no son parte del cálculo de persistencia del nuevo Agente.
                            </li>
                            <li>
                                La internacionalización de una póliza; es decir, el cambio de una póliza emitida en BMI
                                Ecuador a BMI Miami, no sumará al cálculo de la persistencia.
                            </li>
                        </ul>
                        <h3>Exclusiones:</h3>
                        <p>
                            En el caso de una exclusión, se reducirá el número de pólizas del grupo objetivo, sin que eso
                            implique la modificación en la tabla base para el cálculo del nivel del incentivo.
                        </p>
                        <p>
                            Se considerarán exclusiones los casos detallados a continuación:</p>
                        <ul>
                            <li>Los casos de cancelación por fallecimiento.</li>
                        </ul>
                        <h3>No se realizará ningún tipo de excepción que no esté explícitamente descrita en los términos y condiciones de la campaña.</h3>
                    </div>
                </div>
            </Layout>
        </>
    )
}
