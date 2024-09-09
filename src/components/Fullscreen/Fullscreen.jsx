import Image from "next/image"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
// https://github.com/BetterTyped/react-zoom-pan-pinch#readme

import imgPlus from "@/assets/svg/Plus.svg"
import imgMinus from "@/assets/svg/Minus.svg"
import imgFullscreen from "@/assets/svg/Fullscreen.svg"
import imgCross from "@/assets/svg/Cross.svg"

import "./Fullscreen.scss"

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    return (
        <div className="fullscreen__controls flex-col">
            <button title="Приблизить картинку" onClick={() => zoomIn()}>
                <Image src={imgPlus} alt="zoom-in" />
            </button>
            <button title="Отдалить картинку" onClick={() => zoomOut()}>
                <Image src={imgMinus} alt="zoom-out" />
            </button>
            <button title="Центрировать картинку" onClick={() => resetTransform()}>
                <Image src={imgFullscreen} alt="center" />
            </button>
        </div>
    )
}

export default function Fullscreen({ src, closeFunc }) {
    return (
        <div className="fullscreen">
            <button className="fullscreen__close tp" onClick={closeFunc}>
                <Image src={imgCross} alt="center" />
            </button>

            <TransformWrapper>
                <Controls />
                <TransformComponent>
                    <div className="fullscreen__image-wrapper">
                        <Image src={src} alt="full-screen" draggable="false" />
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}
