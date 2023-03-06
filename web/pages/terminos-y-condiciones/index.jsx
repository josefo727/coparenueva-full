import Layout from '/components/Layout'
import styles from '/styles/pages/TermsAndConditions.module.css'
export default function TermsAndConditions() {
    return (
        <>
            <Layout title='Términos y Condiciones' descripcion='Términos y Condiciones' navTitle='Términos y condiciones' ruta='terms'>
                <div className={styles.containerTerms}>
                    <div className={styles.terms}>
                        <p><strong>Bases y condiciones para el cálculo del índice de renovación</strong></p>
                        <ol>• Si el cliente tiene dos o más pólizas y/o contratos que se encuentren en el grupo objetivo de la campaña, cada uno será considerado de manera independiente para el cálculo del índice de renovación.</ol>
                        <ol>• Los cambios de plan/póliza/contrato serán considerados para el cálculo del índice de renovación siempre que la vigencia del nuevo plan/póliza/contrato no exceda 31 días en relación con la cancelación del plan/póliza/contrato anterior.</ol>
                        <ol>• Los cambios de Titular a Dependiente serán considerados para el cálculo del índice de renovación, siempre que no vaya a una póliza/contrato que sea considerado nuevo negocio, es decir, que exceda los 31 días después de la fecha de su emisión.</ol>
                        <ol>• Los cambios de Dependiente a Titular no serán considerados para el cálculo del índice de renovación; puesto que el cálculo de dicho índice se hace por póliza, más no por afiliado/asegurado.</ol>
                        <ol>• Si una póliza y/o contrato cambia de socio estratégico antes de su fecha de renovación a otro socio y este la renueva, está sí sumará al cálculo de índice de renovación.</ol>
                        <ol>• Si una póliza y/o contrato cambia de Agente antes de su fecha de renovación a otro Agente (que sí forme parte de la Campaña) que renueva dicha póliza y/o contrato, esta no sumará al cálculo de índice de renovación del nuevo Agente; puesto que dicha póliza y/o contrato no formaba parte del grupo objetivo de las pólizas a renovar.</ol>
                        <ol>• La internacionalización de una póliza; es decir, el cambio de una póliza emitida en BMI Ecuador a BMI Miami, no sumará al cálculo del índice de renovación.</ol>
                        <ol>• No se realizarán exclusiones a causa de cancelación de póliza y/o contrato por fallecimiento.</ol>
                        <p><strong>No se realizará ningún tipo de excepción que no esté explícitamente descrita en los términos y condiciones de la campaña.</strong></p>
                    </div>
                </div>
            </Layout>
        </>
    )
}
