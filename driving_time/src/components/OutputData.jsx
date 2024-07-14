import { useEffect, useState } from "react"

export const OutputData = ({leftData, rightData}) => {

    const [secondRef, setSecondRef] = useState(2.67)
    const [countMultiplier, setCountMultiplier] = useState(0.01056)

    return (
        <>
        {leftData && rightData &&
        <>
            <div className="input_output_container">
                <span className="box_meters bg_grey" style={{color: 'white'}}>Chemin 1</span>
                <span className="box_meters bg_grey" style={{color: 'white'}}>Chemin 2</span>
            </div>
            <div className="input_output_container">
                <span className="box_meters bg_white">{leftData.sum} m</span>
                <span className="box_meters bg_white">{rightData.sum} m</span>
            </div>
            {leftData.output.length > 0 && rightData.output.length > 0 &&
        <>
            <div className="input_output_container">
                <span className="box_info bg_grey" style={{color: 'white'}}>Gain en mètres</span>
                <span className="box_info bg_grey" style={{color: 'white'}}>Gain en secondes</span>
                <span className="box_info bg_grey" style={{color: 'white'}}>Gain financier</span>
            </div>
            <div className="input_output_container">
                <span className="box_info bg_white">{leftData.sum - rightData.sum}</span>
                <span className="box_info bg_white">{((leftData.sum - rightData.sum) / secondRef).toFixed(2)}</span>
                <span className="box_info bg_white">{(((leftData.sum - rightData.sum) / secondRef).toFixed(2) * countMultiplier).toFixed(2)}</span>
            </div>
        </>
        }
        </>
        
        }
        </>
    )
}