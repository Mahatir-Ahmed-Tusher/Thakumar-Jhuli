'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

export default function MeetTheDeveloperPage() {
  useEffect(() => {
    const glitchEffect = () => {
      const text = document.querySelector('.glitch-text') as HTMLElement
      if (text) {
        const originalText = text.innerText
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________'
        
        let interval = setInterval(() => {
          text.innerText = text.innerText.split('').map((char, index) => {
            if (Math.random() < 0.1) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return originalText[index]
          }).join('')
        }, 50)

        setTimeout(() => {
          clearInterval(interval)
          text.innerText = originalText
        }, 2000)
      }
    }

    const intervalId = setInterval(glitchEffect, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
      <div className="max-w-2xl p-8 text-center">
        <div className={styles.imageContainer}>
          <Image
            src="https://i.postimg.cc/ZR2Nj6mR/8392549c-71e6-4742-969f-95e0aa09cf60-removalai-preview.png"
            alt="Developer Profile"
            width={200}
            height={200}
            className={styles.glitchImage}
          />
        </div>
        <h1 className="text-4xl font-mono mb-8 glitch-text">Meet the Developer</h1>
        <pre className="text-left whitespace-pre-wrap font-mono text-sm">
          {`
Hello, I am Mahatir Ahmed Tusher, a lowkey dedicated developer with a deep passion for problem-solving. My professional pursuits revolve around coding, tackling complex mathematical puzzles, and engaging in intellectual challenges. Outside of my technical work, I enjoy exploring new destinations and indulging in my fascination with astronomy, often finding solace in the vastness of the universe. My commitment to continuous learning and innovation drives me to constantly enhance my skills and contribute to the field of technology.
          `}
        </pre>
        <div className="mt-8">
          <Link 
            href="https://www.linkedin.com/in/mahatir-ahmed-tusher-062902227/?trk=public_profile_browsemap&originalSubdomain=bd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Connect on LinkedIn
          </Link>
        </div>
      </div>
    </div>
  )
}

