'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

type MouseDrivenTextAnimationProps = {
  texts: string[]
  className?: string
  fontSize?: string
  fontWeight?: string
  color?: string
}

export default function MouseDistanceDrivenTextAnimation({
  texts,
  className = ''
}: MouseDrivenTextAnimationProps) {
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [normalizedDistance, setNormalizedDistance] = useState(0)
  const centerRef = useRef({ x: 0, y: 0 })
  const trailElements = 15
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])

  // Initialize trail positions
  useEffect(() => {
    trailPositions.current = Array(trailElements).fill({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    // Set the center point once on mount
    centerRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    // Calculate max possible distance (corner to center)
    const getMaxDistance = () => {
      const maxX = Math.max(
        window.innerWidth - centerRef.current.x,
        centerRef.current.x
      )
      const maxY = Math.max(
        window.innerHeight - centerRef.current.y,
        centerRef.current.y
      )
      return Math.sqrt(maxX * maxX + maxY * maxY)
    }

    let maxDistance = getMaxDistance()

    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Calculate angle from center of screen to current mouse position
      const dx = e.clientX - centerRef.current.x
      const dy = e.clientY - centerRef.current.y

      // Calculate distance from center
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Normalize distance to 0-1 range
      const normalizedDistance = Math.min(distance / maxDistance, 1)
      setNormalizedDistance(normalizedDistance)

      // Update trail positions
      trailPositions.current = [
        { x: e.clientX, y: e.clientY },
        ...trailPositions.current.slice(0, trailElements - 1)
      ]

      // Map the normalized distance to a text index
      // Divide the distance range into equal segments based on number of texts
      const newIndex = Math.min(
        Math.floor(normalizedDistance * texts.length),
        texts.length - 1
      )

      if (newIndex !== currentTextIndex) {
        setCurrentTextIndex(newIndex)
      }
    }

    const handleResize = () => {
      centerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
      maxDistance = getMaxDistance()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [texts.length, currentTextIndex])

  // Calculate background gradient based on mouse position
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px),
    rgba(236, 72, 153, ${0.2 + normalizedDistance * 0.3}),
    rgba(59, 130, 246, ${0.2 + (1 - normalizedDistance) * 0.3}))`
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={gradientStyle}
    >
      {/* Mouse trail effect */}
      {/* {trailPositions.current.map((pos, index) => (
        <motion.div
          key={`trail-${index}`}
          className='pointer-events-none fixed z-40 rounded-full'
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            backgroundColor: `rgba(236,72,153, ${1 - index / trailElements})`,
            width: `${12 - index * 0.7}px`,
            height: `${12 - index * 0.7}px`
          }}
        />
      ))} */}

      {/* Distance indicator ring */}
      {/* <motion.div
        className='pointer-events-none fixed z-30 rounded-full border-2 border-pink-500/30'
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: `${80 * normalizedDistance + 20}px`,
          height: `${80 * normalizedDistance + 20}px`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.5, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut'
        }}
      /> */}

      {/* Main cursor */}
      {/* <motion.div
        className='pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-pink-500'
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut'
        }}
      /> */}

      {/* Text animation */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: -5,
            scale: 1 + normalizedDistance * 0.1 // Text grows slightly with distance
          }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className='relative z-10 text-center'
          style={{
            textShadow: `0 0 ${10 * normalizedDistance}px ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,0,0,0.2)'}`
          }}
        >
          {texts[currentTextIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
