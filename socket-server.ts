// socket-server.ts
import http from "http"
import { Server } from "socket.io"

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: "https://socket.kurisu.noatorie.com",
    methods: ["GET", "POST"],
    credentials: true
  },
})

const users: Record<string, any> = {}
const messages: any[] = []

// Generate a random color
function getRandomColor() {
  const colors = [
    "#FF5733",  // reddish-orange
    "#33FF57",  // green
    "#3357FF",  // blue
    "#FF33F5",  // magenta
    "#33FFF5",  // cyan
    "#FF5733",  // reddish-orange (duplicate)
    "#C70039",  // deep red
    "#900C3F",  // dark red-purple
    "#581845",  // deep purple
    "#F5FF33", // A light yellow-green
    "#FFC300", // A bright yellow / golden yellow
    "#DAF7A6", // A light green / pastel yellow-green
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Generate a random cat name
function getRandomCatName() {
  const prefixes = ["Fluffy", "Whiskers", "Shadow", "Luna", "Mittens", "Oreo", "Tiger", "Smokey", "Ginger", "Patches"]
  const suffixes = ["Paws", "Purr", "Meow", "Kitty", "Cat", "Whisker", "Tail", "Fur", "Claw", "Beans"]

  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }`
}

// Generate random position within viewport
function getRandomPosition() {
  // Use a reasonable default size that works on most screens
  const x = Math.floor(Math.random() * 800)
  const y = Math.floor(Math.random() * 500)
  return { x, y }
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  const user = {
    id: socket.id,
    name: getRandomCatName(),
    color: getRandomColor(),
    position: getRandomPosition(),
  }

  users[socket.id] = user

  socket.emit("users", Object.values(users))
  socket.emit("messages", messages)
  socket.emit("user:joined", user)
  socket.broadcast.emit("users", Object.values(users))

  socket.on("message:send", (data) => {
    const message = {
      id: Date.now().toString(),
      userId: socket.id,
      text: data.text,
      timestamp: Date.now(),
    }

    messages.push(message)
    if (messages.length > 100) messages.shift()

    io.emit("message:new", message)
  })

  socket.on("user:move", (position) => {
    if (users[socket.id]) {
      users[socket.id].position = position
      io.emit("users", Object.values(users))
    }
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
    delete users[socket.id]
    io.emit("users", Object.values(users))
  })
})

server.listen(4000, () => {
  console.log("✅ Socket.IO server listening on http://localhost:4000")
})
