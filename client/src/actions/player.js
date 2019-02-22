import openSocket from 'socket.io-client'
const port = process.env.PORT || 'http://localhost:4000'
const socket = openSocket(port)

export const ADD_PLAYER = 'ADD_PLAYER'
export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE'

export const PLAYER_ONE_MOVED = 'PLAYER_ONE_MOVED'
export const PLAYER_TWO_MOVED = 'PLAYER_TWO_MOVED'

export const MOVE_PLAYER_ONE = 'MOVE_PLAYER_ONE'
export const MOVE_PLAYER_TWO = 'MOVE_PLAYER_TWO'

// export const addPlayer = name => {
//     return {
//         type: ADD_PLAYER,
//         name
//     };
// }

// export const updatePlayerScore = (index, score)  => {
//     return {
//       type: UPDATE_PLAYER_SCORE,
//       index,
//       score
//    };
//  };

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