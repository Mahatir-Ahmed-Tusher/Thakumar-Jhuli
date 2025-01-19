'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { generateSocialMediaContent } from '../actions/generate-social-media-content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const contentTypes = ["Message", "Comment", "Post"]
const tones = ["Formal", "Informal", "Lovely", "Gen Z", "Charming", "Slangy", "Bitchy"]

export default function SocialMediaAssistance() {
  const [contentType, setContentType] = useState('')
  const [tone, setTone] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedContent('')

    try {
      const result = await generateSocialMediaContent({
        contentType,
        tone,
        prompt
      })

      if (result.success && result.content) {
        setGeneratedContent(result.content)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate content. Please try again.',
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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    toast({
      title: 'Copied',
      description: 'Content copied to clipboard',
    })
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="message">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="message">Message</TabsTrigger>
          <TabsTrigger value="comment">Comment</TabsTrigger>
          <TabsTrigger value="post">Post</TabsTrigger>
        </TabsList>
        {contentTypes.map((type) => (
          <TabsContent key={type} value={type.toLowerCase()}>
            <Card>
              <CardHeader>
                <CardTitle>Generate {type}</CardTitle>
                <CardDescription>Create a {type.toLowerCase()} for social media</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="contentType" value={type} />
                  <div>
                    <Label htmlFor="tone" className="text-lg font-semibold">Tone</Label>
                    <Select onValueChange={setTone} required>
                      <SelectTrigger id="tone" className="rounded-xl shadow-md">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="prompt" className="text-lg font-semibold">Prompt</Label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={`Describe the ${type.toLowerCase()} you want to generate`}
                      required
                      className="rounded-xl shadow-md"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" disabled={isGenerating} className="w-full rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 transition duration-300">
                    {isGenerating ? `Generating ${type}...` : `Generate ${type}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Review and modify the generated content as needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Textarea
                value={generatedContent}
                readOnly
                rows={10}
                className="rounded-l-xl shadow-md"
              />
              <Button
                onClick={handleCopy}
                className="rounded-r-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800 h-full"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

