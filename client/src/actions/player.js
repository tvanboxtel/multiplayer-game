import openSocket from 'socket.io-client'
import store from '../store';
// import store from '../store';
const port = process.env.PORT || 'http://localhost:4000'
const socket = openSocket(port)

export const ADD_PLAYER_ONE = 'ADD_PLAYER_ONE'
export const ADD_SCORE = 'ADD_SCORE'


export const MOVE_PLAYER_ONE = 'MOVE_PLAYER_ONE'
export const MOVE_PLAYER_TWO = 'MOVE_PLAYER_TWO'

export const addPlayerOne = (positionX, positionY, velocityX, velocityY) => (dispatch) => {
    socket.emit('addPlayerOne', {
        positionX,
        positionY,
        velocityX,
        velocityY
    })

    dispatch({
        type: ADD_PLAYER_ONE,
        payload: Number
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
