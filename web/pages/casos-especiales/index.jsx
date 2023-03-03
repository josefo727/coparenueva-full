import Layout from '/components/Layout'
import styles from '/styles/pages/SpecialCases.module.css'
import FormSpecialCases from '/components/Forms/FormSpecialCases'
import { Spacer } from "@nextui-org/react";


export default function SpecialCases() {
    return (
        <>
            <Layout title='Casos Especiales' descripcion='Casos Especiales' navTitle='Casos Especiales' ruta='specials'>
                <div className={styles.containerSpecialCases}>
                    <div className={styles.specialCases}>
                        <p>
                            <em>¿Qué son? – <strong>Los casos especiales son aquellos casos que no están</strong> </em>tipificados dentro de las bases y condiciones.
                            El único canal de consulta habilitado para los casos especiales será a través de este formulario.
                        </p>
                        <Spacer y={1} />
                        <p>
                            <strong>Importante: Solo se evaluarán aquellos casos que no estén tipificados en las bases y condiciones de la campaña.</strong>
                        </p>
                        <Spacer y={2.5} />
                    </div>
                    <div className={styles.FormSpecialCases}>
                        <FormSpecialCases/>
                    </div>
                </div>

            </Layout>
        </>
    )
}
