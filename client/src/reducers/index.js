import { combineReducers } from 'redux'

import posts from './posts.mjs'
import authReducer from './auth.js'

export default combineReducers({ posts, authReducer })
