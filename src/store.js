import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { destinationReducer } from './reducers/destinationReducer'
import { originReducer } from './reducers/originReducer'
import { tripsReducer } from './reducers/tripsReducer'


const initState = {
    trips: {
        data: [],
        isLoading: false,
        error: ''
    },
    origin: null,
    destination: null
}

const reducer = combineReducers({
    trips: tripsReducer,
    origin: originReducer,
    destination: destinationReducer
})

export const store = createStore(
    reducer,
    initState,
    applyMiddleware(thunk)
)
