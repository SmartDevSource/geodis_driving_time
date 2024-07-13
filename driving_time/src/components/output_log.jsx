import { useEffect } from "react"

export const OutputLog = ({data}) => {

    useEffect(()=>{
        console.log(data)
    }, [data])
    
    return (
        <>
            <div className="output_log" 
                contentEditable={true}
                spellCheck={false}
                onKeyDown={e=>e.preventDefault()}
            >
                {data &&
                <>
                {data.errors.map((err, index) => {
                    return (
                        <p key = {index} style={{color: 'red'}}>{err}</p>
                    )
                })}
                {data.infos.map((info, index) => {
                    return (
                        <p key = {index} style={{color: 'green'}}>{info}</p>
                    )
                })}
                {data.output.map((output, index) => {
                    return (
                        <>
                        <p>
                            Pour <span key = {index} style={{color: 'green'}}> {output.compared} </span>
                        </p>
                        <p>
                            Le meilleur chemin est : <span key = {index} style={{color: 'purple'}}> "{output.best_way}" </span>
                        </p>
                        <p>
                            Pour une distance de
                            <span key = {index} style={{color: 'red'}}> {output.meters} </span>
                            mètres.
                        </p>
                        <p>_____________________________________________</p>
                        </>
                    )
                })}
                </>
                }
            </div>
        </>
    )
}