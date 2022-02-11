import axios from 'axios'

// const url = 'http://localhost:5000/posts/' - local dev model
//const url = 'https://mern-stack-memories-practice.herokuapp.com/posts' // live hosted version

const API = axios.create({
  baseURL: 'http://localhost:5000',
  //'https://mern-stack-memories-practice.herokuapp.com',
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const fetchPosts = () => API.get('/posts')

export const makePost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => {
  API.delete(`/posts/${id}`)
}

export const likePost = (id, post) => {
  console.log(id, '<><>In api > like post fn')
  API.patch(`/posts/${id}/likePost`, post)
}

export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)
