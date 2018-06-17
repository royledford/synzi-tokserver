const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const PORT = process.env.PORT || 4001
const INDEX = path.join(__dirname, 'index.html')

// const app = express()

// our server instance
// const server = http.createServer(app)

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

// This creates our socket using the instance of the server
const io = socketIO(server)

io.on('connection', socket => {
  console.log('New client connected')

  socket.on('TICKLE', name => {
    console.log('tickle: ', name)
    io.sockets.emit('INCOMING-CALL', name)
  })

  socket.on('CANCEL-CALL', name => {
    console.log('CANCEL-CALL:')
    io.sockets.emit('CALL-CANCELED', name)
  })

  socket.on('IGNORE-CALL', name => {
    console.log('IGNORE-CALL:')
    io.sockets.emit('CALL-IGNORED', name)
  })

  socket.on('ANSWER-CALL', name => {
    console.log('ANSWER-CALL:')
    io.sockets.emit('CALL-ACCEPTED', name)
  })

  socket.on('HANGUP', name => {
    console.log('HANGUP:')
    io.sockets.emit('CALL-COMPLETE', name)
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// server.listen(port, () => console.log(`Listening on port ${port}`))
