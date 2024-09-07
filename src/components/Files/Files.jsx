"use client";
import { useEffect, useState, useContext } from "react"
import { DataContext } from "@/components/Context"
import { useParams } from "next/navigation"
import Image from "next/image"
import Loader from "@/components/Loader/Loader"

import "./Files.scss"

export default function Files() {
    const Context = useContext(DataContext)
    const { folderName } = useParams()
    const [Folder, setFolder] = useState({});

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

    // Пока грузятся папки - показываем loader
    if (!Folder.files) return <Loader />

    return (
        <section className="files">
            {Folder.files && Folder.files.map((file, i) => (
                <div className="file__image" key={i}>
                    <Image
                        src={require(`../../../folders/${Folder.folder}/${file}`)}
                        alt="Photo"
                        priority={true}
                    />
                </div>
            ))}
        </section>
    )
}
