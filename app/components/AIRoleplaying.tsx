'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { roleplayInteraction } from '../actions/roleplay-interaction'

export default function AIRoleplaying() {
  const [scenario, setScenario] = useState('')
  const [userInput, setUserInput] = useState('')
  const [conversation, setConversation] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleStartScenario = async () => {
    setIsLoading(true)
    try {
      const result = await roleplayInteraction(scenario, 'start')
      if (result.success && result.response) {
        setConversation([result.response])
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to start scenario. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Roleplay error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserInput = async () => {
    setIsLoading(true)
    try {
      const result = await roleplayInteraction(userInput, 'continue', conversation.join('\n'))
      if (result.success && result.response) {
        setConversation([...conversation, `You: ${userInput}`, `AI: ${result.response}`])
        setUserInput('')
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to process input. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Roleplay error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveStory = () => {
    const story = conversation.join('\n')
    const blob = new Blob([story], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ai_roleplay_story.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="scenario" className="block text-sm font-medium text-gray-700">Start a new scenario</label>
        <Textarea
          id="scenario"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Describe the initial scenario (e.g., 'Mahatir found himself in a mysterious forest...')"
          rows={3}
          className="mt-1"
        />
        <Button 
          onClick={handleStartScenario} 
          disabled={isLoading || !scenario}
          className="mt-2"
        >
          Start Scenario
        </Button>
      </div>

      {conversation.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md max-h-96 overflow-y-auto">
          {conversation.map((message, index) => (
            <p key={index} className={`mb-2 ${message.startsWith('You:') ? 'text-blue-600' : 'text-green-600'}`}>
              {message}
            </p>
          ))}
        </div>
      )}

      {conversation.length > 0 && (
        <div>
          <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">Your response</label>
          <Input
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className="mt-1"
          />
          <Button 
            onClick={handleUserInput} 
            disabled={isLoading || !userInput}
            className="mt-2"
          >
            Send
          </Button>
        </div>
      )}

      {conversation.length > 0 && (
        <Button onClick={handleSaveStory}>
          Save Story
        </Button>
      )}
    </div>
  )
}

