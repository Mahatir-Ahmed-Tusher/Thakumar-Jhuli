import Image from 'next/image'
import PoetryGenerator from '../components/PoetryGenerator'
import Paraphraser from '../components/Paraphraser'

export default function PoetryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <Image
            src="https://i.postimg.cc/MGjGQL7x/image.png"
            alt="Poetry Icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Poetry Generator—প্রাণহীন কবি</h1>
          <p className="text-2xl text-black dark:text-gray-300 mb-8 italic">"Let your words flow like verses"</p>
        </section>
        
        <section className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Create Your Poetry</h2>
          <PoetryGenerator />
          <div className="mt-12">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="https://i.postimg.cc/ydVYFdtG/image.png"
                alt="Paraphraser Icon"
                width={60}
                height={60}
                className="mr-4"
              />
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Paraphraser</h3>
            </div>
            <Paraphraser />
          </div>
        </section>
      </main>
    </div>
  )
}

