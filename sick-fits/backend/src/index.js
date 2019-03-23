require('dotenv').config()
const createServer = require('./createServer')
const { db } = require('./db')

const server = createServer()
server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
},
({ port, ...args }) => {
  console.log(`server is now running on port ${port}`, { args })
}
)
