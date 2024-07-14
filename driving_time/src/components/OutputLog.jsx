import { useEffect } from "react"

export const OutputLog = ({data, type}) => {

    useEffect(()=>{
        if (data){
            console.log(data)
        }
    }, [data])

    return (
        <>
            <div className="output_log" 
                contentEditable={true}
                spellCheck={false}
                suppressContentEditableWarning={true}
            >
                {/* COMPARE WAYS SIDE */}
                {data && type == 'compare_ways' &&
                <>
                {data.errors.map((err, index) => {
                    return (
                        <p key = {`err_${index}`} style={{color: 'red'}}>{err}</p>
                    )
                })}
                {data.infos.map((info, index) => {
                    return (
                        <p key = {`info_${index}`} style={{color: 'green'}}>{info}</p>
                    )
                })}
                {data.output.map((output, index) => {
                    return (
                        <div key = {`output_${index}`}>
                            <p>
                                Pour <span key = {index} style={{color: 'green'}}> {output.compared} </span> :
                            </p>
                            <p>
                                Le meilleur chemin est : <span key = {index} style={{color: 'purple'}}> "{output.best_way}". </span>
                            </p>
                            <p>
                                Distance :
                                <span key = {index} style={{color: 'red'}}> {output.meters} </span>
                                mètres.
                            </p>
                            <p>____________________________</p>
                        </div>
                    )
                })}
                </>
                }
                {/* AVERAGES MISSIONS SIDE */}
                {data && type == 'averages_missions' &&
                <>
                    {Object.entries(data).map(([key, value]) => (
                        <div key = {key}>
                            <span className="span_mission">Mission <b>{key}</b></span>
                            <p>Nombre de mètres : <b>{value.total_meters}</b></p>
                            <p>Moyenne de mètres : <b>{value.average}</b></p>
                            <p>Nombre de pickings : <b>{value.pickings}</b></p>
                        </div>
                    ))}

                </>
                }
            </div>
        </>
    )
}