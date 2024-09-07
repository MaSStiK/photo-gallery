"use client";
import Link from "next/link"
import NavLink from "@/components/NavLink/NavLink"

import "./Header.scss"

export default function Header() {
    return (
        <header>
            <Link href="/"><h1>Iakov Ovchinnikov</h1></Link>
            <h2>Photographer</h2>

            <nav>
                <ul>
                    <li><NavLink href="/gallery">Gallery</NavLink></li>
                    <li><NavLink href="/folders">Folders</NavLink></li>
                    <li><NavLink href="/contacts">Contacts</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}