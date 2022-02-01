import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../constants/actionTypes'
import * as api from '../api' // import all from api as variable api

//api.fetchPosts
// Create Actions:
// Specifically action creators. An action that creates an action

const getP0sts = () => {
  const action = { type: FETCH_ALL, payload: [] }
  return action
}
// ^^ However, this function needs to be async, as data is async this is where we have to use THUNK.
// NB Syntax is crazy

const getP00sts = () => async (dispatch) => {
  const action = { type: FETCH_ALL, payload: [] }
  dispatch(action)
}
// Okay, now to refactor:

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts() // calls api, saves response as data object
    const action = { type: FETCH_ALL, payload: data }
    dispatch(action)
  } catch (error) {
    console.log(error, 'getPosts error') // NB when doing an error catch, leave as error, not error.message as it will give more info on erorr details
  }
}

export const createPost = (post) => async (dispatch) => {
  console.log(post)
  try {
    const { data } = await api.makePost(post)
    console.log(data, '<<>>DATA')
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error, 'createPost error')
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    console.log({ data })

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error, 'updatePost error')
  }
}
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error, 'deletePost error')
  }
}
export const likePost = (id) => async (dispatch) => {
  //// Works but with error
  try {
    const data = await api.likePost(id)
    console.log(data)

    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    console.log(error, 'likePost error')
  }
}
