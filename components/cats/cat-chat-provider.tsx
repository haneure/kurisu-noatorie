'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import CatChat from './cat-chat'

// Define types for our context
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

type CatChatContextType = {
  socket: Socket | null
  users: User[]
  messages: Message[]
  currentUser: User | null
  sendMessage: (text: string) => void
  updatePosition: (x: number, y: number) => void
}

// Create context
const CatChatContext = createContext<CatChatContextType>({
  socket: null,
  users: [],
  messages: [],
  currentUser: null,
  sendMessage: () => {},
  updatePosition: () => {}
})

export const useCatChat = () => useContext(CatChatContext)

export function CatChatProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
          withCredentials: true,
      }
    )
    setSocket(socketInstance)

    // Socket event handlers
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
      setIsConnected(false)
    })

    socketInstance.on('users', (serverUsers: User[]) => {
      console.log('User Edited')
      console.log('Users:', serverUsers)
      setUsers([...serverUsers])
    })

    socketInstance.on('user:joined', (user: User) => {
      setCurrentUser(user)
    })

    socketInstance.on('messages', (serverMessages: Message[]) => {
      setMessages(serverMessages)
    })

    socketInstance.on('message:new', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    // Clean up on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Send a new message
  const sendMessage = (text: string) => {
    if (socket && currentUser) {
      socket.emit('message:send', { text })
    }
  }

  // Update user position
  const updatePosition = (x: number, y: number) => {
    if (socket && currentUser) {
      // Immediately update local state for smooth UI
      console.log('ini users ' + JSON.stringify(users))
      setUsers(prevUsers => {
        console.log('prev users ' + JSON.stringify(prevUsers))
        return prevUsers.map(user =>
          user.id === currentUser.id ? { ...user, position: { x, y } } : user
        )
      })

      console.log('Updating position:', { x, y })
      socket.emit('user:move', { x, y })
    }
  }

  return (
    <CatChatContext.Provider
      value={{
        socket,
        users,
        messages,
        currentUser,
        sendMessage,
        updatePosition
      }}
    >
      {children}
      {isConnected && <CatChat />}
    </CatChatContext.Provider>
  )
}
