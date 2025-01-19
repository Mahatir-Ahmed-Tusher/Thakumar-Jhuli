'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Slider } from '@/components/ui/slider'
import { Book, Feather, Sparkles, Plus, Trash2 } from 'lucide-react'
import StoryDisplay from './StoryDisplay'
import CharacterDevelopment from './CharacterDevelopment'
import PlotBuilder from './PlotBuilder'
import { generateStory } from '../actions/generate-story'

const genres = [
  "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller", "Adventure",
  "Horror", "Historical Fiction", "Drama", "Comedy", "Action", "Young Adult (YA)",
  "Dystopian", "Fairy Tale", "Superhero"
]

const subGenres = {
  "Fantasy": ["Urban Fantasy"],
  "Science Fiction": ["Cyberpunk", "Steampunk"],
  "Mystery": ["Cozy Mystery"],
  "Romance": ["Paranormal Romance", "Historical Romance"],
  "Thriller": ["Psychological Thriller"],
  "Horror": ["Gothic Horror"],
  "Historical Fiction": ["Western"],
  "General Fiction": ["Magical Realism"]
}

interface Character {
  name: string;
}

export default function StoryGenerator() {
  const [genre, setGenre] = useState('')
  const [subGenre, setSubGenre] = useState('')
  const [characters, setCharacters] = useState<Character[]>([{ name: '' }])
  const [storyIdea, setStoryIdea] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [storyFormat, setStoryFormat] = useState('short_story')
  const [narrativeStyle, setNarrativeStyle] = useState('third_person')
  const [language, setLanguage] = useState('english')
  const [mood, setMood] = useState(50)
  const [story, setStory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setSubGenre('')
  }, [genre])

  const addCharacter = () => {
    setCharacters([...characters, { name: '' }])
  }

  const removeCharacter = (index: number) => {
    if (characters.length > 1) {
      const newCharacters = characters.filter((_, i) => i !== index)
      setCharacters(newCharacters)
    }
  }

  const updateCharacter = (index: number, name: string) => {
    const newCharacters = [...characters]
    newCharacters[index] = { name }
    setCharacters(newCharacters)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStory('');

    try {
      const result = await generateStory({
        genre,
        subGenre,
        characterName: characters.map(c => c.name).join(', '),
        setting: storyIdea,
        additionalDetails,
        storyFormat,
        narrativeStyle,
        language,
        mood
      });

      if (result.success && result.story) {
        setStory(result.story);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate story. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8 rounded-3xl shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="genre" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Genre</Label>
            <Select onValueChange={setGenre} required>
              <SelectTrigger id="genre" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subGenre" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sub-Genre (Optional)</Label>
            <Select onValueChange={setSubGenre} disabled={!genre || !subGenres[genre]}>
              <SelectTrigger id="subGenre" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a sub-genre" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {genre && subGenres[genre]?.map((sg) => (
                  <SelectItem key={sg} value={sg}>{sg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="language" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Language</Label>
          <Select onValueChange={setLanguage} defaultValue="english">
            <SelectTrigger id="language" className="rounded-xl shadow-md">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">Characters</Label>
            <Button 
              type="button" 
              onClick={addCharacter}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Character
            </Button>
          </div>
          {characters.map((character, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={character.name}
                onChange={(e) => updateCharacter(index, e.target.value)}
                placeholder={`Character ${index + 1} name`}
                required
                className="rounded-xl shadow-md"
              />
              {characters.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeCharacter(index)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div>
          <Label htmlFor="storyIdea" className="text-lg font-semibold text-gray-800 dark:text-gray-200">The Story You Want</Label>
          <Input
            id="storyIdea"
            value={storyIdea}
            onChange={(e) => setStoryIdea(e.target.value)}
            required
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="storyFormat" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Story Format</Label>
            <Select onValueChange={setStoryFormat} defaultValue="short_story">
              <SelectTrigger id="storyFormat" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a story format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short_story">Short Story</SelectItem>
                <SelectItem value="novella">Novella</SelectItem>
                <SelectItem value="screenplay">Screenplay</SelectItem>
                <SelectItem value="play">Play</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="narrativeStyle" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Narrative Style</Label>
            <Select onValueChange={setNarrativeStyle} defaultValue="third_person">
              <SelectTrigger id="narrativeStyle" className="rounded-xl shadow-md">
                <SelectValue placeholder="Select a narrative style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first_person">First Person</SelectItem>
                <SelectItem value="third_person">Third Person</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="mood" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Mood/Emotion</Label>
          <Slider
            id="mood"
            min={0}
            max={100}
            step={1}
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Dark/Serious</span>
            <span>Lighthearted</span>
          </div>
        </div>
        <div>
          <Label htmlFor="additionalDetails" className="text-lg font-semibold text-gray-800 dark:text-gray-200">Additional Details (Optional)</Label>
          <Textarea
            id="additionalDetails"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Add any additional details or plot elements you'd like to include..."
            rows={3}
            className="rounded-xl shadow-md"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full rounded-xl shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 transition duration-300">
          {isLoading ? 'Crafting Your Tale...' : 'Generate Story'}
        </Button>
      </form>
      <CharacterDevelopment />
      <PlotBuilder />
      {story && <StoryDisplay story={story} />}
    </div>
  )
}

