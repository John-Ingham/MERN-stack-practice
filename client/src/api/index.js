import axios from 'axios'

// const url = 'http://localhost:5000/posts/' - local dev model
const url = 'https://mern-stack-memories-practice.herokuapp.com/posts' // live hosted version

export const fetchPosts = () => axios.get(url)

export const makePost = (newPost) => axios.post(url, newPost)

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost)

export const deletePost = (id) => {
  axios.delete(`${url}/${id}`)
}

export const likePost = (id) => {
  axios.patch(`${url}/${id}/likePost`)
}
