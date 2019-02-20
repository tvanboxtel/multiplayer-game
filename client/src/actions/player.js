// import * as request from 'superagent'

export const MOVE_PLAYER = 'MOVE_PLAYER'

// const baseUrl = 'http://localhost:4000'

// Currently called player, should contain
// velocities + positions
export function movePlayer(player) {
    console.log('being called')
    return {
        type: MOVE_PLAYER,
        payload: player
    }
}

// export const updatePlayerPosition = (position) => {

// }
