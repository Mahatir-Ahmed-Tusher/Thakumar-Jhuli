'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PlotBuilder() {
  const [plotPoints, setPlotPoints] = useState([''])

  const addPlotPoint = () => {
    setPlotPoints([...plotPoints, ''])
  }

  const updatePlotPoint = (index: number, value: string) => {
    const updatedPlotPoints = [...plotPoints]
    updatedPlotPoints[index] = value
    setPlotPoints(updatedPlotPoints)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Interactive Plot Builder</h2>
      {plotPoints.map((point, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Label htmlFor={`plot-point-${index}`} className="w-20">{`Point ${index + 1}`}</Label>
          <Input
            id={`plot-point-${index}`}
            value={point}
            onChange={(e) => updatePlotPoint(index, e.target.value)}
            className="flex-grow rounded-xl shadow-md"
          />
        </div>
      ))}
      <Button onClick={addPlotPoint} className="mt-2 rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
        Add Plot Point
      </Button>
    </div>
  )
}

