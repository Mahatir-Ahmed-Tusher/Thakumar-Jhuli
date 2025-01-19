import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedLogo } from '@/components/animated-logo'
import { MobileNav } from '@/components/mobile-nav'
import { getSiteUrl } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Facebook, Instagram, Twitter, Github } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thakumar Jhuli - AI Storytelling Assistant',
  description: 'Your imagination, Our story - Generate creative stories with AI',
}

const mainFeatures = [
  { href: "/stories", label: "Generate Stories" },
  { href: "/poetry", label: "Generate Poetry" },
  { href: "/literature-analysis", label: "Analysis" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/ai-thakuma-story", label: "AI Thakuma's Story" },
  { href: "/ai-writing-enhancer", label: "AI Writing Enhancer" },
  { href: "/ai-roleplaying", label: "AI Roleplaying" },
]

const additionalFeatures = [
  { href: "/scientific-article", label: "Scientific Article Writing" },
  { href: "/email-generator", label: "Email Generator" },
  { href: "/social-media", label: "Social Media Assistance" },
  { href: "/grammar-checker", label: "Grammar & Style Checker" },
  { href: "/ai-coach", label: "AI Writing Coach" },
  { href: "/paraphraser", label: "Paraphraser" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = getSiteUrl()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 text-white shadow-lg sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center flex-1">
                    <AnimatedLogo />
                    <nav className="hidden md:flex items-center space-x-4 ml-4">
                      <Link href="/" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                        Home
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                          Main Features <ChevronDown className="ml-1 h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {mainFeatures.map((feature) => (
                            <DropdownMenuItem key={feature.href}>
                              <Link href={feature.href} className="w-full">
                                {feature.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                          Additional Features <ChevronDown className="ml-1 h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {additionalFeatures.map((feature) => (
                            <DropdownMenuItem key={feature.href}>
                              <Link href={feature.href} className="w-full">
                                {feature.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </nav>
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <div className="flex items-center">
                      <ThemeToggle />
                    </div>
                    <div className="md:hidden">
                      <MobileNav items={[...mainFeatures, ...additionalFeatures]} />
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-grow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <footer className="bg-gray-800 dark:bg-gray-900 text-white">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About Thakumar Jhuli</h3>
                    <p className="text-sm text-gray-300">
                      Thakumar Jhuli is an AI-powered storytelling assistant that brings your imagination to life. Create stories, poetry, and explore the world of literature with our innovative tools.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><Link href="/" className="text-sm text-gray-300 hover:text-white">Home</Link></li>
                      <li><Link href="/stories" className="text-sm text-gray-300 hover:text-white">Generate Stories</Link></li>
                      <li><Link href="/poetry" className="text-sm text-gray-300 hover:text-white">Generate Poetry</Link></li>
                      <li><Link href="/literature-analysis" className="text-sm text-gray-300 hover:text-white">Literature Analysis</Link></li>
                      <li><Link href="/meet-the-developer" className="text-sm text-gray-300 hover:text-white">Meet the Developer</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                        <Twitter className="h-6 w-6" />
                        <span className="sr-only">Twitter</span>
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-300">Share Thakumar Jhuli:</p>
                      <div className="flex space-x-2 mt-2">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Facebook</a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent('Check out Thakumar Jhuli - AI Storytelling Assistant')}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white px-2 py-1 rounded text-xs">Twitter</a>
                        <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(siteUrl)}&title=${encodeURIComponent('Thakumar Jhuli - AI Storytelling Assistant')}`} target="_blank" rel="noopener noreferrer" className="bg-orange-600 text-white px-2 py-1 rounded text-xs">Reddit</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
                  <p className="text-sm text-gray-300">© 2025 Thakumar Jhuli. All rights reserved. Developed by Mahatir Ahmed Tusher</p>
                  <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

