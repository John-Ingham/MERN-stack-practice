// Middleware for auth

import jwt from 'jsonwebtoken'

// User story:
// User wants to like a post
// click the `like` button => auth middleware (next) => like controller ...

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    //get auth array, split it, token is at index 1 after split

    const isCustomAuth = token.length < 500
    // if token length is <500 is own custom token, if longer it is google-auth token

    let decodedData

    if (token && isCustomAuth) {
      // if have token and it's own token
      decodedData = jwt.verify(token, 'test')

      req.userId = decodedData?.id
    } else {
      //else is google-auth token
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
      // sub is a google differentitating id for a unique user
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
