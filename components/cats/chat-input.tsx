'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

type ChatInputProps = {
  onSendMessage: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2 rounded-full bg-white p-2 shadow-lg dark:bg-gray-800'
    >
      <Input
        type='text'
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='Meow something...'
        className='rounded-full border-none focus-visible:ring-1 focus-visible:ring-offset-0'
        disabled={disabled}
      />
      <Button
        type='submit'
        size='icon'
        className='rounded-full'
        disabled={!message.trim() || disabled}
      >
        <Send className='h-4 w-4' />
      </Button>
    </form>
  )
}
