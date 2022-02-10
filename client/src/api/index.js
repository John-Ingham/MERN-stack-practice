import axios from 'axios'

// const url = 'http://localhost:5000/posts/' - local dev model
//const url = 'https://mern-stack-memories-practice.herokuapp.com/posts' // live hosted version

const API = axios.create({
  baseURL: 'https://mern-stack-memories-practice.herokuapp.com',
})

export const fetchPosts = () => API.get('/posts')

export const makePost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => {
  API.delete(`/posts/${id}`)
}

export const likePost = (id) => {
  API.patch(`/posts/${id}/likePost`)
}

export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)
