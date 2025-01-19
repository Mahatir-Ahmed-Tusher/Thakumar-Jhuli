'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { expandStory } from '../actions/generate-story'
import { Copy, Download } from 'lucide-react'

interface StoryDisplayProps {
  story: string
}

export default function StoryDisplay({ story }: StoryDisplayProps) {
  const [expandedStory, setExpandedStory] = useState(story)
  const [isExpanding, setIsExpanding] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState('txt')
  const { toast } = useToast()

  const handleExpand = async () => {
    setIsExpanding(true)
    try {
      const result = await expandStory(expandedStory)
      
      if (result.success && result.continuation) {
        setExpandedStory(expandedStory + '\n\n' + result.continuation)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to expand story. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsExpanding(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(expandedStory)
    toast({
      title: 'Copied',
      description: 'Story copied to clipboard',
    })
  }

  const handleExport = () => {
    const filename = 'story.' + downloadFormat
    const content = expandedStory
    
    if (downloadFormat === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (downloadFormat === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Story</title>
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
      <Textarea
        value={expandedStory}
        onChange={(e) => setExpandedStory(e.target.value)}
        rows={10}
        className="w-full p-2 border rounded-xl shadow-md max-h-96 overflow-y-auto"
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button 
          onClick={handleExpand} 
          disabled={isExpanding}
          className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isExpanding ? 'Expanding...' : 'Continue Story'}
        </Button>
        <Button
          onClick={handleCopy}
          className="rounded-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Select onValueChange={setDownloadFormat} defaultValue="txt">
          <SelectTrigger className="w-32 rounded-xl shadow-md">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="txt">Text (.txt)</SelectItem>
            <SelectItem value="doc">Word (.doc)</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleExport}
          className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Story
        </Button>
      </div>
    </div>
  )
}

