'use server'

import { Mistral } from '@/lib/mistral'

interface ScientificArticlePrompt {
  topic: string
  keywords?: string
  field: string
  length: string
  tone: string
  additionalSuggestions?: string
}

export async function generateScientificArticle(prompt: ScientificArticlePrompt) {
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
          content: 'You are an expert scientific writer capable of generating well-structured and accurate scientific articles across various fields.'
        },
        {
          role: 'user',
          content: `Generate a ${prompt.length} scientific article on the topic "${prompt.topic}" in the field of ${prompt.field}. Use a ${prompt.tone} tone. ${prompt.keywords ? `Include these keywords: ${prompt.keywords}.` : ''} ${prompt.additionalSuggestions ? `Additional requirements: ${prompt.additionalSuggestions}` : ''} Structure the article with an abstract, introduction, main body with sections, conclusion, and placeholder references.`
        }
      ],
      temperature: 0.7,
      max_tokens: prompt.length === 'short' ? 800 : prompt.length === 'medium' ? 1500 : 2500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response)
      throw new Error('Unexpected API response structure')
    }

    return { success: true, article: response.choices[0].message.content }
  } catch (error) {
    console.error('Scientific article generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

export async function expandScientificArticle(currentArticle: string, additionalSuggestions?: string) {
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
          content: 'You are an expert scientific writer capable of expanding and improving existing scientific articles.'
        },
        {
          role: 'user',
          content: `Expand and improve the following scientific article. ${additionalSuggestions ? `Consider these additional suggestions: ${additionalSuggestions}` : ''} Here's the current article:

${currentArticle}

Please provide an expanded and improved version of this article.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2500
    })

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response)
      throw new Error('Unexpected API response structure')
    }

    return { success: true, expandedArticle: response.choices[0].message.content }
  } catch (error) {
    console.error('Scientific article expansion error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

