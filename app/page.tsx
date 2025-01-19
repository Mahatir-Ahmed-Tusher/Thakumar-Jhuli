import Image from 'next/image'
import Link from 'next/link'
import { ImageCarousel } from '@/components/image-carousel'
import { ThemeToggle } from '@/components/theme-toggle'

const mainFeatures = [
  { name: "Generate Stories", icon: "https://i.postimg.cc/pdyF1kK1/image.png", description: "Create and explore captivating narratives", href: "/stories" },
  { name: "Generate Poetry", icon: "https://i.postimg.cc/MGjGQL7x/image.png", description: "Craft beautiful verses and rhymes", href: "/poetry" },
  { name: "Literature Analysis", icon: "https://i.postimg.cc/6qB6F5D5/image.png", description: "Understand, analyze, and improve literature", href: "/literature-analysis" },
  { name: "Your Philosophy Guide", icon: "https://i.postimg.cc/v8vZffV1/image.png", description: "Explore philosophical concepts and ideas", href: "/philosophy" },
  { name: "AI Thakuma's Story", icon: "https://i.postimg.cc/C1tXwrG4/4177e7c7-ab87-4b1f-b2ac-9a2051b458b9-removalai-preview.png", description: "Experience magical tales narrated by our AI Thakuma", href: "/ai-thakuma-story" },
  { name: "AI Writing Enhancer", icon: "https://i.postimg.cc/cLPx0cVz/image.png", description: "Enhance your writing with AI", href: "/ai-writing-enhancer" },
  { name: "AI Roleplaying", icon: "https://i.postimg.cc/CL1S8t0t/image.png", description: "Engage in interactive storytelling", href: "/ai-roleplaying" },
]

const additionalFeatures = [
  { name: "Scientific Article Writing", icon: "https://i.postimg.cc/J7c6c4xY/image.png", description: "Generate well-structured scientific articles", href: "/scientific-article" },
  { name: "Email Generator", icon: "https://i.postimg.cc/1tggRttm/image.png", description: "Create professional emails with AI", href: "/email-generator" },
  { name: "Social Media Assistance", icon: "https://i.postimg.cc/J7vnxMhJ/image.png", description: "Generate social media content", href: "/social-media" },
  { name: "Grammar & Style Checker", icon: "https://i.postimg.cc/fLQ0Td3w/image.png", description: "Spot and fix writing mistakes with AI assistance", href: "/grammar-checker" },
  { name: "AI Writing Coach", icon: "https://i.postimg.cc/V64LQ0nZ/b377cebd-41e9-46f6-bd72-a93dfd5f40f9-removalai-preview.png", description: "Get real-time writing tips and improvements", href: "/ai-coach" },
  { name: "Paraphraser", icon: "https://i.postimg.cc/ydVYFdtG/image.png", description: "Rewrite text with clarity and style", href: "/paraphraser" }
]

const storytellerTypes = [
  {
    title: "For dreamers with a pen",
    description: "Turn your ideas into masterpieces and write your way to confidence and creativity.",
    icon: "https://i.postimg.cc/y8CM6rL2/image.png"
  },
  {
    title: "For content wizards",
    description: "Infuse every word with the power of storytelling to enchant and engage your readers.",
    icon: "https://i.postimg.cc/66kWRcHf/4fa0bff9-e596-4c1b-ac40-513a23f7558f-removalai-preview.png"
  },
  {
    title: "For bold innovators",
    description: "Shape a brand story that sparks emotion, builds trust, and sets your business apart.",
    icon: "https://i.postimg.cc/CxYwr1pZ/image.png"
  },
  {
    title: "For poetic souls",
    description: "Let your words dance on the page, weaving stories that enchant and endure.",
    icon: "https://i.postimg.cc/pLj7nNGP/image.png"
  },
  {
    title: "For communication pioneers",
    description: "Deliver messages with clarity and charm, setting new benchmarks for connection.",
    icon: "https://i.postimg.cc/V6fHTJYN/image.png"
  },
  {
    title: "For visionaries with words",
    description: "Bring your thoughts to life with impactful narratives that inspire and resonate.",
    icon: "https://i.postimg.cc/RFgbzvFL/image.png"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <section className="text-center mb-8 sm:mb-16 relative">
          <div className="flex justify-center mb-4 sm:mb-8">
            <Image
              src="https://i.postimg.cc/TY79kPjZ/4905a8c9-6188-4940-9f39-a9b7d63322cf-removalai-preview.png"
              alt="Thakumar Jhuli Logo"
              width={200}
              height={60}
              className="dark:hidden mx-auto"
            />
            <Image
              src="https://i.postimg.cc/t4BxPFmL/0da6b179-e885-46d3-823e-e5e4c295d14b-removalai-preview.png"
              alt="Thakumar Jhuli Logo Dark"
              width={200}
              height={60}
              className="hidden dark:block mx-auto"
            />
          </div>
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-gray-200">About Us</h4>
          <div className="text-sm sm:text-base text-black dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            <p className="mb-2">Thakurmar Jhuli is a beloved collection of Bengali folk tales and fairy tales, curated by Dakshinaranjan Mitra Majumdar. As a child, I used to call Thakurmar Jhuli by the name Thakumar Jhuli. Inspired by that memory, this site has been named Thakumar Jhuli.</p>
            <p className="mb-2">Why? Because this site is here to tell you stories. All you need to do is share what kind of story you're looking for, what sort of tales are spinning in your mind, or what you're imagining. Let us know, and our AI will weave your imagination into words.</p>
            <p className="mb-2">But that's not all—this site isn't just about story generation. It offers so much more: poetry generation, literary analysis (including explanations, summaries, and critiques), philosophical discussions, and a treasure trove of literary resources.</p>
            <p>If you're a literature enthusiast, you've come to the perfect place!</p>
          </div>
          <Link href="#features" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
            Explore Features
          </Link>
        </section>
        
        <section id="features" className="mb-8 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {mainFeatures.map((feature, index) => (
            <Link key={index} href={feature.href} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image src={feature.icon || "/placeholder.svg"} alt={feature.name} width={40} height={40} className="mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white">{feature.name}</h3>
              <p className="text-sm sm:text-base text-black dark:text-gray-300">{feature.description}</p>
            </Link>
          ))}
        </section>

        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-black dark:text-gray-200">Additional Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {additionalFeatures.map((feature, index) => (
              <Link key={index} href={feature.href} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image src={feature.icon || "/placeholder.svg"} alt={feature.name} width={40} height={40} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white">{feature.name}</h3>
                <p className="text-sm sm:text-base text-black dark:text-gray-300">{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-black dark:text-gray-200">Words of Inspiration</h2>
          <ImageCarousel />
        </section>
        
        <section className="mb-8 sm:mb-16">
          <h3 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">For every storyteller, a unique journey awaits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storytellerTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <Image
                    src={type.icon || "/placeholder.svg"}
                    alt={type.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-black dark:text-gray-200">How It Works: Bringing Stories, Ideas, and Creativity to Life</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <Image
                src="https://i.postimg.cc/kgmgs2Pc/footer-image.png"
                alt="How It Works"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-sm sm:text-base text-black dark:text-gray-300 mb-4">
                Our site harnesses the power of advanced AI models to generate creative content. Here's how it works:
              </p>
              <ol className="list-decimal list-inside text-sm sm:text-base text-black dark:text-gray-300 space-y-2">
                <li><b>Pick Your Path:</b> Choose to create, analyze, or roleplay—it is all up to you!</li>
                <li><b>Share Ideas:</b> Give a theme, topic, or prompt to get started.</li>
                <li><b>AI Magic:</b> Sit back as our AI generates poems, stories, or insights instantly.</li>
                <li><b>Interact & Refine:</b> Collaborate, ask questions, or tweak the results your way.</li>
                <li><b>Save & Share:</b> Keep your creations or share them with the world!</li>
              </ol>
              <p className="text-sm sm:text-base text-black dark:text-gray-300 mt-4">
                With Thakumar Jhuli, creativity meets technology, and every click is a step into a world of wonder. 🎭✨
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

