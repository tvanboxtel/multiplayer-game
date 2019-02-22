import { MOVE_PLAYER_TWO } from '../actions/player'
import { PLAYER_TWO_MOVED } from '../actions/player'
import { WIDTH, HEIGHT } from "../components/PlayingFieldContainer";
import { PUCK_HIT_GOAL_TWO } from  '../actions/puck'

const playerTwo = {
    positionX: WIDTH / 1.25,
    positionY: HEIGHT / 2,
    mass: 15,
    velocityX: 0,
    velocityY: 0,
    frictionX: 1,
    frictionY: 1,
    acceleration: 1,
    puckSize: 52,
    score: 0
};

export default (state = playerTwo, action = {}) => {
    switch (action.type) {
        case MOVE_PLAYER_TWO:
            return {
                ...state,
                ...action.payload
            }

        case PLAYER_TWO_MOVED:
            return {
                ...state,
                ...action.payload
            }

        case PUCK_HIT_GOAL_TWO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}