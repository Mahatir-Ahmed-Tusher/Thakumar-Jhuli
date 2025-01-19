'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CharacterDevelopment() {
  const [characters, setCharacters] = useState([{ name: '', backstory: '', motivation: '' }])

  const addCharacter = () => {
    setCharacters([...characters, { name: '', backstory: '', motivation: '' }])
  }

  const updateCharacter = (index: number, field: string, value: string) => {
    const updatedCharacters = [...characters]
    updatedCharacters[index] = { ...updatedCharacters[index], [field]: value }
    setCharacters(updatedCharacters)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Character Development</h2>
      {characters.map((character, index) => (
        <div key={index} className="space-y-2 p-4 border rounded">
          <Label htmlFor={`character-name-${index}`}>Character Name</Label>
          <Input
            id={`character-name-${index}`}
            value={character.name}
            onChange={(e) => updateCharacter(index, 'name', e.target.value)}
          />
          <Label htmlFor={`character-backstory-${index}`}>Backstory</Label>
          <Textarea
            id={`character-backstory-${index}`}
            value={character.backstory}
            onChange={(e) => updateCharacter(index, 'backstory', e.target.value)}
            rows={3}
          />
          <Label htmlFor={`character-motivation-${index}`}>Motivation</Label>
          <Textarea
            id={`character-motivation-${index}`}
            value={character.motivation}
            onChange={(e) => updateCharacter(index, 'motivation', e.target.value)}
            rows={2}
          />
        </div>
      ))}
      <Button onClick={addCharacter}>Add Character</Button>
    </div>
  )
}

