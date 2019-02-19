import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'

const reducer = combineReducers(reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


// ?????
// const socket = new SocketIO()

const enhancer = composeEnhancers(
    applyMiddleware(ReduxThunk)
)
const store = createStore(reducer, enhancer)

export default store