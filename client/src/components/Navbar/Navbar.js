import React from 'react'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../assets/memories.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  // console.log(user)

  const logout = () => {
    dispatch({ type: LOGOUT })
    navigate('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token

    // JWT ...

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [user?.token, location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
        </Link>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
