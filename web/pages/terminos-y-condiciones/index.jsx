import { useEffect, useState } from 'react'
import Layout from '/components/Layout'
import styles from '/styles/pages/TermsAndConditions.module.css'
import { user, token } from './../../auth';
import axios from 'axios';
import { GrCheckbox } from 'react-icons/gr';

export default function TermsAndConditions() {
    const API_URL = `${process.env.SERVER_API_HOST}`;
    const [hasAcceptedTheTerms, setHasAcceptedTheTerms] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const accept = async () => {
            const TOKEN = token();
            const headers = {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                }
            }
            try {
                const response = await axios.put(`${API_URL}/api/accept-terms`, {}, headers);
                const { user } = await response.data;
                localStorage.setItem('user', JSON.stringify(user));
                setHasAcceptedTheTerms(user.terms);
            }catch (e) {
                console.log(e);
            }

    }

    useEffect(() => {
        const USER = user();
        setIsAdmin(USER.is_admin);
        setHasAcceptedTheTerms(USER.terms)
    }, [user])

    return (
        <>
            <Layout title='Términos y Condiciones' descripcion='Términos y Condiciones' navTitle='Términos y condiciones' ruta='terms'>
                <div className={styles.containerTerms}>
                    <div className={styles.terms}>
                        <p><strong>Términos y condiciones para el cálculo del índice de persistencia:</strong></p>
                        <br/>

                        <span className={styles.separator}>Si el cliente tiene dos o más pólizas y/o contratos que se encuentren en el grupo objetivo de la campaña, cada uno será considerado de manera independiente para el cálculo del índice de persistencia.</span>
                        <span className={styles.separator}>Los cambios de plan/póliza/contrato en la misma compañía o entre compañías de clientes vigentes, serán considerados para el cálculo del índice de persistencia siempre que la vigencia del nuevo plan/póliza/contrato no exceda 31 días en relación con la cancelación del plan/póliza/contrato anterior.</span>
                        <span className={styles.separator}>Los cambios de Titular a Dependiente serán considerados para el cálculo del índice de persistencia, siempre que no vaya a una póliza/contrato que sea considerado nuevo negocio, es decir, que exceda los 31 días después de la fecha de su emisión.</span>
                        <span className={styles.separator}>Los cambios de Dependiente a Titular no serán considerados para el cálculo del índice de persistencia; puesto que el cálculo de dicho índice se hace por póliza, más no por afiliado/asegurado y son considerados como nuevo negocio.</span>
                        <span className={styles.separator}>La internacionalización de una póliza, es decir, el cambio de una póliza emitida en BMI Ecuador a BMI Miami, no sumará al cálculo del índice de persistencia.</span>
                        <span className={styles.separator}>Los cambios de socio estratégico no afectarán al cálculo de la persistencia del socio anterior, siempre y cuando la póliza y/o contrato se mantenga vigente hasta el 31 de diciembre del año de análisis. Y tampoco son parte del cálculo de persistencia del nuevo socio.</span>
                        <span className={styles.separator}>Los casos de cancelación por fallecimiento se revisan de forma manual.</span>
                        
                        <br/>
                        <p><strong>No se realizará ningún tipo de excepción que no esté explícitamente descrita en los términos y condiciones de la campaña.</strong></p>
                    </div>
                    {
                        !isAdmin &&
                        <div className={styles.terms}>
                            {hasAcceptedTheTerms ?
                                'Usted ha aceptado los términos y condiciones.'
                            :
                                <div className={styles.check}>
                                    <span onClick={accept}><GrCheckbox /></span> Acepto los términos y condiciones leídos
                                </div>
                            }
                        </div>
                    }

                </div>
            </Layout>
        </>
    )
}
