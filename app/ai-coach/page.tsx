import Image from 'next/image'
import AICoach from '../components/AICoach'

export default function AICoachPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <Image
            src="https://i.postimg.cc/V64LQ0nZ/b377cebd-41e9-46f6-bd72-a93dfd5f40f9-removalai-preview.png"
            alt="AI Writing Coach Icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AI Writing Coach</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 italic">"Elevate your writing with personalized AI guidance"</p>
        </section>
        
        <section className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">
          <AICoach />
        </section>
      </main>
    </div>
  )
}

