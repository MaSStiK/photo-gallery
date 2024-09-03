"use client";
import Link from "next/link"

import "./Menu.css"

export default function Menu() {
    return (
        <div className="menu">
            <nav>
                <h1>Iakov Ovchinnikov</h1>
                <h2>Photographer</h2>

                <ul>
                    <li><Link href="/gallery">Gallery</Link></li>
                    <li><Link href="/folders">Folders</Link></li>
                    <li><Link href="/contacts">Contacts</Link></li>
                </ul>
            </nav>
        </div>
    )
}