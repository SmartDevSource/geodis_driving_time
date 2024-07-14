import { useEffect, useState } from 'react'
import { DataInput } from '../components/DataInput'
import { CalcButton } from '../components/CalcButton'
import { FormatButton } from '../components/FormatButton'
import { OutputLog } from '../components/OutputLog'
import { OutputData } from '../components/OutputData'

export const CompareWays = ({sheetPlan}) => {
    const [firstWayData, setFirstWayData] = useState('')
    const [secondWayData, setSecondWayData] = useState('')
    const [leftOutputData, setLeftOutputData] = useState(null)
    const [rightOutputData, setRightOutputData] = useState(null)

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
    
    return (
        <>
        <h1>Comparaison de deux chemins</h1>
        <FormatButton first = {firstWayData}
                    second = {secondWayData}
                    handleFormatedFirst = {handleFormatedFirst}
                    handleFormatedSecond = {handleFormatedSecond}
        />
        <CalcButton first={firstWayData} 
                    second={secondWayData}
                    sheetPlan={sheetPlan}
                    text="Calculer le gain"
                    onHandleOutput={(first, second) => handleCalcOutput(first, second)}
        />
        <div className='input_output_container'>
            {leftOutputData && <OutputLog data = {leftOutputData} type={"compare_ways"}/>}
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
            {rightOutputData && <OutputLog data = {rightOutputData} type={"compare_ways"}/>}
        </div>
        <OutputData leftData = {leftOutputData} rightData = {rightOutputData}/>
        </>
    )
}