'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { reviewBook } from '../actions/review-book'

export default function BookReview() {
  const [bookTitle, setBookTitle] = useState('')
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleReview = async () => {
    setIsLoading(true)
    try {
      const result = await reviewBook(bookTitle)

      if (result.success && result.review) {
        setReview(result.review)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to get book review. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Book review error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Book Review</CardTitle>
          <CardDescription>Get a review for a specific book</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bookTitle">Book Title</Label>
            <Input
              id="bookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Enter the book title"
            />
          </div>
          <Button 
            onClick={handleReview} 
            disabled={isLoading || !bookTitle}
          >
            Get Book Review
          </Button>
        </CardContent>
      </Card>

      {review && (
        <Card>
          <CardHeader>
            <CardTitle>Book Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{review}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

