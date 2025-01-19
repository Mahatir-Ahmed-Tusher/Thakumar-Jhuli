import Image from 'next/image'
import SocialMediaAssistance from '../components/SocialMediaAssistance'

export default function SocialMediaAssistancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <Image
            src="https://i.postimg.cc/J7vnxMhJ/image.png"
            alt="Social Media Assistance Icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Social Media Assistance</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 italic">"Craft engaging social media content with AI"</p>
        </section>
        
        <section className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8">
          <SocialMediaAssistance />
        </section>
      </main>
    </div>
  )
}

