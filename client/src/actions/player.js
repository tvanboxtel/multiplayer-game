// import * as request from 'superagent'

export const MOVE_PLAYER_ONE = 'MOVE_PLAYER_ONE'
export const MOVE_PLAYER_TWO = 'MOVE_PLAYER_TWO'

// const baseUrl = 'http://localhost:4000'

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

// export const updatePlayerPosition = (position) => {

// }
