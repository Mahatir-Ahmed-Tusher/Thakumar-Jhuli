'use server'

import { Mistral } from '@/lib/mistral'

export async function getWritingAdvice(content: string) {
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
          content: `You are an expert writing coach. Analyze the given text and provide actionable advice for improving writing style, structure, and impact. Focus on enhancing clarity, engagement, and overall quality. Provide suggestions in JSON format with type, suggestion, and explanation fields. The response should be a valid JSON array of advice objects.`
        },
        {
          role: 'user',
          content: `Analyze this text and provide writing advice: "${content}"`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    let advice = []
    try {
      advice = JSON.parse(response.choices[0].message.content)
      if (!Array.isArray(advice)) {
        throw new Error('Parsed content is not an array')
      }
    } catch (e) {
      console.error('Failed to parse advice:', e)
      advice = [{
        type: 'general',
        suggestion: response.choices[0].message.content,
        explanation: 'General writing advice'
      }]
    }

    return { 
      success: true, 
      advice
    }
  } catch (error) {
    console.error('Writing advice error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

