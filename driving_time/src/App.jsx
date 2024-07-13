import { useEffect, useState } from 'react'
import { generateSheetPlan } from './functions/generate_sheet_plan'
import { DataInput } from './components/data_input'
import { CalcButton } from './components/calc_button'
import { FormatButton } from './components/format_button'
import { OutputLog } from './components/output_log'
import { OutputData } from './components/output_data'
import './App.css'

function App() {
  const [sheetPlan, setSheetPlan] = useState({})
  const [isSheetGenerated, setIsSheetGenerated] = useState(false)
  const [firstWayData, setFirstWayData] = useState('')
  const [secondWayData, setSecondWayData] = useState('')
  const [leftOutputData, setLeftOutputData] = useState(null)
  const [rightOutputData, setRightOutputData] = useState(null)

  useEffect(()=>{
    const sheet_plan = generateSheetPlan()
    setSheetPlan(sheet_plan)
  }, [])

  useEffect(()=>{
    setIsSheetGenerated(true)
  }, [sheetPlan])

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
      {isSheetGenerated &&
      <>
        <FormatButton first = {firstWayData}
                      second = {secondWayData}
                      handleFormatedFirst = {handleFormatedFirst}
                      handleFormatedSecond = {handleFormatedSecond}
        />
        <CalcButton first={firstWayData} 
                    second={secondWayData}
                    sheetPlan={sheetPlan}
                    onHandleOutput={(first, second) => handleCalcOutput(first, second)}
        />
      </>
      }
      <div className='input_output_container'>
        <OutputLog data = {leftOutputData} />
        <DataInput wayData={data => handleWayData('first', data)} formatedData={firstWayData}/>
        <DataInput wayData={data => handleWayData('second', data)} formatedData={secondWayData}/>
        <OutputLog data = {rightOutputData} />
      </div>
      <OutputData leftData = {leftOutputData} rightData = {rightOutputData} />
    </>
  )
}

export default App
