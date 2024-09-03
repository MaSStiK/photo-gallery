"use client";
import Link from "next/link"

import "./Header.css"

export default function Header() {
    return (
        <header>
            <Link href="/"><h1>Iakov Ovchinnikov</h1></Link>
            <h2>Photographer</h2>

            <nav>
                <ul>
                    <li><Link href="/gallery">Gallery</Link></li>
                    <li><Link href="/folders">Folders</Link></li>
                    <li><Link href="/contacts">Contacts</Link></li>
                </ul>
            </nav>
        </header>
    )
}