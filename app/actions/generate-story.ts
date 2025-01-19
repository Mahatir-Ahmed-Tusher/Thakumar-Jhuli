'use server'

import { Mistral } from '@/lib/mistral'

interface StoryPrompt {
  genre: string
  subGenre?: string
  characterName: string
  setting: string
  additionalDetails?: string
  storyFormat: string
  narrativeStyle: string
  language: string
  mood: number
}

export async function generateStory(prompt: StoryPrompt) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables');
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY);

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `You are a creative storyteller fluent in both English and Bengali. Generate engaging stories based on the provided parameters in the specified language.`
        },
        {
          role: 'user',
          content: `Write a ${prompt.genre}${prompt.subGenre ? ` (${prompt.subGenre})` : ''} story in ${prompt.storyFormat} format, using ${prompt.narrativeStyle} narrative style, about a character named ${prompt.characterName} in ${prompt.setting}. The mood should be ${prompt.mood < 50 ? 'darker and more serious' : 'lighter and more cheerful'}. ${prompt.additionalDetails || ''} Write the story in ${prompt.language}.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response);
      throw new Error('Unexpected API response structure');
    }

    return { success: true, story: response.choices[0].message.content };
  } catch (error) {
    console.error('Story generation error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function expandStory(currentStory: string, language: string) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error('MISTRAL_API_KEY is not set in the environment variables');
    }

    const mistral = new Mistral(process.env.MISTRAL_API_KEY);

    const response = await mistral.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `You are a creative storyteller fluent in both English and Bengali. Continue and expand the given story with new developments and details in the same language as the original story.`
        },
        {
          role: 'user',
          content: `Continue this story in ${language}: ${currentStory}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Unexpected API response structure:', response);
      throw new Error('Unexpected API response structure');
    }

    return { success: true, continuation: response.choices[0].message.content };
  } catch (error) {
    console.error('Story expansion error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

