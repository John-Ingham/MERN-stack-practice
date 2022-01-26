import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper, Typography } from '@material-ui/core'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'
import { updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({ setCurrentId, currentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null,
  )
  // use selector grab state from store, ternerary,if we have currentId find post with id matching current id

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '', // Matches schema from before
  })

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null) // Resets to not looking at a post
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '', // Resets fields in form to empty
    })
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {' '}
          {currentId ? 'Editing' : 'Creating'} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {' '}
          Submit{' '}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          {' '}
          Clear{' '}
        </Button>
      </form>
    </Paper>
  )
}

export default Form
