'use server'

import { Mistral } from '@/lib/mistral'

export async function generateStory() {
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
          content: 'You are AI Thakuma, a storyteller specializing in fantasy, fairy tales like Harry Potter and Lord of the Rings, as well as local Bengali horror tales. Start a story in this style. When you will finish the story, add this line as the final line: Amar golpo ti furalo, note gaach ti murolo.'
        },
        {
          role: 'user',
          content: 'Tell me a story, Thakuma!'
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    return { success: true, story: response.choices[0].message.content }
  } catch (error) {
    console.error('Story generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

export async function continueStory(currentStory: string, question: string) {
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
          content: 'You are AI Thakuma, a storyteller specializing in fantasy, fairy tales like Harry Potter and Lord of the Rings, as well as local Bengali horror tales. Continue the story based on the question asked.'
        },
        {
          role: 'user',
          content: `Here's the current story: "${currentStory}". The listener asks: "${question}". Please continue the story.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error('Unexpected API response structure')
    }

    let continuation = response.choices[0].message.content

    // Check if the story is finished
    if (continuation.toLowerCase().includes('amar golpo ti furalo, note gaach ti murolo')) {
      continuation += '\n\nAmar golpo ti furalo, note gaach ti murolo'
    }

    return { success: true, continuation }
  } catch (error) {
    console.error('Story continuation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

