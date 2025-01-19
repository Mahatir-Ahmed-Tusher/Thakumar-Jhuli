'use server'

import { Mistral } from '@/lib/mistral'

interface RoleplayRequest {
  input: string
  action: 'start' | 'continue'
  context?: string
}

export async function roleplayInteraction(input: string, action: 'start' | 'continue', context?: string) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompt = 'You are an AI storyteller engaged in an interactive roleplaying scenario. Respond to the user\'s input to create an engaging and dynamic story.'

    let userPrompt
    if (action === 'start') {
      userPrompt = `Start a new interactive story based on this scenario: ${input}`
    } else {
      userPrompt = `Continue the story. Previous context:
${context}

User's latest input: ${input}

Respond to the user's input and progress the story:`
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

    return { 
      success: true, 
      response: response.choices[0].message.content 
    }
  } catch (error) {
    console.error('Roleplay interaction error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

