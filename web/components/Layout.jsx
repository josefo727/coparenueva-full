import Head from "next/head";
import Sidebars from './Sidebars'
import styles from '/styles/Layout.module.css'
import { ProSidebarProvider } from "react-pro-sidebar"
import {isAuthenticated} from "../auth";
import {useEffect, useState} from "react";
import Router from "next/router";
import {Loading} from "@nextui-org/react";

export default function Layout({children, title, description, navTitle, navSubTitle, ruta}) {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            Router.push('/');
        } else {
            setAuth(true)
        }
    },[isAuthenticated]);

    if (!auth) return null;


    return (
        <>
            <ProSidebarProvider>
                <Head>
                    <title>{title}</title>
                    <meta name="Description" content={description}/>
                </Head>
                <Sidebars navTitle={navTitle} navSubTitle={navSubTitle} ruta={ruta}>
                    {children}
                </Sidebars>
            </ProSidebarProvider>
        </>
    )
}
Layout.defaultProps = {
    title: "Proyecto",
    description: "Pagina del proyecto"
}
