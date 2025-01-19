'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function AnimatedLogo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Link href="/" className="relative flex items-center">
      <div className="relative w-[150px] h-[45px]">
        <Image
          src="https://i.postimg.cc/TY79kPjZ/4905a8c9-6188-4940-9f39-a9b7d63322cf-removalai-preview.png"
          alt="Thakumar Jhuli"
          fill
          className={`transition-all duration-500 ${
            theme === 'dark' ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
          }`}
        />
        <Image
          src="https://i.postimg.cc/t4BxPFmL/0da6b179-e885-46d3-823e-e5e4c295d14b-removalai-preview.png"
          alt="Thakumar Jhuli"
          fill
          className={`transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          }`}
        />
      </div>
    </Link>
  )
}

