'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/use-toast'
import { generatePoetry } from '../actions/generate-poetry'
import { Copy, Download } from 'lucide-react'

const poeticStyles = {
  "Romantic Poets": [
    "William Wordsworth",
    "Samuel Taylor Coleridge",
    "Lord Byron",
    "Percy Bysshe Shelley",
    "John Keats"
  ],
  "Modernist Poets": [
    "T.S. Eliot",
    "W.B. Yeats",
    "Ezra Pound",
    "Wallace Stevens",
    "D.H. Lawrence"
  ],
  "Contemporary Poets": [
    "Philip Larkin",
    "Ted Hughes",
    "Carol Ann Duffy",
    "Seamus Heaney",
    "Simon Armitage"
  ]
}

const genres = [
  "Love", "Nature", "Philosophy", "Urban Life",
  "Mythology", "Social Commentary", "Personal",
  "Spiritual", "War", "Death", "Life"
]

export default function PoetryGenerator() {
  const [genre, setGenre] = useState('')
  const [poeticStyle, setPoeticStyle] = useState('')
  const [poet, setPoet] = useState('')
  const [customPoet, setCustomPoet] = useState('')
  const [numberOfLines, setNumberOfLines] = useState(12)
  const [mood, setMood] = useState(50)
  const [language, setLanguage] = useState('english')
  const [poem, setPoem] = useState('')
  const [downloadFormat, setDownloadFormat] = useState('txt')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPoem('')

    try {
      const result = await generatePoetry({
        genre,
        poeticStyle,
        poet: customPoet || poet,
        numberOfLines,
        mood,
        language
      })

      if (result.success && result.poem) {
        setPoem(result.poem)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate poem. Please try again.',
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
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(poem)
    toast({
      title: 'Copied',
      description: 'Poem copied to clipboard',
    })
  }

  const handleDownload = () => {
    const filename = 'poem.' + downloadFormat
    const content = poem
    
    if (downloadFormat === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (downloadFormat === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Poem</title>
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
    <div className="space-y-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 rounded-3xl shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="genre" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Genre</Label>
          <Select onValueChange={setGenre} required>
            <SelectTrigger id="genre" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="language" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Language</Label>
          <Select onValueChange={setLanguage} defaultValue="english">
            <SelectTrigger id="language" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="poeticStyle" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Poetic Style (Optional)</Label>
            <Select onValueChange={setPoeticStyle}>
              <SelectTrigger id="poeticStyle" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {Object.keys(poeticStyles).map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="poet" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Poet's Style (Optional)</Label>
            <Select onValueChange={setPoet} disabled={!poeticStyle}>
              <SelectTrigger id="poet" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a poet" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {poeticStyle && poeticStyles[poeticStyle]?.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="customPoet" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Custom Poet (Optional)</Label>
          <Input
            id="customPoet"
            value={customPoet}
            onChange={(e) => setCustomPoet(e.target.value)}
            placeholder="Enter a poet's name"
            className="rounded-xl shadow-md"
          />
        </div>

        <div>
          <Label htmlFor="numberOfLines" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Number of Lines</Label>
          <Input
            id="numberOfLines"
            type="number"
            min={4}
            max={40}
            value={numberOfLines}
            onChange={(e) => setNumberOfLines(parseInt(e.target.value))}
            className="rounded-xl shadow-md"
          />
        </div>

        <div>
          <Label htmlFor="mood" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Mood/Emotion</Label>
          <Slider
            id="mood"
            min={0}
            max={100}
            step={1}
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Melancholic</span>
            <span>Uplifting</span>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 transition duration-300">
          {isLoading ? 'Crafting Poetry...' : 'Generate Poem'}
        </Button>
      </form>

      {poem && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
          <pre className="whitespace-pre-wrap font-serif text-lg text-gray-900 dark:text-gray-100 max-h-96 overflow-y-auto">{poem}</pre>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button
              onClick={handleCopy}
              className="rounded-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
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
              onClick={handleDownload}
              className="rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Poem
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

