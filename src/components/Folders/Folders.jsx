"use client";
import { useEffect, useState } from "react"
import dynamic from "next/dynamic";
import Image from "next/image"

import "./Folders.css"

export default function Folders() {
    const [Folders, setFolders] = useState([]);

    useEffect(()=>{
        try {
            fetch(location.origin + "/api/folders")
            .then(res => res.json())
            .then(data => setFolders(data))
        } catch (error) {
          console.log("error", error)
        }
    },[])

    useEffect(() => {
        console.log("Folders", Folders);
    }, [Folders])

    return (
        <section className="folders">
            {Folders.length !== 0 && Folders.map((folder, i) => (
                <div className="folder" key={i}>
                    <h1>{folder.folder}</h1>
                    {folder.files.map((file, i) => (
                        <div key={i}>
                            <div className="folder__image">
                                <Image
                                    src={require(`../../../folders/${folder.folder}/${file}`)}
                                    alt="Photo"
                                    priority={false}
                                />
                            </div>
                            <p>{file}</p>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}
