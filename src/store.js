import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const userReducer = (state = [], action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const reducer = combineReducers({
    user: userReducer
})

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;