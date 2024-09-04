"use client";
import { useEffect, useState } from "react"
import Image from "next/image"

import "./Folders.css"

export default function Folders() {
    const [Folders, setFolders] = useState();

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
        <div className="folders">
            {/* {Object.keys(Folders).map((folder, i) => (
                <div key={i}>
                    <h1>{folder}</h1>
                    {Folders[folder].map((file, i) => {
                        // let imageSrc = dynamic(() => import(`/folders/${folder}/${file}`))
                        // console.log(imageSrc);
                        
                        return (
                            <div key={i}>
                                <Image
                                    src={require(`../../../folders/${folder}/${file}`)}
                                    alt="Picture of the author"
                                />
                                <h3>{file}</h3>
                            </div>
                        )
                    })}
                </div>
            ))} */}
        </div>
    )
}
