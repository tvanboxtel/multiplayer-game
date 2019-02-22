import { MOVE_PUCK } from '../actions/puck'
import { PUCK_HAS_RESET } from '../actions/puck'
import { WIDTH, HEIGHT } from "../components/PlayingFieldContainer";

const puck = {
    positionX: WIDTH / 2,
    positionY: HEIGHT / 2,
    mass: 15,
    velocityX: 0,
    velocityY: 0,
    frictionX: 1,
    frictionY: 1,
    acceleration: 1,
    puckSize: 25,
};

export default (state = puck, action = {}) => {
    switch (action.type) {
        case MOVE_PUCK:
            return {
                ...state,
                ...action.payload
            }
        case PUCK_HAS_RESET:
        return {
            ...state,
            ...action.payload
        }
        default:
            return state;
    }
}