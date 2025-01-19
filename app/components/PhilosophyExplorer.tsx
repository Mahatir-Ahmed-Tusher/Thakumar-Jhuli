'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { explainPhilosophy } from '../actions/explain-philosophy'
import { Copy, Download } from 'lucide-react'

const philosophers = [
  { name: "Socrates", concept: "Socratic Method" },
  { name: "Plato", concept: "Theory of Forms" },
  { name: "Aristotle", concept: "Golden Mean" },
  { name: "Nietzsche", concept: "Übermensch" },
  { name: "Kant", concept: "Categorical Imperative" },
  { name: "Descartes", concept: "Cogito, Ergo Sum" },
  { name: "Hegel", concept: "Dialectical Idealism" },
  { name: "Marx", concept: "Historical Materialism" },
  { name: "John Stuart Mill", concept: "Utilitarianism" },
  { name: "Schopenhauer", concept: "The Will as Reality" },
  { name: "Foucault", concept: "Power/Knowledge" },
  { name: "Sartre", concept: "Existence Precedes Essence" },
  { name: "Simone de Beauvoir", concept: "Gender and Freedom" },
  { name: "Hannah Arendt", concept: "The Banality of Evil" },
  { name: "Wittgenstein", concept: "Language Games" },
  { name: "Russell", concept: "Logical Atomism" },
  { name: "Rawls", concept: "Theory of Justice" },
  { name: "Popper", concept: "Falsifiability" },
  { name: "Judith Butler", concept: "Gender Performativity" },
  { name: "Peter Singer", concept: "Effective Altruism" },
  { name: "Confucius", concept: "Ethics of Harmony" },
  { name: "Laozi", concept: "Wu Wei" },
  { name: "Epicurus", concept: "Hedonism as the Absence of Pain" },
  { name: "Zeno of Citium", concept: "Stoicism" },
  { name: "Augustine", concept: "Original Sin" },
  { name: "Aquinas", concept: "Natural Theology" },
  { name: "Boethius", concept: "Consolation of Philosophy" },
  { name: "Comte", concept: "Positivism" },
  { name: "Leibniz", concept: "Pre-established Harmony" },
  { name: "Spinoza", concept: "Unity of God and Nature" },
  { name: "Bacon", concept: "Scientific Method" },
  { name: "Machiavelli", concept: "Realpolitik" },
  { name: "Derrida", concept: "Deconstruction" },
  { name: "Heidegger", concept: "Being and Time" },
  { name: "Alfred North Whitehead", concept: "Process Philosophy" },
  { name: "Slavoj Žižek", concept: "Ideology and Psychoanalysis" },
  { name: "Alain Badiou", concept: "Event and Ontology" }
]

export default function PhilosophyExplorer() {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState('')
  const [selectedConcept, setSelectedConcept] = useState('')
  const [customPhilosopher, setCustomPhilosopher] = useState('')
  const [customConcept, setCustomConcept] = useState('')
  const [philosophyQuote, setPhilosophyQuote] = useState('')
  const [explanation, setExplanation] = useState('')
  const [isExplaining, setIsExplaining] = useState(false)
  const { toast } = useToast()

  const handleExplain = async (type: 'selected' | 'custom' | 'quote') => {
    setIsExplaining(true)
    try {
      let result
      if (type === 'selected') {
        result = await explainPhilosophy({
          philosopher: selectedPhilosopher,
          concept: selectedConcept,
          type: 'concept'
        })
      } else if (type === 'custom') {
        result = await explainPhilosophy({
          philosopher: customPhilosopher,
          concept: customConcept,
          type: 'concept'
        })
      } else {
        result = await explainPhilosophy({
          quote: philosophyQuote,
          type: 'quote'
        })
      }

      if (result.success && result.explanation) {
        setExplanation(result.explanation)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to explain. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Explanation error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsExplaining(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation)
    toast({
      title: 'Copied',
      description: 'Explanation copied to clipboard',
    })
  }

  const handleDownload = (format: 'txt' | 'doc') => {
    const filename = `philosophy_explanation.${format}`
    const content = explanation
    
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' })
      downloadFile(blob, filename)
    } else if (format === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Philosophy Explanation</title>
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
          <CardTitle>Explore Philosophical Concepts</CardTitle>
          <CardDescription>Select a philosopher and concept, or enter your own</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="philosopher">Philosopher</Label>
              <Select onValueChange={setSelectedPhilosopher}>
                <SelectTrigger id="philosopher">
                  <SelectValue placeholder="Select philosopher" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {philosophers.map((p) => (
                    <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="concept">Concept</Label>
              <Select onValueChange={setSelectedConcept}>
                <SelectTrigger id="concept">
                  <SelectValue placeholder="Select concept" />
                </SelectTrigger>
                <SelectContent>
                  {philosophers.find(p => p.name === selectedPhilosopher)?.concept && (
                    <SelectItem value={philosophers.find(p => p.name === selectedPhilosopher)!.concept}>
                      {philosophers.find(p => p.name === selectedPhilosopher)!.concept}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={() => handleExplain('selected')} 
            disabled={isExplaining || !selectedPhilosopher || !selectedConcept}
          >
            Explain Selected Concept
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Philosophical Concept</CardTitle>
          <CardDescription>Enter a philosopher and concept not listed above</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="customPhilosopher">Philosopher</Label>
              <Input 
                id="customPhilosopher" 
                value={customPhilosopher} 
                onChange={(e) => setCustomPhilosopher(e.target.value)}
                placeholder="Enter philosopher's name"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="customConcept">Concept</Label>
              <Input 
                id="customConcept" 
                value={customConcept} 
                onChange={(e) => setCustomConcept(e.target.value)}
                placeholder="Enter philosophical concept"
              />
            </div>
          </div>
          <Button 
            onClick={() => handleExplain('custom')} 
            disabled={isExplaining || !customPhilosopher || !customConcept}
          >
            Explain Custom Concept
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Explain Philosophy Quote</CardTitle>
          <CardDescription>Enter a quote from any philosophy book for explanation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={philosophyQuote} 
            onChange={(e) => setPhilosophyQuote(e.target.value)}
            placeholder="Enter a philosophical quote"
            rows={3}
          />
          <Button 
            onClick={() => handleExplain('quote')} 
            disabled={isExplaining || !philosophyQuote}
          >
            Explain Quote
          </Button>
        </CardContent>
      </Card>

      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-96 overflow-y-auto">
              <p className="whitespace-pre-wrap">{explanation}</p>
            </div>
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
          </CardContent>
        </Card>
      )}
    </div>
  )
}

