'use server'

import { Mistral } from '@/lib/mistral'

interface PoetryPrompt {
  genre: string
  poeticStyle?: string
  poet?: string
  numberOfLines: number
  mood: number
  language: string
}

export async function generatePoetry(prompt: PoetryPrompt) {
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
          content: 'You are a skilled poet who can write in various styles and forms.'
        },
        {
          role: 'user',
          content: `Write a ${prompt.genre} poem in ${prompt.language}${prompt.poeticStyle ? ` in the style of ${prompt.poeticStyle}` : ''}${prompt.poet ? ` specifically mimicking ${prompt.poet}` : ''} with exactly ${prompt.numberOfLines} lines. The mood should be ${prompt.mood < 50 ? 'more melancholic' : 'more uplifting'}.`
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response)
      throw new Error('Unexpected API response structure')
    }

    return { success: true, poem: response.choices[0].message.content }
  } catch (error) {
    console.error('Poetry generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

