import type { Course } from "../lib/meshApi"
import { useState } from "react"
import unitClass from '../utils/unitClass'

export default function SubjectButton({gridRow, gridColumn, c}: {gridRow: number, gridColumn: number, c: Course}) {

  const [passed, setPassed] = useState(false)
  const [color, setColor] = useState('#ff00ff')

  const base = "rounded-2xl border-2 px-2 py-1 text-center text-balance transition-all cursor-pointer select-none font-medium text-lg";

  return (
    <button 
      style={{gridRow, gridColumn}}
      className={`${base} ${unitClass(c.unit)}`}
    >
      <h1>{c.name}</h1>
      
    </button>
  )
}