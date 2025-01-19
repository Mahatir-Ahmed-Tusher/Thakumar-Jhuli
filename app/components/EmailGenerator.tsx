'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { generateEmail } from '../actions/generate-email'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy } from 'lucide-react'

const emailTypes = [
  "Professional", "Personal", "Sales", "Customer Service", "Invitation",
  "Thank You", "Apology", "Follow-up", "Networking", "Job Application"
]

export default function EmailGenerator() {
  const [purpose, setPurpose] = useState('')
  const [emailType, setEmailType] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState({ subject: '', body: '' })
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedEmail({ subject: '', body: '' })

    try {
      const result = await generateEmail({
        purpose,
        emailType,
        additionalDetails
      })

      if (result.success && result.email) {
        setGeneratedEmail(result.email)
      } else {
        console.error('Email generation failed:', result.error)
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate email. Please try again.',
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied',
      description: 'Email content copied to clipboard',
    })
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="purpose" className="text-lg font-semibold">Email Purpose</Label>
          <Input
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., Request a meeting with a client"
            required
            className="rounded-xl shadow-md"
          />
        </div>
        <div>
          <Label htmlFor="emailType" className="text-lg font-semibold">Email Type</Label>
          <Select onValueChange={setEmailType} required>
            <SelectTrigger id="emailType" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select email type" />
            </SelectTrigger>
            <SelectContent>
              {emailTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="additionalDetails" className="text-lg font-semibold">Additional Details (Optional)</Label>
          <Textarea
            id="additionalDetails"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Enter any additional details or specific requirements for your email"
            className="rounded-xl shadow-md"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={isGenerating} className="w-full rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 transition duration-300">
          {isGenerating ? 'Generating Email...' : 'Generate Email'}
        </Button>
      </form>

      {generatedEmail.subject && generatedEmail.body && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>Review and modify the generated email as needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-lg font-semibold">Subject</Label>
              <div className="flex items-center">
                <Input
                  id="subject"
                  value={generatedEmail.subject}
                  readOnly
                  className="rounded-l-xl shadow-md"
                />
                <Button
                  onClick={() => handleCopy(generatedEmail.subject)}
                  className="rounded-r-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="body" className="text-lg font-semibold">Body</Label>
              <div className="flex items-start">
                <Textarea
                  id="body"
                  value={generatedEmail.body}
                  readOnly
                  rows={10}
                  className="rounded-l-xl shadow-md"
                />
                <Button
                  onClick={() => handleCopy(generatedEmail.body)}
                  className="rounded-r-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800 h-full"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

