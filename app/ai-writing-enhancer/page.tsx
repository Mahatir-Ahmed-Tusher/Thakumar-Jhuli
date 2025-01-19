import Image from 'next/image'
import AIWritingEnhancer from '../components/AIWritingEnhancer'

export default function AIWritingEnhancerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <Image
            src="https://i.postimg.cc/cLPx0cVz/image.png"
            alt="AI Writing Enhancer Icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AI Writing Enhancer</h1>
          <p className="text-2xl text-gray-700 mb-8 italic">"Elevate your writing with AI assistance"</p>
        </section>
        
        <section className="bg-white shadow-2xl rounded-3xl p-8">
          <AIWritingEnhancer />
        </section>
      </main>
    </div>
  )
}

