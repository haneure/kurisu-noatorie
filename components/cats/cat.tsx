'use client'

import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { CatIcon, PawPrintIcon as Paw } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ChatBubble } from './chat-bubble'

type Message = {
  id: string
  userId: string
  text: string
  timestamp: number
}

type User = {
  id: string
  name: string
  color: string
  position: { x: number; y: number }
}

type CatProps = {
  user: User
  isCurrentUser: boolean
  messages: Message[]
  onDragStart: () => void
  onDragEnd: () => void
  onPositionChange: (x: number, y: number) => void
}

export function Cat({
  user,
  isCurrentUser,
  messages,
  onDragStart,
  onDragEnd,
  onPositionChange
}: CatProps) {
  const { resolvedTheme } = useTheme()

  const boxShadow = isCurrentUser
    ? resolvedTheme === 'dark'
      ? '0 0 10px 2px rgba(140, 231, 219, 0.5)'
      : '0 0 8px 1px rgba(0, 0, 0, 0.3)' // soft black shadow in light mode
    : 'none'

  const x = useMotionValue(user.position.x)
  const y = useMotionValue(user.position.y)

  const [isHovered, setIsHovered] = useState(false)

  // Cat animation values
  const rotation = useTransform(x, latest => (latest % 20) - 10)
  const scale = useTransform(y, latest => 1 + Math.sin(latest * 0.01) * 0.05)

  // Update position when user prop changes (for other users' cats)
  useEffect(() => {
    if (!isCurrentUser) {
      // Animate to the new position for other users' cats
      x.set(user.position.x)
      y.set(user.position.y)
    }
  }, [user.position.x, user.position.y, isCurrentUser, x, y])

  // Update position when dragged
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (x && y) {
      onPositionChange(info.point.x, info.point.y)
      onDragEnd()
    }
  }

  return (
    <motion.div
      className='absolute'
      style={{ x, y, zIndex: 1000 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {/* Cat avatar */}
      <motion.div
        className={`flex h-16 w-16 cursor-grab items-center justify-center rounded-full active:cursor-grabbing ${'pointer-events-auto'}`}
        style={{
          backgroundColor: user.color,
          rotate: rotation,
          scale,
          boxShadow
        }}
        drag={true}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Chat bubbles */}
        <div className='absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2'>
          {messages.map(message => (
            <ChatBubble
              key={message.id}
              message={message.text}
              color={user.color}
              isCurrentUser={isCurrentUser}
            />
          ))}
        </div>

        <CatIcon className='h-10 w-10 text-white' />

        {/* Username */}
        <div className='absolute top-full mt-1 w-full text-center text-xs font-medium'>
          {user.name}
        </div>

        {/* Paw prints animation when moving */}
        {isCurrentUser && isHovered && (
          <motion.div
            className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-400 opacity-70'
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <Paw className='h-4 w-4' />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
