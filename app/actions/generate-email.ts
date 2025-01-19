'use server'

import { Mistral } from '@/lib/mistral'

interface EmailPrompt {
  purpose: string
  emailType: string
  additionalDetails?: string
}

export async function generateEmail(prompt: EmailPrompt) {
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
          content: `You are an expert email writer. Format your response with "Subject:" on the first line, followed by the subject, then "Body:" on a new line, followed by the email content.`
        },
        {
          role: 'user',
          content: `Write a ${prompt.emailType} email for the following purpose: "${prompt.purpose}". ${prompt.additionalDetails ? `Additional details: ${prompt.additionalDetails}` : ''}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', JSON.stringify(response, null, 2))
      throw new Error('Unexpected API response structure')
    }

    const content = response.choices[0].message.content
    
    // More robust parsing
    const subjectMatch = content.match(/Subject:\s*(.*)/i)
    const bodyMatch = content.match(/Body:\s*([\s\S]*)/i)

    if (!subjectMatch || !bodyMatch) {
      console.error('Failed to parse content:', content)
      throw new Error('Failed to parse email content properly')
    }

    const subject = subjectMatch[1].trim()
    const body = bodyMatch[1].trim()

    return {
      success: true,
      email: {
        subject,
        body
      }
    }
  } catch (error) {
    console.error('Email generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

