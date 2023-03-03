import Head from "next/head";
import Sidebars from './Sidebars'
import styles from '/styles/Layout.module.css'
import { ProSidebarProvider } from "react-pro-sidebar";

export default function Layout({children, title, description, navTitle, navSubTitle, ruta}) {
    return (
        <ProSidebarProvider>
            <Head>
                <title>{title}</title>
                <meta name="Description" content={description}/>
            </Head>
            <Sidebars navTitle={navTitle} navSubTitle={navSubTitle} ruta={ruta} children={children}/>
        </ProSidebarProvider>
    )
}
Layout.defaultProps = {
    title: "Proyecto",
    description: "Pagina del proyecto"
}
