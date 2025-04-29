'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type MouseDrivenTextAnimationProps = {
  texts: string[]
  className?: string
  fontSize?: string
  fontWeight?: string
  color?: string
}

export default function MouseAngleDrivenTextAnimation({
  texts,
  className = ''
}: MouseDrivenTextAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const centerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Set the center point once on mount
    centerRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Calculate angle from center of screen to current mouse position
      const dx = e.clientX - centerRef.current.x
      const dy = e.clientY - centerRef.current.y

      // Change texts based on mouse angle
      // Get angle in degrees (0-360)
      let angle = Math.atan2(dy, dx) * (180 / Math.PI)
      if (angle < 0) angle += 360

      // Map the angle to a text index
      // Divide the circle into equal segments based on number of texts
      const segmentSize = 360 / texts.length
      const newIndex = Math.floor(angle / segmentSize)

      if (newIndex !== currentTextIndex) {
        setCurrentTextIndex(newIndex)
      }
    }

    const handleResize = () => {
      centerRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [texts.length, currentTextIndex])

  return (
    <div className={`${className} relative overflow-hidden`}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          {texts[currentTextIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Optional: Visual indicator of mouse position */}
      <div
        className='pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-pink-500 opacity-50'
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  )
}
