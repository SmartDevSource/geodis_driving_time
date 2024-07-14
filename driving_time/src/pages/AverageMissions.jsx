import { useEffect, useState } from 'react'
import { DataInput } from '../components/DataInput'
import { CalcButton } from '../components/CalcButton'
import { FormatButton } from '../components/FormatButton'
import { OutputLog } from '../components/OutputLog'
import { OutputData } from '../components/OutputData'

import { getPathData } from "../functions/path_data"

export const AverageMissions = ({sheetPlan}) => {
    const [firstWayData, setFirstWayData] = useState('')
    const [secondWayData, setSecondWayData] = useState('')
    const [leftOutputData, setLeftOutputData] = useState(null)
    const [rightOutputData, setRightOutputData] = useState(null)
    const [firstMissions, setFirstMissions] = useState(null)
    const [secondMissions, setSecondMissions] = useState(null)

    const handleWayData = (type, data) => {
        switch(type){
          case 'first':
            setFirstWayData(data)
          break
          case 'second':
            setSecondWayData(data)
          break
        }
      }
    
      const handleCalcOutput = (first, second) => {
        setLeftOutputData(first)
        setRightOutputData(second)
      }
    
      const handleFormatedFirst = formated => {
        setFirstWayData(formated)
      }
    
      const handleFormatedSecond = formated => {
        setSecondWayData(formated)
      }

      const checkPickingFormat = element => /^E\d{2}-\d{2}-[A-Z][A-Z0-9]{2}$/.test(element)
      const checkMissionFormat = element => /^\d{6}$/.test(element)

      const getMission = (type, str) => {
        const errors = []
        const missions = {}
        let current_mission = 0
        const splitted_str = str.split('\n')
        let column_name = ''
        switch(type){
            case "first": column_name = "Première colonne"; break
            case "second": column_name = "Seconde colonne"; break
        }
        splitted_str.forEach((e, index)=>{
            if (checkMissionFormat(e)){
                current_mission = e
                missions[current_mission] = []
            } else if (checkPickingFormat(e)){
                missions[current_mission].push(e)
            } else if (e.trim().length > 0){
                errors.push(`[${column_name}] Erreur à la ligne ${index + 1} : '${e}' n'est pas une entrée valide`)
            }
        })

        return {missions: missions, errors: errors}
      }

      const handleAverageClick = () => {
        const first_missions = getMission('first', firstWayData)
        const second_missions = getMission('second', secondWayData)
        setFirstMissions(first_missions)
        setSecondMissions(second_missions)
      }

      const getAverages = () => {
        const averages_missions = {}
        for (const key in firstMissions.missions){
            const pickings_count = firstMissions.missions[key].length
            const data = firstMissions.missions[key].join('\n')
            const output = getPathData({data: data, sheetPlan: sheetPlan})
            averages_missions[key] = {total_meters: output.sum, average: +(output.sum / pickings_count).toFixed(2), pickings: pickings_count}
        }

        console.log(averages_missions)
      }

      useEffect(()=>{
        if (firstMissions && secondMissions){
            getAverages()
            console.log(firstMissions)
        }
      }, [firstMissions, secondMissions])

    return (
        <>
        <h1>Moyennes totales des missions</h1>
        <FormatButton first = {firstWayData}
                    second = {secondWayData}
                    handleFormatedFirst = {handleFormatedFirst}
                    handleFormatedSecond = {handleFormatedSecond}
        />
        <button className = "stylized_button"
            onClick={handleAverageClick}>
            Calculer les moyennes
        </button>
        <div className='input_output_container'>
            <div className='vertical_container'>
            <button className="link_button" 
                    style={{marginTop: "10px"}}
                    onClick={()=>setFirstWayData('')}
            >
                EFFACER
            </button>
            <DataInput wayData={data => handleWayData('first', data)} formatedData={firstWayData}/>
            </div>
            <div className='vertical_container'>
            <button className="link_button"
                    style={{marginTop: "10px"}}
                    onClick={()=>setSecondWayData('')}
            >
                EFFACER
            </button>
            <DataInput wayData={data => handleWayData('second', data)} formatedData={secondWayData}/>
            </div>
            {rightOutputData && <OutputLog data = {rightOutputData} />}
        </div>
        </>
    )
}