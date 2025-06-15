"use client";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/components/Context";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";

import "./Gallery.scss";

export default function Gallery() {
    const Context = useContext(DataContext);
    
    // Если папки не загрузились - отображает Loader
    if (!Context.Gallery.length) return <Loader />;

    return (
        <section className="gallery">
            {Context.Gallery.map((folder, i) => {
                const preview = require(`../../../gallery/${folder.folderName}/${folder.folderPreview}`)
                const href = `/gallery/${folder.folderName.replaceAll(" ", "_")}`
                
                return (
                    <Link className="folder" key={i} href={href}>
                        <div className="folder__image">
                            <Image
                                src={preview}
                                alt={"preview"}
                                priority
                            />
                        </div>
                        <div className="folder__label">
                            <h3>{folder.folderName}</h3>
                        </div>
                    </Link>
                );
            })}
        </section>
    );
}
