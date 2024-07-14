import { useEffect, useState } from "react"
import { getPathData } from "../functions/path_data"

export const CalcButton = ({first, second, sheetPlan, onHandleOutput}) => {
    const [firstOutput, setFirstOutput] = useState(null)
    const [secondOutput, setSecondOutput] = useState(null)

    const handleClick = () => {
        const first_output = getPathData({data: first, sheetPlan: sheetPlan})
        const second_output = getPathData({data: second, sheetPlan: sheetPlan})
        setFirstOutput(first_output)
        setSecondOutput(second_output)
    }

    useEffect(()=>{
        if (firstOutput && secondOutput){
            onHandleOutput(firstOutput, secondOutput)
        }
    }, [firstOutput, secondOutput])

    return (
        <>
            <button className = "stylized_button"
                onClick={handleClick}>
                Calculer le gain
            </button>
            <p></p>
        </>
    )
}