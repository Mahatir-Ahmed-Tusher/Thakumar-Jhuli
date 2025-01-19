'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

interface NavItem {
  href: string
  label: string
}

interface MobileNavProps {
  items: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50 h-9 w-9 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 top-0 z-40 bg-background/80 backdrop-blur-sm">
          <nav className="fixed top-16 left-0 w-full h-screen bg-white dark:bg-background border-t">
            <div className="container py-4">
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-center p-4 text-lg font-medium text-gray-900 dark:text-gray-100 hover:bg-accent rounded-lg transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

