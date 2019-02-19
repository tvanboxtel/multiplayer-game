import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:4000')


function connect(cb) {

    socket.on('chat', (message) => {
    
        cb(message)
    })
    
}

connect(message => {console.log(message)})

export { connect }
// const socket = new SocketIO()

// SocketIo(socket)