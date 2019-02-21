export const MOVE_PUCK = 'MOVE_PUCK'

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
