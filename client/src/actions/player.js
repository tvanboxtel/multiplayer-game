// import * as request from 'superagent'

export const MOVE_PLAYER = 'MOVE_PLAYER'

// const baseUrl = 'http://localhost:4000'

// Currently called player, should contain
// velocities + positions
// export function movePlayer(velocityX) {
//     console.log(velocityX)
//     return {
        
//         type: MOVE_PLAYER,
//         payload: velocityX
//     }
// }

export const movePlayer = (positionX, positionY, velocityX, velocityY) => {
    return {
      type: MOVE_PLAYER,
      payload: 
      positionX,
      positionY,
      velocityX,
      velocityY
    }
  }

// export const updatePlayerPosition = (position) => {

// }
