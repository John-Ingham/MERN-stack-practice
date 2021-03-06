import mongoose from 'mongoose'

//import posts from '../../client/src/reducers/posts.mjs'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()

    console.log(postMessages)

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body // what comes in from request is saved as `post`

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })

  try {
    await newPostMessage.save() // async so must wait for it

    res.status(201).json(newPostMessage)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// endpoint posts/123
export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with this ID to edit')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  })

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with this ID to delete')

  await PostMessage.findByIdAndRemove(id)

  // console.log(' in the delete function')

  return res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
  const { id } = req.params
  console.log(req.userId)
  if (!req.userId) return res.json({ message: 'Unauthenticated' })

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with this ID to like')

  const post = await PostMessage.findById(id)

  const index = post.likes.findIndex((id) => id === String(req.userId))
  //check if this user has already liked

  if (index === -1) {
    // id not in array = -1
    //like the post
    post.likes.push(req.userId)
  } else {
    //dislike a post - remove like
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  })
  res.json(updatedPost)
}
