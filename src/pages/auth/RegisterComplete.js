import React, { useState, useEffect, useContext } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import Alerts from '../../components/Alerts'
import Spinner from '../../components/Spinner'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/authContext'

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
    borderRadius: '9999em',
    margin: '15px 0 30px 0',
    border: '1px solid',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      width: '90%',
    },
  },
  helperText: {
    margin: '15px 0',
    padding: '15px',
  },
}))

const RegisterComplete = ({ history }) => {
  const classes = useStyles()
  const { dispatch, state: contextState } = useContext(AuthContext)
  const { user } = contextState

  if (user) {
    history.push('/')
  }

  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    loading: '',
    error: '',
  })

  const { email, error, password, passwordConfirm, loading } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleErrorClose = () => {
    setState({ ...state, error: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    if (password.length < 8) {
      return setState({
        ...state,
        loading: false,
        error: 'Password has to be at least 8 characters long.',
      })
    }

    if (password !== passwordConfirm) {
      return setState({
        ...state,
        loading: false,
        error: 'The passwords do not match, please try again.',
      })
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)

      if (result.user.emailVerified) {
        //remove email from local storage
        window.localStorage.removeItem('emailForRegistration')
        //get user id token
        let user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()

        //user in context
        //dispatch user with token and email
        //then redirect

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { email: user.email, token: idTokenResult.token },
        })
      }
    } catch (error) {
      setState({ ...state, loading: false, error: error.message })
    }
  }

  useEffect(() => {
    setState({
      ...state,
      email: window.localStorage.getItem('emailForRegistration'),
    })
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.formBlock}>
        <h1>Registraion Complete</h1>
        <div>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <p className={classes.helperText}>
              *Note* Your Email should be auto completed if there is no email
              try to register again
            </p>
            <TextField
              onChange={handleChange}
              value={email}
              className={classes.inputField}
              name='email'
              label='Email'
              type='email'
              disabled
              required
            />
            <TextField
              onChange={handleChange}
              value={password}
              className={classes.inputField}
              name='password'
              label='Password'
              type='password'
              helperText='Enter your Password'
              required
            />
            <TextField
              onChange={handleChange}
              value={passwordConfirm}
              className={classes.inputField}
              name='passwordConfirm'
              label='Password Confirm'
              type='password'
              helperText='Check your Password'
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
              <Button
                className={classes.button}
                type='submit'
                fullWidth
                variant='contained'
              >
                Finish Registration
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
