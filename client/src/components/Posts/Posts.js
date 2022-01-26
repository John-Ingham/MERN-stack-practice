import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

//This function needs to get the data from the global redux store // useSelector
const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles()

  //check getting posts:
  // console.log(posts)
  return !posts.length ? (
    <CircularProgress /> //loading spinner
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {/* {console.log(posts, '<<<<<<<<<')} */}
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
          {/* ... ^^ pass props here with post, prop-drilling here with setCurrentId  */}
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

// React fragments to add multiple instance of a component <> </>, in this case <Post />
