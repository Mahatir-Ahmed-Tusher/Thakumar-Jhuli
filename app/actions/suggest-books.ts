'use server'

import { Mistral } from '@/lib/mistral'

interface SuggestBooksRequest {
  mood?: string
  query?: string
}

export async function suggestBooks(request: SuggestBooksRequest) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompt = 'You are a knowledgeable librarian capable of suggesting books based on mood or custom queries.'

    let userPrompt
    if (request.mood) {
      userPrompt = `Suggest 5 books that would be suitable for someone feeling ${request.mood}. Provide only the titles and authors.`
    } else if (request.query) {
      userPrompt = `Suggest 5 books based on the following query: "${request.query}". Provide only the titles and authors.`
    } else {
      throw new Error('Either mood or query must be provided')
    }

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    const suggestions = response.choices[0].message.content.split('\n').filter(Boolean)

    return { 
      success: true, 
      suggestions
    }
  } catch (error) {
    console.error('Book suggestion error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

