'use server'

import { Mistral } from '@/lib/mistral'

interface PhilosophyRequest {
  philosopher?: string
  concept?: string
  quote?: string
  type: 'concept' | 'quote'
}

export async function explainPhilosophy(request: PhilosophyRequest) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables')
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY)

    const systemPrompt = 'You are a knowledgeable philosophy expert capable of explaining complex philosophical concepts and quotes in simple terms.'

    let userPrompt
    if (request.type === 'concept') {
      userPrompt = `Explain the concept of "${request.concept}" by philosopher ${request.philosopher} in simple terms. Provide context, key ideas, and its significance in philosophy.`
    } else {
      userPrompt = `Explain the meaning and significance of this philosophical quote: "${request.quote}". Provide context and interpretation.`
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
      explanation: response.choices[0].message.content 
    }
  } catch (error) {
    console.error('Philosophy explanation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

