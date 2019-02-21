import openSocket from 'socket.io-client'
const port = process.env.PORT || 'http://localhost:4000'
const socket = openSocket(port)

export const ADD_PLAYER_ONE = 'ADD_PLAYER_ONE'
export const ADD_SCORE = 'ADD_SCORE'

export const PLAYER_ONE_MOVED = 'PLAYER_ONE_MOVED'
export const PLAYER_TWO_MOVED = 'PLAYER_TWO_MOVED'

export const MOVE_PLAYER_ONE = 'MOVE_PLAYER_ONE'
export const MOVE_PLAYER_TWO = 'MOVE_PLAYER_TWO'

export const movePlayer1 = (positionX, positionY, velocityX, velocityY) => (dispatch) => {
    socket.emit('movePlayer1', {
        positionX,
        positionY,
        velocityX,
        velocityY
    })

    socket.on('playerOneMoved', (positionX, positionY, velocityX, velocityY) => {

        dispatch({
            type: PLAYER_ONE_MOVED,
            payload:
                positionX,
            positionY,
            velocityX,
            velocityY
        })

    })
}

export const movePlayerOne = (positionX, positionY, velocityX, velocityY) => {
    return {
        type: MOVE_PLAYER_ONE,
        payload:
            positionX,
        positionY,
        velocityX,
        velocityY

    }
}


export const movePlayer2 = (positionX, positionY, velocityX, velocityY) => (dispatch) => {
    socket.emit('movePlayer2', {
        positionX,
        positionY,
        velocityX,
        velocityY
    })

    socket.on('playerTwoMoved', (positionX, positionY, velocityX, velocityY) => {

        dispatch({
            type: PLAYER_TWO_MOVED,
            payload:
                positionX,
            positionY,
            velocityX,
            velocityY
        })

    })
}

export const movePlayerTwo = (positionX, positionY, velocityX, velocityY) => {
    return {
        type: MOVE_PLAYER_TWO,
        payload:
            positionX,
        positionY,
        velocityX,
        velocityY
    }
}