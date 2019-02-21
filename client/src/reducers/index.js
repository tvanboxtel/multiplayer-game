import { combineReducers } from 'redux'
import playerOne from './playerOne'
import playerTwo from './playerTwo'
import puck from './puck'

export default combineReducers ({
    playerOne,
    playerTwo,
    puck
})