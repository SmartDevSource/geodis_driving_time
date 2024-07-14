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
    const [leftTotals, setLeftTotals] = useState(null)
    const [rightTotals, setRightTotals] = useState(null)

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
        let current_mission = ''
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
        const averages_left_missions = {}, averages_right_missions = {}
        for (const key in firstMissions.missions){
            const pickings_count = firstMissions.missions[key].length
            const data = firstMissions.missions[key].join('\n')
            const output = getPathData({data: data, sheetPlan: sheetPlan})
            averages_left_missions[key] = {total_meters: output.sum, average: +(output.sum / pickings_count).toFixed(2), pickings: pickings_count}
        }
        for (const key in secondMissions.missions){
            const pickings_count = secondMissions.missions[key].length
            const data = secondMissions.missions[key].join('\n')
            const output = getPathData({data: data, sheetPlan: sheetPlan})
            averages_right_missions[key] = {total_meters: output.sum, average: +(output.sum / pickings_count).toFixed(2), pickings: pickings_count}
        }

        const first_total_meters = Object.entries(averages_left_missions).reduce((acc, [key, value])=> {
          return acc + value.total_meters
        }, 0)
        const first_total_averages = Object.entries(averages_left_missions).reduce((acc, [key, value])=> {
          return acc + value.average
        }, 0)
        const first_total_pickings = Object.entries(averages_left_missions).reduce((acc, [key, value])=> {
          return acc + value.pickings
        }, 0)

        setLeftTotals({meters: first_total_meters, average: first_total_averages, pickings: first_total_pickings})
        setLeftOutputData(averages_left_missions)

        const second_total_meters = Object.entries(averages_right_missions).reduce((acc, [key, value])=> {
          return acc + value.total_meters
        }, 0)
        const second_total_averages = Object.entries(averages_right_missions).reduce((acc, [key, value])=> {
          return acc + value.average
        }, 0)
        const second_total_pickings = Object.entries(averages_right_missions).reduce((acc, [key, value])=> {
          return acc + value.pickings
        }, 0)

        setRightTotals({meters: second_total_meters, average: second_total_averages, pickings: second_total_pickings})
        setRightOutputData(averages_right_missions)
      }

      useEffect(()=>{
        if (firstMissions && secondMissions){
            getAverages()
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
        {leftOutputData && <OutputLog data = {leftOutputData} type={"averages_missions"}/>}
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
          {rightOutputData && <OutputLog data = {rightOutputData} type={"averages_missions"}/>}
          <p></p>
        </div>
        {leftTotals && rightTotals &&
        <div className='averages_missions_container'>
          <span className="span_mission" style={{backgroundColor: 'rgb(67, 67, 68)'}}><b>Comparatif des missions</b></span>
          <div className='input_output_container'>
            <span className="sub_span_mission">Valeurs cumulées 1</span>
            <span className="sub_span_mission">Valeurs cumulées 2</span>
          </div>
          <div className='input_output_container'>
            <div className='sub_mission_container'>
              <span>Mètres : {leftTotals.meters}</span>
              <span>Moyennes : {leftTotals.average.toFixed(2)}</span>
              <span>Pickings : {leftTotals.pickings}</span>
            </div>
            <div className='sub_mission_container'>
              <span>Mètres : {rightTotals.meters}</span>
              <span>Moyennes : {rightTotals.average.toFixed(2)}</span>
              <span>Pickings : {rightTotals.pickings}</span>
            </div>
          </div>
          <div className='input_output_container'>
            <span className="sub_span_mission">Moyennes totales 1</span>
            <span className="sub_span_mission">Moyennes totales 2</span>
          </div>
          <div className='input_output_container'>
            <div className='sub_mission_container'>
              <span>Mètres : {(leftTotals.meters / leftTotals.pickings).toFixed(2)}</span>
              {/* <span>Moyenne : {(leftTotals.average / Object.keys(firstWayData).length).toFixed(2)}</span> */}
            </div>
            <div className='sub_mission_container'>
            <span>Mètres : {(rightTotals.meters / rightTotals.pickings).toFixed(2)}</span>
            {/* <span>Moyenne : {(rightTotals.average / Object.keys(firstWayData).length).toFixed(2)}</span> */}
            </div>
          </div>
          <span className="span_mission" style={{backgroundColor: 'rgb(67, 67, 68)'}}><b>Difference de distance moyenne</b></span>
          <span className="span_total">
          {((leftTotals.meters / leftTotals.pickings) - (rightTotals.meters / rightTotals.pickings)).toFixed(2)}
          </span>

        </div>
        
        }
        </>
    )
}