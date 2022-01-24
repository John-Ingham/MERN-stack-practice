import express from 'express'

import { getPosts, createPost } from '../controllers/posts.js' //NB do not forget .js suffix as needed

const router = express.Router()

router.get('/', getPosts)
router.get('/', createPost)

export default router
