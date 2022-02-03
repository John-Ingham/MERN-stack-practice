import React from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux' //redux hook
import { useState, useEffect } from 'react'
import useStyles from '../../styles'
import { getPosts } from '../../actions/posts'

const Home = () => {
  const classes = useStyles() // allows use of className={classes.xyz}
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          className={classes.mainContainer}
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* ^^  pass props */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
