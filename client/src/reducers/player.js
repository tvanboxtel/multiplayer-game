import { MOVE_PLAYER } from '../actions/player'

export default (state = 'I am the default state', action = {}) => {
    switch (action.type) {
        case MOVE_PLAYER :
            return state = action.player

        default:
            return state;
    }
}