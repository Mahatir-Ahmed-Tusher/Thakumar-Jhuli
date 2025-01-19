'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { analyzeLiterature } from '../actions/analyze-literature'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function LiteratureAnalysis() {
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState<'poem' | 'story' | 'play' | 'screenplay'>('poem')
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState('txt')
  const { toast } = useToast()

  const handleAnalyze = async (type: 'explain' | 'summarize' | 'criticize') => {
    setIsAnalyzing(true)
    try {
      const result = await analyzeLiterature({
        content,
        type,
        contentType
      })

      if (result.success && result.analysis) {
        setAnalysis(result.analysis)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to analyze. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Analysis error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownload = () => {
    const filename = `analysis.${downloadFormat}`
    const content = analysis
    
    if (downloadFormat === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (downloadFormat === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Analysis</title>
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Analysis</CardTitle>
          <CardDescription>Enter your poem, story, play, or screenplay for analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={(value: 'poem' | 'story' | 'play' | 'screenplay') => setContentType(value)}>
              <SelectTrigger id="contentType" className="w-32">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poem">Poem</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="play">Play</SelectItem>
                <SelectItem value="screenplay">Screenplay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter your ${contentType} here...`}
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="explain" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="explain">Explain</TabsTrigger>
          <TabsTrigger value="summarize">Summarize</TabsTrigger>
          <TabsTrigger value="criticize">Criticize</TabsTrigger>
        </TabsList>
        <TabsContent value="explain">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Explanation</CardTitle>
              <CardDescription>Get a detailed analysis of themes, symbolism, and meaning</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleAnalyze('explain')} 
                disabled={isAnalyzing || !content}
                className="w-full mb-4"
              >
                {isAnalyzing ? 'Analyzing...' : 'Explain Content'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summarize">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Get a concise summary of the content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleAnalyze('summarize')} 
                disabled={isAnalyzing || !content}
                className="w-full mb-4"
              >
                {isAnalyzing ? 'Analyzing...' : 'Summarize Content'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="criticize">
          <Card>
            <CardHeader>
              <CardTitle>Criticism & Suggestions</CardTitle>
              <CardDescription>Get constructive feedback and improvement suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleAnalyze('criticize')} 
                disabled={isAnalyzing || !content}
                className="w-full mb-4"
              >
                {isAnalyzing ? 'Analyzing...' : 'Criticize Content'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="whitespace-pre-wrap font-serif">{analysis}</div>
            <div className="flex items-center gap-4">
              <Select onValueChange={setDownloadFormat} defaultValue="txt">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="txt">Text (.txt)</SelectItem>
                  <SelectItem value="doc">Word (.doc)</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleDownload}>
                Download Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

