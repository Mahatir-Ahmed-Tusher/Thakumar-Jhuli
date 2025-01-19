'use server'

import { Mistral } from '@/lib/mistral'

export async function paraphraseText(text: string) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const isSingleSentence = !text.includes('.')

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `You are an expert at paraphrasing text while maintaining its original meaning but improving clarity, tone, and style. ${isSingleSentence ? 'You are paraphrasing a single sentence.' : 'You are paraphrasing a full text.'}`
        },
        {
          role: 'user',
          content: `Please paraphrase this ${isSingleSentence ? 'sentence' : 'text'} while maintaining its meaning: "${text}"`
        }
      ],
      temperature: 0.7,
      max_tokens: isSingleSentence ? 100 : 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    return { 
      success: true, 
      paraphrasedText: response.choices[0].message.content 
    }
  } catch (error) {
    console.error('Paraphrasing error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

