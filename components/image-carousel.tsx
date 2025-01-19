"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  {
    url: "https://i.postimg.cc/nVGNvzpv/brandon.png",
    author: "Brandon Sanderson",
    quote: "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon."
  },
  {
    url: "https://i.postimg.cc/HsWR3gkF/jhumpa.jpg",
    author: "Jhumpa Lahiri",
    quote: "That's the thing about books. They let you travel without moving your feet."
  },
  {
    url: "https://i.postimg.cc/9FxSnn40/Martin.png",
    author: "George R.R. Martin",
    quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one."
  },
  {
    url: "https://i.postimg.cc/vZcjFt9z/nietzchsche.png",
    author: "Friedrich Nietzsche",
    quote: "I know of no better life purpose than to perish in attempting the great and the impossible."
  }
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.author}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="text-lg md:text-xl font-serif italic mb-2">&quot;{image.quote}&quot;</p>
              <p className="text-sm md:text-base font-medium">- {image.author}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

