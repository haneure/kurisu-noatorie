'use client'
import { motion } from 'framer-motion'

type ChatBubbleProps = {
  message: string
  color: string
  isCurrentUser: boolean
}

export function ChatBubble({ message, color, isCurrentUser }: ChatBubbleProps) {
  return (
    <motion.div
      className='mb-2 max-w-full'
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
    >
      <div
        className={`text-foreground relative rounded-xl px-4 py-2 text-sm ${isCurrentUser ? 'font-medium' : 'font-normal'}`}
        style={{
          backgroundColor: color,
          maxWidth: '200px',
          wordBreak: 'break-word'
        }}
      >
        <div
          className='absolute bottom-[-6px] left-[calc(50%-6px)] h-3 w-3 rotate-45'
          style={{ backgroundColor: color }}
        />
        {message}
      </div>
    </motion.div>
  )
}
