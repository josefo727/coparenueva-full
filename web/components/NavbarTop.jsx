import React, {useEffect} from "react";
import styles from '/styles/Navbar.module.css'
import {Navbar, Link, Text, Dropdown, User} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import {logout, user} from "../auth";
import Router from "next/router";
import { BiLogOut } from "react-icons/bi";

export default function NavbarTop({navTitle, navSubTitle, toggle}) {
    const USER = user();
    const exit = async () => {
        await logout();
        Router.push('/');
    }

    const collapseItems = [
        "Features",
        "Customers",
        "Pricing",
        "Company",
        "Legal",
        "Team",
        "Help & Feedback",
        "Login",
        "Sign Up",
    ];
    const userDropdown = [
        { key: "logout", name: "Logout" }
    ];
    return (
        <Navbar isBordered variant='sticky' className={styles.navbar}>
            <Navbar.Brand>
                <a className={`showMobile ${styles.hamburger}`} onClick={() => toggle()}>
                    <GiHamburgerMenu/>
                </a>
                {navSubTitle ?
                    <div className={styles.contentTitle}>
                        <p className={styles.navTitle}>{navTitle}</p>
                        <p className={styles.navSubTitle}>{navSubTitle}</p>
                    </div>
                :
                    <Text b color="inherit" className={styles.navTitle}>
                        {navTitle}
                    </Text>

                }
            </Navbar.Brand>

            <Navbar.Content enableCursorHighlight variant="underline">
                <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                        <User
                            bordered
                            as="button"
                            size="md"
                            name={USER?.name ? USER.name : 'Renovador'}
                            src="/user.png"
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Menu color="primary" aria-label="User Actions">
                        <Dropdown.Item icon={<BiLogOut/>}>
                            <a onClick={() => exit()}>Logout</a>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        </Navbar>
    )
}
