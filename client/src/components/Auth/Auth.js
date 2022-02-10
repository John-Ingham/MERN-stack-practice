import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  let navigate = useNavigate()
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
      // redux action
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup) // resets between on and off like a switch
    setShowPassword(false) //resets showPassword
  }

  const googleSuccess = async (res) => {
    console.log(res)
    const result = res?.profileObj // .? will prevent an error if we don't have the res, will simply return undefined
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google login was unsuccessful. Try again later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Sign Up' : ' Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label=" Repeat Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            clientId="366346737804-g9cmvb5f2t3vg0lunbtpaj1ggum1nj9c.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess} //function to handle google login response
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? - Sign In'
                  : "Don't have an account yet? - Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
