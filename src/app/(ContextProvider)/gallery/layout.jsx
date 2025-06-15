"use client";
import { useEffect, useContext } from "react"
import { DataContext } from "@/components/Context"

export default function Layout({ children }) {
    const Context = useContext(DataContext)

    useEffect(() => {
        if (Context.Gallery.length > 0) return; // Если галерея уже загружена

        try {
            fetch("/api/gallery").then(res => res.json())
            .then(data => {
                const sorted = data.gallery.sort((a, b) => b.birthtimeMs - a.birthtimeMs);
                Context.setGallery(sorted);
            })
        } catch (err) {
            console.error("Error loading gallery:", err);
        }
    }, [Context]);

    return (
        <>
            {children}
        </>
    )
}
