"use client";
import Image from "next/image"
import normalImg from "@/assets/photos/normal.webp"
import heightImg from "@/assets/photos/height.webp"
import wideImg from "@/assets/photos/wide.webp"

import "./Gallery.css"

export default function Gallery() {
    const Photos = [
        {image: normalImg},
        {image: normalImg},
        {image: heightImg, class: "image-2r"},
        {image: normalImg},
        {image: normalImg},
        {image: wideImg, class: "image-wide"},
        {image: normalImg, class: "image-2c"},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
    ]
    return (
        <div className="gallery">
            {Photos.map((photo, i) => (
                <div className={`gallery__image ${photo.class ? photo.class : ""}`} key={i}>
                    <Image
                        src={photo.image}
                        alt="Picture of the author"
                    />
                </div>
            ))}
        </div>
    )
}
