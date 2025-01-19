'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { generateScientificArticle, expandScientificArticle } from '../actions/generate-scientific-article'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Download } from 'lucide-react'

const scientificFields = [
  "Biology", "Physics", "Chemistry", "Computer Science", "Mathematics",
  "Environmental Science", "Psychology", "Sociology", "Economics", "Medicine",
  "Neuroscience", "Astronomy", "Geology", "Engineering", "Artificial Intelligence"
]

export default function ScientificArticleGenerator() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [field, setField] = useState('')
  const [length, setLength] = useState('medium')
  const [tone, setTone] = useState('formal')
  const [article, setArticle] = useState('')
  const [additionalSuggestions, setAdditionalSuggestions] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setArticle('')

    try {
      const result = await generateScientificArticle({
        topic,
        keywords,
        field,
        length,
        tone,
        additionalSuggestions
      })

      if (result.success && result.article) {
        setArticle(result.article)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate article. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExpand = async () => {
    setIsExpanding(true)
    try {
      const result = await expandScientificArticle(article, additionalSuggestions)
      if (result.success && result.expandedArticle) {
        setArticle(result.expandedArticle)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to expand article. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Unexpected error:', error)
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
    navigator.clipboard.writeText(article)
    toast({
      title: 'Copied',
      description: 'Article copied to clipboard',
    })
  }

  const handleDownload = (format: 'txt' | 'doc') => {
    const filename = `scientific_article.${format}`
    const content = article
    
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (format === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Scientific Article</title>
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="topic" className="text-lg font-semibold">Topic or Title</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Artificial Intelligence in Healthcare"
            required
            className="rounded-xl shadow-md"
          />
        </div>
        <div>
          <Label htmlFor="keywords" className="text-lg font-semibold">Keywords (Optional)</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., machine learning, diagnosis, patient care"
            className="rounded-xl shadow-md"
          />
        </div>
        <div>
          <Label htmlFor="field" className="text-lg font-semibold">Scientific Field</Label>
          <Select onValueChange={setField} required>
            <SelectTrigger id="field" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select a field" />
            </SelectTrigger>
            <SelectContent>
              {scientificFields.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="length" className="text-lg font-semibold">Article Length</Label>
          <Select onValueChange={setLength} defaultValue="medium">
            <SelectTrigger id="length" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select article length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (500-800 words)</SelectItem>
              <SelectItem value="medium">Medium (1000-1500 words)</SelectItem>
              <SelectItem value="long">Long (2000+ words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tone" className="text-lg font-semibold">Tone</Label>
          <Select onValueChange={setTone} defaultValue="formal">
            <SelectTrigger id="tone" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="explanatory">Explanatory</SelectItem>
              <SelectItem value="persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="additionalSuggestions" className="text-lg font-semibold">Additional Suggestions or Requirements</Label>
          <Textarea
            id="additionalSuggestions"
            value={additionalSuggestions}
            onChange={(e) => setAdditionalSuggestions(e.target.value)}
            placeholder="Enter any additional suggestions or specific requirements for your article"
            className="rounded-xl shadow-md"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isGenerating} className="w-full rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 transition duration-300">
          {isGenerating ? 'Generating Article...' : 'Generate Scientific Article'}
        </Button>
      </form>

      {article && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Scientific Article</CardTitle>
            <CardDescription>Review and modify the generated article as needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              rows={20}
              className="w-full p-2 border rounded-xl shadow-md max-h-96 overflow-y-auto"
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
              <Button
                onClick={handleExpand}
                disabled={isExpanding}
                className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isExpanding ? 'Expanding...' : 'Expand Article'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

