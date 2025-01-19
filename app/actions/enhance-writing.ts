'use server'

import { Mistral } from '@/lib/mistral'

interface EnhanceWritingRequest {
  content: string
  contentType: 'story' | 'poem' | 'screenplay' | 'play'
  language: 'english' | 'bengali'
}

export async function enhanceWriting(request: EnhanceWritingRequest) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompt = `You are an expert ${request.contentType} writer and editor, fluent in both English and Bengali. Enhance the given ${request.contentType} in ${request.language}, improving its quality, style, and impact while maintaining the original language.`

    const userPrompt = `Enhance this ${request.contentType} in ${request.language}:\n\n${request.content}`

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    return { 
      success: true, 
      enhancedContent: response.choices[0].message.content 
    }
  } catch (error) {
    console.error('Writing enhancement error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

