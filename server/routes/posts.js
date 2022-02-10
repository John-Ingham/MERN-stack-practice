import express from 'express'
import auth from '../middleware/auth.js'

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js' //NB do not forget .js suffix as needed in Node / can be dropped in react

const router = express.Router()

router.get('/', getPosts)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router
