import { useEffect, useState } from 'react'
import { generateSheetPlan } from './functions/generate_sheet_plan'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CompareWays } from './pages/CompareWays'
import { AverageMissions } from './pages/AverageMissions'
import './App.css'

function App() {
  const [sheetPlan, setSheetPlan] = useState(null)
  const [currentTool, setCurrentTool] = useState('compare_ways')

  useEffect(()=>{
    const sheet_plan = generateSheetPlan()
    setSheetPlan(sheet_plan)
  }, [])

  const setTool = tool => setCurrentTool(tool)

  return (
    <>
      <Navbar handleClick={setTool}/>
      {sheetPlan &&
      <>
        {currentTool == 'compare_ways' && <CompareWays sheetPlan={sheetPlan}/>}
        {currentTool == 'average_missions' && <AverageMissions sheetPlan={sheetPlan}/>}
      </>
      }
      <Footer/>
    </>
  )
}

export default App
