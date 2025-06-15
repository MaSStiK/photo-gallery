"use client";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/components/Context";
import { useParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import Fullscreen from "@/components/Fullscreen/Fullscreen";
import Masonry from 'react-masonry-css';

import "./Files.scss";

export default function Files() {
    const Context = useContext(DataContext);
    const { galleryName } = useParams();
    const [Folder, setFolder] = useState(null);
    const [FullScreenSrc, setFullScreenSrc] = useState("");

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

    function openFS(src) {
        document.body.style.overflow = "hidden";
        setFullScreenSrc(src);
    }

    function closeFS() {
        document.body.style.overflow = "auto";
        setFullScreenSrc("");
    }

    if (Folder === undefined) return <p>Folder not found</p>;
    if (!Folder || !Folder.files) return <Loader />;

    return (
        <section className="files">
            <Masonry
                breakpointCols={{ default: 3 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
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
            
            </Masonry>
            {FullScreenSrc && <Fullscreen src={FullScreenSrc} closeFunc={closeFS} />}
        </section>
    );
}
