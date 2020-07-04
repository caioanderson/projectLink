import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxPromise from 'redux-promise';

import signInReducer from './screens/Signin/signinReducer';

const reduces = combineReducers({
    signIn : signInReducer,
});

const store = createStore(reduces, applyMiddleware(ReduxPromise));

export default store;