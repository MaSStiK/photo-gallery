"use client";
import { useEffect, useState, useContext } from "react"
import { DataContext } from "@/components/Context"
import Link from "next/link"
import Image from "next/image"
import Loader from "../Loader/Loader"

import "./Folders.scss"

export default function Folders() {
    const Context = useContext(DataContext)
    const [Folders, setFolders] = useState([]);

    useEffect(() => {
        // Если папки не загружены
        if (Context.Folders.length === 0) {
            try {
                fetch(location.origin + "/api/folders")
                .then(res => res.json())
                .then(data => {
                    // Устанавливаем папки для отображения
                    setFolders(data.sort((a, b) => b.birthtimeMs - a.birthtimeMs))

                    // Сохраняем все папки в память
                    Context.setFolders(data.sort((a, b) => b.birthtimeMs - a.birthtimeMs))
                })
            } catch (error) {
                console.log("error", error)
            }
        } else { // Если уже загружены - отображаем все из памяти
            // Устанавливаем папки для отображения
            setFolders(Context.Folders.sort((a, b) => b.birthtimeMs - a.birthtimeMs))
        }
    }, [])

    // Поиск картинки внутри папки для превью
    function getPreview(files) {
        return files.find(file => file.toLowerCase().startsWith("preview"))
    }

    // Пока грузятся файлы - показываем loader
    if (!Folders.length) return <Loader />

    return (
        <section className="folders">
            {Folders.length !== 0 && Folders.map((folder, i) => (
                <Link className="folder" key={i} href={"/folders/" + folder.folder.replaceAll(" ", "_")}>
                    <div className="folder__image" key={i}>
                        <Image
                            src={require(`../../../folders/${folder.folder}/${getPreview(folder.files)}`)}
                            alt="Photo"
                            priority={true}
                        />
                    </div>
                    <div className="folder__label">
                        <h3>{folder.folder}</h3>
                    </div>
                </Link>
            ))}
        </section>
    )
}
