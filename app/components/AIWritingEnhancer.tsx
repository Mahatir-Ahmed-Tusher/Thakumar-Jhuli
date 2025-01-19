'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { enhanceWriting } from '../actions/enhance-writing'
import { Copy, Download } from 'lucide-react'

export default function AIWritingEnhancer() {
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState<'story' | 'poem' | 'screenplay' | 'play'>('story')
  const [language, setLanguage] = useState<'english' | 'bengali'>('english')
  const [enhancedContent, setEnhancedContent] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const { toast } = useToast()

  const handleEnhance = async () => {
    setIsEnhancing(true)
    try {
      const result = await enhanceWriting({
        content,
        contentType,
        language
      })

      if (result.success && result.enhancedContent) {
        setEnhancedContent(result.enhancedContent)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to enhance writing. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Enhancement error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedContent)
    toast({
      title: 'Copied',
      description: 'Enhanced content copied to clipboard',
    })
  }

  const handleDownload = (format: 'txt' | 'doc') => {
    const filename = `enhanced_content.${format}`
    const content = enhancedContent
    
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (format === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Enhanced Content</title>
        </head>
        <body>
          ${content.split('\n').map(line => `<p>${line}</p>`).join('')}
        </body>
        </html>
      `
      const blob = new Blob([htmlContent], { type: 'application/msword' })
      downloadFile(blob, filename)
    }
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <Select value={contentType} onValueChange={(value: 'story' | 'poem' | 'screenplay' | 'play') => setContentType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="story">Story</SelectItem>
              <SelectItem value="poem">Poem</SelectItem>
              <SelectItem value="screenplay">Screenplay</SelectItem>
              <SelectItem value="play">Play</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={language} onValueChange={(value: 'english' | 'bengali') => setLanguage(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`Enter your ${contentType} in ${language} here...`}
        rows={10}
        className="max-h-96 overflow-y-auto"
      />
      <Button 
        onClick={handleEnhance} 
        disabled={isEnhancing || !content}
        className="w-full"
      >
        {isEnhancing ? 'Enhancing...' : 'Enhance Writing'}
      </Button>
      {enhancedContent && (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Enhanced Content:</h3>
          <Textarea
            value={enhancedContent}
            readOnly
            rows={10}
            className="max-h-96 overflow-y-auto"
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={handleCopy}
              className="rounded-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button 
              onClick={() => handleDownload('txt')}
              className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download as TXT
            </Button>
            <Button 
              onClick={() => handleDownload('doc')}
              className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download as DOC
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

