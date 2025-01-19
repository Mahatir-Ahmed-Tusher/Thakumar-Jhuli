'use server'

import { Mistral } from '@/lib/mistral'

interface SocialMediaContentPrompt {
  contentType: string
  tone: string
  prompt: string
}

export async function generateSocialMediaContent(prompt: SocialMediaContentPrompt) {
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
          content: 'You are an expert social media content creator capable of generating engaging content for various platforms and purposes.'
        },
        {
          role: 'user',
          content: `Generate a ${prompt.contentType} for social media with a ${prompt.tone} tone based on the following prompt: "${prompt.prompt}".`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response)
      throw new Error('Unexpected API response structure')
    }

    return { success: true, content: response.choices[0].message.content }
  } catch (error) {
    console.error('Social media content generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

