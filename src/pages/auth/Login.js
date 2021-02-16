import React, { useState, useContext } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import { AuthContext } from '../../context/authContext'
import Alerts from '../../components/Alerts'
import Spinner from '../../components/Spinner'
import { auth, googleAuthProvider } from '../../firebase'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  formBlock: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: { width: '90%' },
    [theme.breakpoints.up('sm')]: { width: '500px' },
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    minHeight: '400px',
    border: '2px solid',
    margin: '20px 0',
    padding: '0 0 20px 0',
    borderRadius: '1em',
  },
  inputField: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    marginBottom: '20px',
    width: '90%',
    margin: '15px 0',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    width: '90%',
    margin: '15px 0',
    border: '1px solid',
    borderRadius: '9999em',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      width: '90%',
    },
  },
  googleButton: {
    backgroundColor: '#fff59d',
    color: 'black',
    width: '90%',
    margin: '15px 0',
    border: '1px solid',
    borderRadius: '9999em',
    '&:hover': {
      backgroundColor: '#fff59d',
      color: 'black',
      width: '90%',
    },
  },
  regularLink: {
    color: 'purple',
    margin: '0 5px',
  },
}))

const Login = ({ history }) => {
  const classes = useStyles()
  const { dispatch, state: contextState } = useContext(AuthContext)
  const { user } = contextState

  if (user) {
    history.push('/')
  }

  const [state, setState] = useState({
    email: '',
    password: '',
    loading: '',
    error: '',
  })

  const { email, error, password, loading } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleErrorClose = () => {
    setState({ ...state, error: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      if (password.length < 8) {
        return setState({
          ...state,
          loading: false,
          error: 'Password has to be at least 8 characters long.',
        })
      }

      const res = await auth.signInWithEmailAndPassword(email, password)
      const { user } = res

      const idTokenResult = await user.getIdTokenResult()

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.message })
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      const res = await auth.signInWithPopup(googleAuthProvider)
      const { user } = res

      const idTokenResult = await user.getIdTokenResult()

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.message })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.formBlock}>
        <h1>Login</h1>
        <div>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              onChange={handleChange}
              value={email}
              className={classes.inputField}
              name='email'
              label='Email'
              type='email'
              helperText='Enter your email'
              required
            />

            <TextField
              onChange={handleChange}
              value={password}
              className={classes.inputField}
              name='password'
              label='Password'
              type='password'
              helperText='Enter your password'
              required
            />

            {error && (
              <Alerts
                type={'error'}
                variable={error}
                close={handleErrorClose}
                textColor={'black'}
              />
            )}

            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button
                  className={classes.button}
                  startIcon={<EmailIcon />}
                  type='submit'
                  variant='contained'
                >
                  Email/Password
                </Button>

                <Button
                  className={classes.googleButton}
                  type='submit'
                  variant='contained'
                  onClick={handleGoogleLogin}
                >
                  <i
                    className='fab fa-google'
                    style={{ marginRight: '8px', fontSize: '1.2rem' }}
                  ></i>{' '}
                  Google Login
                </Button>
              </>
            )}
          </form>
          <p className={classes.helperText}>
            <Link className={classes.regularLink} to='/forgot-password'>
              Forgot password?
            </Link>
          </p>
          <p className={classes.helperText}>
            Don't have an account?
            <Link className={classes.regularLink} to='/register'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
