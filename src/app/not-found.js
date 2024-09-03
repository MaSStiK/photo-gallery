import Header from "@/components/Header/Header"

import Link from "next/link"

export default function NotFound () {
    return (
        <article>
            <Header />
            <p>Страница не найдена!</p>
            <Link href="/">
                <button style={{width: "200px"}}>На главную</button>
            </Link>
        </article>
    )
}