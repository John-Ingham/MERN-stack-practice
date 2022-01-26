import { combineReducers } from 'redux'
import { reducer } from './posts' //?

import posts from './posts'

export default combineReducers({
  posts,
})
