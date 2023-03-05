import React, { useState } from "react";
import { Sidebar, SubMenu, Menu, MenuItem, useProSidebar, breakPoint } from "react-pro-sidebar";
import { BsFillGrid1X2Fill, BsFillFileTextFill } from "react-icons/bs";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import styles from '../styles/Sidebar.module.css';
import NavbarTop from './NavbarTop';
import Link from 'next/link';
import { logout } from "../auth";
import Router from 'next/router';
import { Image } from "@nextui-org/react";

export default function Sidebars({navTitle, navSubTitle, ruta, children}) {
    const { collapseSidebar } = useProSidebar();
    const { toggleSidebar } = useProSidebar();
    const [iscollapse, setIsCollapse] = useState(true);
    const [toggled, setToggled] = useState(false);

    const exit = async () => {
        await logout();
        Router.push('/');
    }

    const toggle = () => {
        setToggled(!toggled);
        toggleSidebar();
        if (!iscollapse) {
            setIsCollapse(!iscollapse)
            collapseSidebar()
        }
        console.log(breakPoint)
    }
    const collapse = () => {
        setIsCollapse(!iscollapse)
        collapseSidebar()
    }
    const condition_2 = false;

    const resumen = ruta === 'resumen' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const instructions = ruta === 'instructions' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const playersBase = ruta === 'playersBase' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const team = ruta === 'team' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const specials = ruta === 'specials' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const terms = ruta === 'terms' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const classCollapse = iscollapse ? `${styles.collapse}` : `${styles.collapsed}`

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar
                style={{display: 'flex'}}
                transitionDuration={1000}
                breakPoint="md"
                className={styles.contentSidebar}
                backgroundColor="#111419"
                ligth
            >
                <Menu>
                    <div>
                        <Image
                            src="https://www.bmicos.com/ecuador/wp-content/uploads/sites/9/2020/12/logo-1.png"
                            fill
                            alt="BMI"
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                        />
                        <MenuItem
                            icon={<BsFillGrid1X2Fill />}
                            component={<Link href="/resumen" />}
                            className={resumen}
                        >
                            <div className={styles.activeBookmark}/>
                            Resumen
                        </MenuItem>
                        <MenuItem
                            icon={<BsFillFileTextFill />}
                            component={<Link href="/instrucciones" />}
                            className={instructions}
                        >
                            <div className={styles.activeBookmark}/>
                            Instrucciones
                        </MenuItem>
                        <MenuItem
                            icon={<BsFillFileTextFill />}
                            component={<Link href="/base-de-jugadores" />}
                            className={playersBase}
                        >
                            <div className={styles.activeBookmark}/>
                            Base de jugadores
                        </MenuItem>
                        <MenuItem
                            icon={<HiUsers />}
                            component={<Link href="/mi-equipo" />}
                            className={team}
                        >
                            <div className={styles.activeBookmark}/>
                            Agentes <br/> renovadores
                        </MenuItem>
                        <hr/>
                        <MenuItem
                            icon={<HiUsers />}
                            component={<Link href="/casos-especiales" />}
                            className={specials}
                        >
                            <div className={styles.activeBookmark}/>
                            Casos Especiales
                        </MenuItem>
                        <MenuItem
                            icon={<HiUsers />}
                            component={<Link href="/terminos-y-condiciones" />}
                            className={terms}
                        >
                            <div className={styles.activeBookmark}/>
                            Términos y <br/>
                            condiciones
                        </MenuItem>
                        <MenuItem
                            icon={<HiUsers />}
                            component={<Link href="/usuarios" />}
                            className={terms}
                        >
                            <div className={styles.activeBookmark}/>
                            Usuarios
                        </MenuItem>
                    </div>
                    <MenuItem
                        icon={<HiUsers />}
                        className={styles.menuItem}
                        onClick={() => exit()}
                    >
                        Cerrar sesión
                    </MenuItem>
                </Menu>
                <a className={classCollapse}
                   hidein="md"
                   onClick={() => collapse()}
                >
                    {iscollapse ?
                        <FaChevronLeft/>
                    :
                        <FaChevronRight/>
                    }
                </a>
            </Sidebar>
            <main className={styles.main}>
                <NavbarTop navTitle={navTitle} navSubTitle={navSubTitle} toggle={toggle} />
                {children}
            </main>
        </div>
    );
}
