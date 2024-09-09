"use client";
import { useEffect, useState, useContext } from "react"
import { DataContext } from "@/components/Context"
import { useParams } from "next/navigation"
import Image from "next/image"
import Loader from "@/components/Loader/Loader"
import Fullscreen from "@/components/Fullscreen/Fullscreen";

import "./Files.scss"

export default function Files() {
    const Context = useContext(DataContext)
    const { folderName } = useParams()
    const [Folder, setFolder] = useState({});
    const [FullScreenSrc, setFullScreenSrc] = useState("");

    useEffect(() => {
        // Если папки не загружены
        if (Context.Folders.length === 0) {
            try {
                fetch(location.origin + "/api/folders")
                .then(res => res.json())
                .then(data => {
                    // Устанавливаем папку для отображения
                    setFolder(findFolder(data, decodeURI(folderName)))

                    // Сохраняем все папки в память
                    Context.setFolders(data.sort((a, b) => b.birthtimeMs - a.birthtimeMs)) 
                })
            } catch (error) {
                console.log("error", error)
            }
        } else { // Если уже загружены - находим нужную из памяти
            // Устанавливаем папку для отображения
            setFolder(findFolder(Context.Folders, decodeURI(folderName)))
        }
    }, [])


    // Поиск папки по названию из ссылки
    function findFolder(data, name) {
        return data.find(folder => folder.folder === name.replaceAll("_", " "))
    }

    // Открыть полноэкранный просмотр
    function openFS(src) {
        document.querySelector("body").style.overflow = "hidden"
        setFullScreenSrc(src)
    }

    // Закрыть полноэкранный просмотр
    function closeFS() {
        document.querySelector("body").style.overflow = "auto"
        setFullScreenSrc("")
    }

    // Если папка не найдена
    if (Folder === undefined) return (
        <p>Folder not found</p>
    )

    // Пока грузятся папки - показываем loader
    if (!Folder.files) return <Loader />

    return (
        <section className="files">
            {Folder.files && Folder.files.map((file, i) => {
                const src = require(`../../../folders/${Folder.folder}/${file}`)
                return (
                    <div className="file__image" key={i} onClick={() => openFS(src)}>
                        <Image
                            src={src}
                            alt="Photo"
                            draggable="false"
                            priority={true}
                        />
                    </div>
                )
            })}

            {FullScreenSrc && <Fullscreen src={FullScreenSrc} closeFunc={closeFS} />}
        </section>
    )
}
