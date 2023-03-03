import Layout from '/components/Layout'
import styles from '/styles/pages/MyTeam.module.css'
import { Image, Grid, Text, Avatar } from "@nextui-org/react";
import FormRegisterRenovators from '/components/Forms/FormRegisterRenovators'


export default function MyTeam() {
    return (
        <>
            <Layout title='Mi equipo' descripcion='Mi Equipo de renovación' navTitle='Mi equipo de renovación' ruta='team'>
                <div className={styles.containerMyTeam}>
                    <div className={styles.team}>
                        <Grid.Container gap={2} className={styles.grid}>
                            <Grid className={styles.contentUserImage}>
                                <Image
                                    src="/photo.jpeg"
                                    alt="Default Image"
                                    width={200}
                                    height={200}
                                    className={styles.imageUser}
                                />
                                <Text className={styles.name}>FirstName Surname</Text>
                            </Grid>
                            <Grid className={styles.contentUserImage}>
                                <Image
                                    src="/photo.jpeg"
                                    alt="Default Image"
                                    width={200}
                                    height={200}
                                    className={styles.imageUser}
                                />
                                <Text className={styles.name}>FirstName Surname</Text>
                            </Grid>
                            <Grid className={styles.contentUserImage}>
                                <Image
                                    src="/photo.jpeg"
                                    alt="Default Image"
                                    width={200}
                                    height={200}
                                    className={styles.imageUser}
                                />
                                <Text className={styles.name}>FirstName Surname</Text>
                            </Grid>
                        </Grid.Container>
                        <FormRegisterRenovators/>
                    </div>
                </div>
            </Layout>
        </>
    )
}
