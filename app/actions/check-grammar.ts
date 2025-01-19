'use server'

import { Mistral } from '@/lib/mistral'

interface GrammarCheckRequest {
  content: string
  writingStyle: string
}

export async function checkGrammar(request: GrammarCheckRequest) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `You are an expert writing assistant specializing in grammar, spelling, punctuation, and style improvements. Analyze text and provide detailed suggestions in JSON format with type (grammar/spelling/style/punctuation), text (original), suggestion (correction), and explanation fields. Also provide a fully corrected version of the text. Your response should be a valid JSON object with 'suggestions' and 'correctedText' fields.`
        },
        {
          role: 'user',
          content: `Check this ${request.writingStyle} text and provide suggestions for improvement: "${request.content}"`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    const content = response.choices[0].message.content
    let suggestions = []
    let correctedText = request.content // Default to original text

    try {
      const parsedContent = JSON.parse(content)
      if (Array.isArray(parsedContent.suggestions)) {
        suggestions = parsedContent.suggestions
      }
      if (typeof parsedContent.correctedText === 'string') {
        correctedText = parsedContent.correctedText
      }
    } catch (e) {
      console.error('Failed to parse suggestions:', e)
      // If parsing fails, create a single suggestion from the entire content
      suggestions = [{
        type: 'style',
        text: request.content,
        suggestion: content,
        explanation: 'General improvement suggestion'
      }]
    }

    return { 
      success: true, 
      suggestions,
      correctedText
    }
  } catch (error) {
    console.error('Grammar check error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

