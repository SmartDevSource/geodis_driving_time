import { useEffect } from "react"

export const DataInput = ({wayData, formatedData}) => {

    const handleInput = e => {
        wayData(e.target.value)
    }

    // useEffect(()=>{
    //     if (formatedData){

    //     }
    // }, [formatedData])

    return (
        <>
            <textarea className = "textarea_data_column" 
                      spellCheck="false"
                      type = "text"
                      onInput={handleInput}
                      value = {formatedData}
            >
            </textarea>
        </>
    )
}