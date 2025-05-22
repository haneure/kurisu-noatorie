"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate middleware completion (you'll remove this in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            when: "beforeChildren",
          }}
        >
          <BubbleTransition />
          <motion.div
            className="text-white text-2xl font-bold relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Loading your experience...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BubbleTransition() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
          initial={{
            y: "120vh",
            scale: 0.5,
            opacity: 0.3,
          }}
          animate={{
            y: "-120vh",
            scale: [0.5, Math.random() * 1.5 + 0.5],
            opacity: [0.3, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 1,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
