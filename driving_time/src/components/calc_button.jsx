import { useEffect, useRef, useState } from "react"
import { getPathData } from "../functions/path_data"

import dee_image from '../assets/dee.png'
import dee_audio from '../assets/dee.ogg'

export const CalcButton = ({first, second, sheetPlan, onHandleOutput}) => {
    const [firstOutput, setFirstOutput] = useState(null)
    const [secondOutput, setSecondOutput] = useState(null)
    const [showDee, setShowDee] = useState(false)
    const audio = new Audio()
    audio.src = dee_audio
    audio.volume = 1

    const handleClick = () => {
        const first_output = getPathData({data: first, sheetPlan: sheetPlan})
        const second_output = getPathData({data: second, sheetPlan: sheetPlan})
        setFirstOutput(first_output)
        setSecondOutput(second_output)
        setShowDee(true)
        setTimeout(() => {
            setShowDee(false)
        }, 3000);
        audio.play()
    }

    useEffect(()=>{
        if (firstOutput && secondOutput){
            onHandleOutput(firstOutput, secondOutput)
        }
    }, [firstOutput, secondOutput])

    return (
        <>
            {showDee &&
            <span className="dee_span">
                <img src={dee_image}></img>
            </span>
             }
            <button className = "stylized_button"
                onClick={handleClick}>
                Calculer le gain
            </button>
            <p></p>
        </>
    )
}