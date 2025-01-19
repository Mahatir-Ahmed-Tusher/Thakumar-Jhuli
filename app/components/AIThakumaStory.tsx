'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { generateStory, continueStory } from '../actions/ai-thakuma-story'

export default function AIThakumaStory() {
  const [story, setStory] = useState('')
  const [question, setQuestion] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isContinuing, setIsContinuing] = useState(false)
  const { toast } = useToast()

  const handleStartStory = async () => {
    setIsGenerating(true)
    try {
      const result = await generateStory()
      if (result.success && result.story) {
        setStory(result.story)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate story. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Story generation error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleContinueStory = async () => {
    setIsContinuing(true)
    try {
      const result = await continueStory(story, question)
      if (result.success && result.continuation) {
        setStory(prevStory => prevStory + '\n\n' + result.continuation)
        setQuestion('')
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to continue story. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Story continuation error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsContinuing(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Thakuma's Story</CardTitle>
          <CardDescription>Experience magical tales narrated by our AI Thakuma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleStartStory} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating Story...' : 'Golpo Shuru - Start'}
          </Button>
          {story && (
            <>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
                <p className="whitespace-pre-wrap">{story}</p>
              </div>
              <div className="flex space-x-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question or say 'What happens next?'"
                  className="flex-grow"
                />
                <Button 
                  onClick={handleContinueStory}
                  disabled={isContinuing || !question}
                >
                  {isContinuing ? 'Continuing...' : 'Continue'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

