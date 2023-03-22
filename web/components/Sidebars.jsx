import React, {useState} from "react";
import { Sidebar, SubMenu, Menu, MenuItem, useProSidebar, breakPoint } from "react-pro-sidebar";
import styles from '../styles/Sidebar.module.css';
import NavbarTop from './NavbarTop';
import Link from 'next/link';
import { logout, user } from "../auth";
import Router from 'next/router';
import { Image } from "@nextui-org/react";
//icons
import { BsFillGrid1X2Fill, BsFillFileTextFill } from "react-icons/bs";
import { FaChevronRight, FaChevronLeft, FaTasks, FaCog, FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { HiUsers } from "react-icons/hi";

export default function Sidebars({navTitle, navSubTitle, ruta, children}) {
    const { collapseSidebar } = useProSidebar();
    const { toggleSidebar } = useProSidebar();
    const [iscollapse, setIsCollapse] = useState(true);
    const [toggled, setToggled] = useState(false);
    const USER = user();

    const exit = async () => {
        await logout();
        await Router.push('/');
    }

    const toggle = () => {
        setToggled(!toggled);
        toggleSidebar();
        if (!iscollapse) {
            setIsCollapse(!iscollapse)
            collapseSidebar()
        }
    }
    const collapse = () => {
        setIsCollapse(!iscollapse)
        collapseSidebar()
    }

    const resumen = ruta === 'resumen' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const instructions = ruta === 'instructions' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const playersBase = ruta === 'playersBase' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const incentive = ruta === 'incentive' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const team = ruta === 'team' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
    const users = ruta === 'users' ? `${styles.menuItem} ${styles.active}` : `${styles.menuItem}`
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
                        <div className={styles.logo}>
                            <Image
                                src="/Logo-BMI_RGB_blanco.png"
                                fill
                                alt="BMI"
                            />
                        </div>
                        <MenuItem
                            icon={<BsFillGrid1X2Fill className={styles.icon}/>}
                            component={<Link href="/resumen" />}
                            className={resumen}
                        >
                            <div className={styles.activeBookmark}/>
                            Resumen
                        </MenuItem>
                        <MenuItem
                            icon={<FaTasks className={styles.icon}/>}
                            component={<Link href="/instrucciones" />}
                            className={instructions}
                        >
                            <div className={styles.activeBookmark}/>
                            Instrucciones
                        </MenuItem>
                        <MenuItem
                            icon={<BsFillFileTextFill className={styles.icon}/>}
                            component={<Link href="/base-de-jugadores" />}
                            className={playersBase}
                        >
                            <div className={styles.activeBookmark}/>
                            Base de jugadores
                        </MenuItem>
                        {
                            false &&
                            <MenuItem
                                icon={<BsFillFileTextFill className={styles.icon}/>}
                                component={<Link href="/tabla-de-incentivo" />}
                                className={incentive}
                            >
                                <div className={styles.activeBookmark}/>
                                Tabla de incentivos
                            </MenuItem>
                        }
                        <MenuItem
                            icon={<FaUsers className={styles.icon}/>}
                            component={<Link href="/mi-equipo" />}
                            className={team}
                        >
                            <div className={styles.activeBookmark}/>
                            Agentes <br/> renovadores
                        </MenuItem>
                        <hr/>
                        <MenuItem
                            icon={<FaCog className={styles.icon}/>}
                            component={<Link href="/casos-especiales" />}
                            className={specials}
                        >
                            <div className={styles.activeBookmark}/>
                            Casos Especiales
                        </MenuItem>
                        <MenuItem
                            icon={<GoChecklist className={styles.icon}/>}
                            component={<Link href="/terminos-y-condiciones" />}
                            className={terms}
                        >
                            <div className={styles.activeBookmark}/>
                            Términos y <br/>
                            condiciones
                        </MenuItem>
                        {
                            USER?.is_admin ?
                                <MenuItem
                                    icon={<HiUsers className={styles.icon}/>}
                                    component={<Link href="/usuarios" />}
                                    className={users}
                                >
                                    <div className={styles.activeBookmark}/>
                                    Usuarios
                                </MenuItem>
                            :null
                        }
                    </div>
                    <MenuItem
                        icon={<BiLogOut className={styles.icon}/>}
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
