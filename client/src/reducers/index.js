import { combineReducers } from 'redux'
import playerOne from './playerOne'
import playerTwo from './playerTwo'
import puck from './puck'
import player1 from './player1'

export default combineReducers ({
    player1,
    playerOne,
    playerTwo,
    puck
})