'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { suggestBooks } from '../actions/suggest-books'

const moods = [
  "Happy", "Excited", "Grateful", "Optimistic", "Relaxed", "Content", "Proud", 
  "Sad", "Angry", "Anxious", "Depressed", "Frustrated", "Lonely", "Guilty", 
  "Indifferent", "Bored", "Apathetic", "Nostalgic", "Confused", "Hopeful", 
  "Sympathetic", "Irritable", "Euphoric", "Overwhelmed"
]

export default function BookSuggestions() {
  const [mood, setMood] = useState('')
  const [customQuery, setCustomQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSuggest = async (type: 'mood' | 'custom') => {
    setIsLoading(true)
    try {
      const result = await suggestBooks({
        mood: type === 'mood' ? mood : undefined,
        query: type === 'custom' ? customQuery : undefined
      })

      if (result.success && result.suggestions) {
        setSuggestions(result.suggestions)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to get suggestions. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Book suggestion error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Book Suggestions</CardTitle>
          <CardDescription>Get book recommendations based on your mood or custom query</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mood">Select your mood</Label>
            <Select onValueChange={setMood}>
              <SelectTrigger id="mood">
                <SelectValue placeholder="Choose a mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={() => handleSuggest('mood')} 
            disabled={isLoading || !mood}
          >
            Get Mood-based Suggestions
          </Button>
          <div>
            <Label htmlFor="customQuery">Or enter a custom query</Label>
            <Input
              id="customQuery"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="E.g., Science fiction books about time travel"
            />
          </div>
          <Button 
            onClick={() => handleSuggest('custom')} 
            disabled={isLoading || !customQuery}
          >
            Get Custom Suggestions
          </Button>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Books</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {suggestions.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

