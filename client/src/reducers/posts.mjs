//reducers
//reducer is a function

const CREATE = 'CREATE'
const FETCH_ALL = 'FETCH_ALL'
const DELETE = 'DELETE'
const LIKE = 'LIKE'
const UPDATE = 'UPDATE'

const reduc3r = (state, action) => {
  if (action.type === CREATE) {
    //do stuff
    // return ...
    //usually change the state based on the action
  }
  // Can end up with a lot of if statements
  // NB spelt it reduc3r to prevent declaring same variable twice
}
export default (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((post) => post._id !== action.payload)
    case FETCH_ALL:
      return action.payload // action.payload is what is returned
    case CREATE:
      //console.log('<<<<In create function reducer')
      return [...posts, action.payload]
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      )
    // ternerary: if post id and payload id match then update with payload, else return post.

    default:
      return posts
  }
}

//Above is this (below) but refactored)
const reduc33r = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return state
    case 'CREATE':
      return state

    default:
      return state
  }
}
// module.exports = posts
