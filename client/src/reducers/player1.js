import { ADD_PLAYER_ONE } from '../actions/player'

let initialState = {
    testOne: 0,
}


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_PLAYER_ONE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}