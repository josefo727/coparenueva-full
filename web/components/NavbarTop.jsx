import styles from '/styles/Navbar.module.css'
import {Navbar, Link, Text, Dropdown, User} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";

export default function NavbarTop({navTitle, navSubTitle, toggle}) {
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
                            name="Renovador"
                            src="/user.png"
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Menu color="primary" aria-label="User Actions">
                        {userDropdown.map(({name, key}) => (
                            <Dropdown.Item
                                key={key}
                                color={key === "delete" ? "error" : "default"}
                            >
                                {name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
        </Navbar>
    )
}
