'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getWritingAdvice } from '../actions/get-writing-advice'
import { AlertCircle, Check, Copy } from 'lucide-react'

export default function AICoach() {
  const [content, setContent] = useState('')
  const [advice, setAdvice] = useState<Array<{
    type: string,
    suggestion: string,
    explanation: string
  }>>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (content.length > 50) {
        handleAnalyze()
      }
    }, 1000)

    return () => clearTimeout(debounceTimer)
  }, [content])

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const result = await getWritingAdvice(content)

      if (result.success && result.advice) {
        setAdvice(result.advice)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to analyze text. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Writing analysis error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'Suggestion copied to clipboard',
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Writing Coach</CardTitle>
          <CardDescription>Get real-time writing advice as you type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="min-h-[300px]"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || content.length < 50}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Get Writing Advice'}
          </Button>
        </CardContent>
      </Card>

      {advice.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Writing Advice</CardTitle>
            <CardDescription>Review suggestions to improve your writing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {advice.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-blue-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="capitalize">{item.type}</span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        Suggestion: {item.suggestion}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Explanation: {item.explanation}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(item.suggestion)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

