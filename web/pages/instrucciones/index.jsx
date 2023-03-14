import Layout from '/components/Layout'
import styles from '/styles/pages/Instructions.module.css'

export default function Instructions() {
    return (
        <>
            <Layout title='Instrucciones' descripcion='Instrucciones' navTitle='Instrucciones' ruta='instructions'>
                <div className={styles.containerInstructions}>
                    <div className={styles.instructions}>
                        <h1>Instrucciones generales:</h1>
                        <div>
                            <p className={styles.subTitle}>1. Objetivo:</p>
                            <span  className={styles.separator}>La campaña tiene como objetivo reconocer la gestión de renovación priorizada del equipo de renovaciones (Agentes renovadores) de cada uno de los Socios Estratégicos participantes.</span>

                            <p className={styles.subTitle}>2. Grupo objetivo</p>
                            <p>¿Qué es? - El <strong>grupo objetivo</strong> es el conjunto de pólizas/contratos a renovar, con base al cual se calculará el valor del incentivo. Solamente las pólizas/contratos que estén en el grupo objetivo serán contabilizadas para la Campaña “Temporada de renovaciones”.</p>
                            <span  className={styles.separator}>El listado del grupo objetivo de pólizas/contratos a renovar se publicará previo al inicio de la Campaña, en la página web.</span>

                            <p className={styles.subTitle}>3. Equipo de Agentes Renovadores:</p>
                            <p>¿Qué es? - El <strong>equipo de agentes renovadores</strong> está conformado por las personas dentro de la estructura del Socio Estratégico que se encargan de gestionar las renovaciones de los grupos objetivo.</p>
                            <span  className={styles.separator}>Cada socio podrá inscribir a un máximo de 5 personas, en su equipo de agentes renovadores.</span>
                            <span  className={styles.separator}>Uno o varios de los agentes renovadores podrán ser reemplazos, siempre que no se altere el número de renovadores.</span>

                            <p className={styles.subTitle}>4. Duración:</p>
                            <span  className={styles.separator}>La campaña se llevará a cabo durante siete meses del presente año: abril, mayo, junio, julio, agosto, septiembre y octubre.</span>

                            <p className={styles.subTitle}>5. Seguimiento:</p>
                            <span  className={styles.separator}>Los Agentes renovadores y el líder de cada socio podrá conocer el resultado de la campaña con corte semanal, a través de la página web.</span>
                            <span  className={styles.separator}>En cada corte semanal, se publicará también el valor aproximado del incentivo obtenido por las renovaciones hasta la fecha de corte.</span>

                            <p className={styles.subTitle}>6. Resultados:</p>
                            <span  className={styles.separator}>Para el cálculo del valor del incentivo, solo se contabilizarán aquellas pólizas/contratos del grupo objetivo que se mantengan activas 100 días después de su fecha de renovación.</span>

                            <p className={styles.subTitle}>7. Premiación:</p>
                            <span  className={styles.separator}>Se realizarán dos premiaciones. En la primera, que se llevará a cabo en octubre del 2023; se contabilizarán las pólizas de los tres primeros meses de la campaña (abril, mayo y junio). En la segunda premiación, que se realizará en febrero del 2024; se contabilizarán las pólizas de los cuatro meses restantes (julio, agosto, septiembre y octubre).</span>
                            <span  className={styles.separator}>El valor del incentivo se calculará de la siguiente manera: prima total renovada de las pólizas/contratos del grupo objetivo por el porcentaje de incentivo, según cada nivel. *El porcentaje de incentivo de cada nivel se basa en el índice de persistencia.</span>
                            <span  className={styles.separator}>La tabla con el detalle de los niveles y su respectivo valor de incentivo, serán socializadas con cada socio, previo al inicio de la campaña. Del mismo modo, estará publicada en la página web.</span>
                            <span  className={styles.separator}>El valor del índice de persistencia se aproximará a su inmediato superior si el decimal es igual o mayor a 5.</span>
                            <span  className={styles.separator}>El pago del incentivo se realizará a través de Gift Cards a los agentes renovadores de cada socio. No se realizará el pago del incentivo a través de ningún otro medio.</span>
                            <span  className={styles.separator}>Previo a la emisión de cada Gift Card, se acordará con el líder de cada socio el porcentaje del valor del incentivo que se otorgará a cada uno de los agentes renovadores; el mismo, que será entregado a través de una Gift Card.</span>

                            <p className={styles.subTitle}>8. Casos especiales:</p>
                            <p>Para definir los términos y condiciones se ha tomado como base la Política de la Persistencia. Los “casos especiales” son aquellos casos que no están tipificados dentro de las bases y condiciones. El único canal de consulta habilitado para los casos especiales será a través de un formulario al que se podrá acceder en la página web de la campaña.</p>

                            <p className={styles.subTitle}>Importante: Solo se evaluarán aquellos casos que no estén tipificados en las bases y condiciones de la campaña.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
