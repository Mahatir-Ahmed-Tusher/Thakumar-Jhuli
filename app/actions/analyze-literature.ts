'use server'

import { Mistral } from '@/lib/mistral'

interface AnalysisRequest {
  content: string
  type: 'explain' | 'summarize' | 'criticize'
  contentType: 'poem' | 'story'
}

export async function analyzeLiterature(request: AnalysisRequest) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompts = {
      explain: 'You are a literary expert who explains poems and stories in detail, covering themes, symbolism, and meaning.',
      summarize: 'You are a skilled summarizer who can concisely capture the essence of literary works.',
      criticize: 'You are a constructive literary critic who analyzes works and provides specific suggestions for improvement.'
    }

    const userPrompts = {
      explain: `Please explain this ${request.contentType} in detail, covering its themes, symbolism, and deeper meaning:\n\n${request.content}`,
      summarize: `Please provide a concise summary of this ${request.contentType}:\n\n${request.content}`,
      criticize: `Please analyze this ${request.contentType} and provide specific suggestions for improvement:\n\n${request.content}`
    }

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: systemPrompts[request.type]
        },
        {
          role: 'user',
          content: userPrompts[request.type]
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    return { 
      success: true, 
      analysis: response.choices[0].message.content 
    }
  } catch (error) {
    console.error('Literature analysis error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

