import Layout from '/components/Layout'
import styles from '/styles/pages/Instructions.module.css'

export default function Instructions() {
    return (
        <>
            <Layout title='Instrucciones' descripcion='Instrucciones' navTitle='Instrucciones' ruta='instructions'>
                <div className={styles.containerInstructions}>
                    <div className={styles.instructions}>
                        <h1>Términos generales</h1>
                        <div>
                            <p>• Objetivo:</p>
                            <ol>-	La campaña tiene como objetivo reconocer la gestión de renovación priorizada que los equipos de renovaciones de cada uno de los Agentes participantes realizarán.</ol>

                            <p>• Grupo objetivo</p>
                            ¿Qué es? - El grupo objetivo es el conjunto de pólizas a renovar, con base al cual se calculará el valor del incentivo. Solamente las pólizas que estén en el grupo objetivo serán contabilizadas para la Campaña “Copa Renueva”.
                            <ol>-	El listado del grupo objetivo de pólizas a renovar se publicará previo al inicio de la Campaña, en la página web.</ol>

                            <p>• Equipo de renovadores:</p>
                            ¿Qué es? - El equipo de renovadores está conformado por las personas dentro de la estructura del Agente que se encargan de gestionar las renovaciones de los grupos objetivo.
                            <ol>-	Cada Agente podrá inscribir a un máximo de 5 personas, en su equipo de renovadores.</ol>
                            <ol>-	Uno o varios de los renovadores podrán ser reemplazos, siempre que no se altere el número de renovadores.</ol>

                            <p>• Duración:</p>
                            <ol>-	La campaña se llevará a cabo durante seis meses del presente año: abril, mayo, junio, julio, agosto y septiembre.</ol>

                            <p>• Seguimiento:</p>
                            <ol>-	El equipo de renovadores y el líder de cada Agente podrá conocer el resultado de la campaña con corte mensual, a través de la página web.</ol>
                            <ol>-	En cada corte mensual, se publicará también el valor aproximado del incentivo obtenido por las renovaciones hasta la fecha de corte.</ol>

                            <p>• Resultados:</p>
                            <ol>-	Para el cálculo del valor del incentivo, solo se contabilizarán aquellas pólizas del grupo objetivo que se mantengan activas 100 días después de su renovación.</ol>

                            <p>• Premiación:</p>
                            <ol>-	Se realizarán dos premiaciones. En la primera, que se llevará a cabo en octubre del 2023; se contabilizarán las pólizas de los tres primeros meses de la campaña (abril, mayo y junio). En la segunda premiación, que se realizará en enero el 2024; se contabilizarán las pólizas de los tres meses restantes (julio, agosto y septiembre).</ol>
                            <ol>-	El valor del incentivo se calculará de la siguiente manera: prima total renovada de las pólizas del grupo objetivo por el porcentaje de clientes renovados, según cada nivel.</ol>
                            <ol>-	La tabla, con el detalle de los niveles y su respectivo valor de incentivo, serán socializadas con cada Agente, previo al inicio de la campaña. Del mismo modo, estará publicada en la página web.</ol>
                            <ol>-	El pago del incentivo se realizará a través de Gift Cards a los equipos de renovadores de cada Agente. No se realizará el pago del incentivo a través de ningún otro medio.</ol>
                            <ol>-	Previo a la emisión de cada Gift Card, se acordará con el líder de cada Agente el porcentaje del valor del incentivo que se otorgará a cada uno de los renovadores; el mismo, que será entregado a través de una Gift Card.</ol>

                            <p>• Casos especiales:</p>
                            <ol>-	Los casos especiales son aquellos casos que no están tipificados dentro de las bases y condiciones. El único canal de consulta habilitado para los casos especiales será a través de un formulario al que se podrá acceder en la página web de la campaña.</ol>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
