import Layout from '/components/Layout'
import styles from '/styles/Home.module.css'
import Link from 'next/link'
import { Image, Text } from "@nextui-org/react";

export default function Home() {
  return (
    <section className={styles.home}>
        <navbar className={styles.navbar}>
            <Text
                h1
                css={{
                    textGradient: "45deg, $blue600 -20%, #ffffff 50%",
                }}
                weight="bold"
            >Name Brand</Text>
            <div>
                <Link href="/login" className={styles.login}>
                    Sign In
                </Link>
            </div>
        </navbar>
        <main>
            <div className={styles.logo}>
                <Image
                    width={320}
                    height={180}
                    src='next.svg'
                    alt="Default Image"
                />
            </div>
        </main>
    </section>
  )
}
