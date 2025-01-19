'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { checkGrammar } from '../actions/check-grammar'
import { AlertCircle, Check, Copy } from 'lucide-react'

const writingStyles = [
  "Academic",
  "Business",
  "Creative",
  "Technical",
  "Casual",
  "Journalistic",
  "Professional"
]

export default function GrammarChecker() {
  const [content, setContent] = useState('')
  const [writingStyle, setWritingStyle] = useState('Professional')
  const [correctedText, setCorrectedText] = useState('')
  const [suggestions, setSuggestions] = useState<Array<{
    type: 'grammar' | 'spelling' | 'style' | 'punctuation',
    text: string,
    suggestion: string,
    explanation: string
  }>>([])
  const [isChecking, setIsChecking] = useState(false)
  const { toast } = useToast()

  const handleCheck = async () => {
    setIsChecking(true)
    try {
      const result = await checkGrammar({
        content,
        writingStyle
      })

      if (result.success && result.suggestions) {
        setSuggestions(result.suggestions)
        setCorrectedText(result.correctedText)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to check text. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Grammar check error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'Text copied to clipboard',
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grammar':
        return 'text-red-500'
      case 'spelling':
        return 'text-orange-500'
      case 'style':
        return 'text-blue-500'
      case 'punctuation':
        return 'text-purple-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Grammar & Style Checker</CardTitle>
          <CardDescription>Enter your text and select a writing style for personalized suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Select value={writingStyle} onValueChange={setWritingStyle}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select writing style" />
              </SelectTrigger>
              <SelectContent>
                {writingStyles.map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[200px]"
          />
          <Button 
            onClick={handleCheck} 
            disabled={isChecking || !content}
            className="w-full"
          >
            {isChecking ? 'Checking...' : 'Check Text'}
          </Button>
        </CardContent>
      </Card>

      {correctedText && (
        <Card>
          <CardHeader>
            <CardTitle>Corrected Text</CardTitle>
            <CardDescription>Review and copy the grammatically correct version</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={correctedText}
              readOnly
              className="min-h-[200px]"
            />
            <Button onClick={() => handleCopy(correctedText)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Corrected Text
            </Button>
          </CardContent>
        </Card>
      )}

      {suggestions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Suggestions</CardTitle>
            <CardDescription>Review and apply the suggested improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 font-semibold ${getTypeColor(suggestion.type)}`}>
                        <AlertCircle className="w-4 h-4" />
                        <span className="capitalize">{suggestion.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Original: <span className="font-mono">{suggestion.text}</span>
                      </p>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        Suggestion: <span className="font-mono">{suggestion.suggestion}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Explanation: {suggestion.explanation}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(suggestion.suggestion)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        correctedText && (
          <Card>
            <CardHeader>
              <CardTitle>No Suggestions</CardTitle>
              <CardDescription>Your text appears to be grammatically correct.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The AI didn't find any specific suggestions for improvement. Here's your text:</p>
              <Textarea
                value={correctedText}
                readOnly
                className="mt-2 min-h-[100px]"
              />
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}

