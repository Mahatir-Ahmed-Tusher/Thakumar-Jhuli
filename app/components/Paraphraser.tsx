'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { paraphraseText } from '../actions/paraphrase-text'
import { Copy, RefreshCw } from 'lucide-react'

export default function Paraphraser() {
  const [originalText, setOriginalText] = useState('')
  const [sentences, setSentences] = useState<string[]>([])
  const [paraphrasedSentences, setParaphrasedSentences] = useState<string[]>([])
  const [isParaphrasing, setIsParaphrasing] = useState(false)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1)
  const { toast } = useToast()

  useEffect(() => {
    const splitSentences = originalText.match(/[^\.!\?]+[\.!\?]+/g) || []
    setSentences(splitSentences)
    setParaphrasedSentences(new Array(splitSentences.length).fill(''))
  }, [originalText])

  const handleParaphraseSentence = async (index: number) => {
    setIsParaphrasing(true)
    setCurrentSentenceIndex(index)
    try {
      const result = await paraphraseText(sentences[index])
      if (result.success && result.paraphrasedText) {
        const newParaphrasedSentences = [...paraphrasedSentences]
        newParaphrasedSentences[index] = result.paraphrasedText
        setParaphrasedSentences(newParaphrasedSentences)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to paraphrase sentence. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Paraphrasing error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsParaphrasing(false)
      setCurrentSentenceIndex(-1)
    }
  }

  const handleParaphraseAll = async () => {
    setIsParaphrasing(true)
    try {
      const result = await paraphraseText(originalText)
      if (result.success && result.paraphrasedText) {
        const paraphrasedSplitSentences = result.paraphrasedText.match(/[^\.!\?]+[\.!\?]+/g) || []
        setParaphrasedSentences(paraphrasedSplitSentences)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to paraphrase text. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Paraphrasing error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsParaphrasing(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'Text copied to clipboard',
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Paraphraser</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Rewrite text to improve clarity, tone, or style while maintaining the original meaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter text to paraphrase..."
            className="min-h-[100px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <Button 
          onClick={handleParaphraseAll} 
          disabled={isParaphrasing || !originalText}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {isParaphrasing ? 'Paraphrasing...' : 'Paraphrase All'}
        </Button>
        {sentences.length > 0 && (
          <div className="space-y-4">
            {sentences.map((sentence, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <p className="mb-2 text-gray-900 dark:text-gray-100">{sentence}</p>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleParaphraseSentence(index)}
                    disabled={isParaphrasing}
                    size="sm"
                  >
                    {currentSentenceIndex === index ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      'Paraphrase'
                    )}
                  </Button>
                  {paraphrasedSentences[index] && (
                    <Button
                      onClick={() => handleCopy(paraphrasedSentences[index])}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                {paraphrasedSentences[index] && (
                  <p className="mt-2 text-green-600 dark:text-green-400">
                    {paraphrasedSentences[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

