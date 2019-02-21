import openSocket from 'socket.io-client'
export const MOVE_PUCK = 'MOVE_PUCK'
export const PUCK_HAS_MOVED = 'PUCK_HAS_MOVED'
const port = process.env.PORT || 'http://localhost:4000'
const socket = openSocket(port)


// const baseUrl = 'http://localhost:4000'

export const movePuck = (positionX, positionY, velocityX, velocityY) => {
  return {
    type: MOVE_PUCK,
    payload:
      positionX,
    positionY,
    velocityX,
    velocityY
  }
}

export const updatePuckMove = (positionX, positionY, velocityX, velocityY) => (dispatch) => {
  socket.emit('updatePuckMove', {
    positionX,
    positionY,
    velocityX,
    velocityY
  })

  socket.on('puckHasMoved', (positionX, positionY, velocityX, velocityY) => {

    dispatch({
      type: PUCK_HAS_MOVED,
      payload:
        positionX,
      positionY,
      velocityX,
      velocityY
    })

  })
}
