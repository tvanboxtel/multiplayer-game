import openSocket from 'socket.io-client'
export const MOVE_PUCK = 'MOVE_PUCK'
export const PUCK_HAS_MOVED = 'PUCK_HAS_MOVED'
export const PUCK_HIT_GOAL_ONE = 'PUCK_HIT_GOAL_ONE'
export const PUCK_HIT_GOAL_TWO = 'PUCK_HIT_GOAL_TWO'
export const PUCK_HAS_RESET = 'PUCK_HAS_RESET'

const port = process.env.PORT || 'http://localhost:4000'
const socket = openSocket(port)

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

export const puckHitGoalOne = (score) => (dispatch) => {
  socket.emit('puckHitGoalOne', {
    score
  })

  socket.on('updateScoreOne', (score) => {
    dispatch({
      type: PUCK_HIT_GOAL_ONE,
      payload: score
    })
  })
}

export const puckHitGoalTwo = (score) => (dispatch) => {
  socket.emit('puckHitGoalTwo', {
    score
  })

  socket.on('updateScoreTwo', (score) => {
    dispatch({
      type: PUCK_HIT_GOAL_TWO,
      payload: score
    })
  })
}

export const resetPuck = (positionX, positionY, velocityX, velocityY) => (dispatch) => {
  socket.emit('resetPuck', {
    positionX,
    positionY,
    velocityX,
    velocityY
  })

  socket.on('puckHasReset', (positionX, positionY, velocityX, velocityY) => {
    dispatch({
      type: PUCK_HAS_RESET,
      payload: positionX,
      positionY,
      velocityX,
      velocityY
    })
  })
}