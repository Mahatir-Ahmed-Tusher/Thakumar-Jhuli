'use server'

import { Mistral } from '@/lib/mistral'

export async function reviewBook(bookTitle: string) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompt = 'You are a knowledgeable book critic capable of providing insightful reviews of books.'

    const userPrompt = `Provide a brief review of the book "${bookTitle}". Include information about its plot, themes, writing style, and your overall opinion. Also, mention its price range, availability, and if there are any legal sources for downloading a PDF version.`

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    return { 
      success: true, 
      review: response.choices[0].message.content
    }
  } catch (error) {
    console.error('Book review error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

