'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Cat } from './cat'
import { useCatChat } from './cat-chat-provider'
import { ChatInput } from './chat-input'

export default function CatChat() {
  const { users, currentUser, messages, sendMessage, updatePosition } =
    useCatChat()
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && currentUser) {
        // Ensure cats stay within bounds when window is resized
        const container = containerRef.current
        const { width, height } = container.getBoundingClientRect()

        if (currentUser.position.x > width - 100) {
          updatePosition(width - 100, currentUser.position.y)
        }

        if (currentUser.position.y > height - 100) {
          updatePosition(currentUser.position.x, height - 100)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentUser, updatePosition])

  // In the CatChat component, add a useEffect to update positions when users state changes
  useEffect(() => {
    if (containerRef.current && users.length > 0) {
      // This will ensure all cats are within the visible area when users list updates
      const container = containerRef.current
      const { width, height } = container.getBoundingClientRect()

      users.forEach(user => {
        if (user.position.x > width - 100 || user.position.y > height - 100) {
          // If a user's cat is outside the visible area, we could adjust it
          // But we'll let the server handle this for consistency
        }
      })
    }
  }, [users])

  // Filter out messages older than 10 seconds
  const recentMessages = messages.filter(
    msg => Date.now() - msg.timestamp < 10000
  )

  const renderCat = useMemo(() => {
    return users.map(user => (
      <Cat
        key={user.id}
        user={user}
        isCurrentUser={currentUser?.id === user.id}
        messages={recentMessages.filter(msg => msg.userId === user.id)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onPositionChange={updatePosition}
      />
    ))
  }, [users, currentUser, recentMessages, updatePosition])

  return (
    <div ref={containerRef} className='pointer-events-none fixed inset-0 z-50'>
      {renderCat}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='pointer-events-auto fixed right-4 bottom-4'
      >
        <ChatInput onSendMessage={sendMessage} disabled={isDragging} />
      </motion.div>
    </div>
  )
}
