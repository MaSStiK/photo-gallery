"use client";
import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link"
import { DataContext } from "@/components/Context";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import Fullscreen from "@/components/Fullscreen/Fullscreen";
import Masonry from "masonry-layout";

import "./Files.scss";

export default function Files() {
    const Context = useContext(DataContext);
    const { galleryName } = useParams();
    const [Folder, setFolder] = useState(null);
    const [FullScreenSrc, setFullScreenSrc] = useState("");
    const grid = useRef(null);

    useEffect(() => {
        if (!Context.Gallery || Context.Gallery.length === 0) {
            setFolder(null);
            return;
        }

        const currentFolder = findFolder(Context.Gallery, decodeURIComponent(galleryName));
        setFolder(currentFolder);
    }, [galleryName, Context.Gallery]);

    function findFolder(data, name) {
        return data.find(folder => folder.folderName === name.replaceAll("_", " "));
    }

    function openFS(src) { // Открытие полноэкранного просмотра
        document.body.style.overflow = "hidden";
        setFullScreenSrc(src);
    }

    function closeFS() { // Закрытие полноэкранного просмотра
        document.body.style.overflow = "auto";
        setFullScreenSrc("");
    }

    useEffect(() => {
        if (!grid.current) return;
        const masonry = new Masonry(grid.current, {
            itemSelector: ".file__image",
            columnWidth: ".file__image", // Берём ширину из CSS
            gutter: parseInt(getComputedStyle(document.documentElement)
                            .getPropertyValue("--gap-small")),
            percentPosition: true, // Позволяет работать с % ширинами
            fitWidth: false, // Контейнер растягивается на 100%
            // horizontalOrder: true // Приоритет заполнения слева на право
        });

        // Перестраиваем на реcайз (необязательно, но помогает)
        const onResize = () => masonry.layout();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            masonry.destroy();
        };
    }, [Folder]);

    if (Folder === undefined) return ( // Если папка не найдена
        <div className="folder-not-found">
            <p>Папка не найдена!</p>
            <Link href="/gallery">
                <button style={{width: "200px"}}>В галерею</button>
            </Link>
        </div>
    );

    if (!Folder || !Folder.files) return <Loader />; // Если папка загружается - отображаем Loader

    return (
        <section className="files">
            <h1>{Folder.folderName}</h1>
            
            <div className="grid" ref={grid}>
                {Folder.files.map((file, i) => {
                    const previewSrc = require(`../../../gallery/${Folder.folderName}/${Folder.previews[i]}`);
                    const srcFullscreen = require(`../../../gallery/${Folder.folderName}/${file}`);
                    return (
                        <div className="file__image" key={i} onClick={() => openFS(srcFullscreen)}>
                            <Image
                                src={previewSrc}
                                alt={file}
                                loading="lazy"
                                draggable={false}
                                unoptimized
                            />
                        </div>
                    );
                })}
            
            </div>
            {FullScreenSrc && <Fullscreen src={FullScreenSrc} closeFunc={closeFS} />}
        </section>
    );
}
