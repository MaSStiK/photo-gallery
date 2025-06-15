"use client";
import Image from "next/image"
import normalImg from "@/assets/photos/normal.webp"
import heightImg from "@/assets/photos/height.webp"
import wideImg from "@/assets/photos/wide.webp"

import "./Portfolio.scss"

export default function Portfolio() {
    const Photos = [
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
        {image: heightImg,  class: "image-2r"},
        {image: normalImg},
        {image: normalImg},
        {image: wideImg,    class: "image-wide"},
        {image: normalImg,  class: "image-2c"},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
        {image: normalImg},
    ]
    return (
        <div className="portfolio">
            {Photos.map((photo, i) => (
                <div className={`portfolio__image ${photo.class ? photo.class : ""}`} key={i}>
                    <Image
                        src={photo.image}
                        alt="Picture of the author"
                        draggable="false"
                    />
                </div>
            ))}
        </div>
    )
}
