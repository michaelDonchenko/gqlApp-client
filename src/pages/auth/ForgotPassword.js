import React, { useContext, useState } from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { auth } from '../../firebase'
import Alerts from '../../components/Alerts'
import Spinner from '../../components/Spinner'
import { AuthContext } from '../../context/authContext'
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
    margin: '15px 0',
    border: '1px solid',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      width: '90%',
    },
  },
  helperText: {
    color: '#424242',
    margin: '15px 0',
    padding: '10px',
  },
  regularLink: {
    color: 'purple',
    margin: '0 5px',
  },
}))

const ForgotPassword = ({ history }) => {
  const classes = useStyles()
  const { state: contextState } = useContext(AuthContext)
  const { user } = contextState

  if (user) {
    history.push('/')
  }

  const [state, setState] = useState({
    email: '',
    loading: '',
    error: '',
    success: '',
  })

  const { email, error, loading, success } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleErrorClose = () => {
    setState({ ...state, error: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userEmail = email
    setState({ ...state, loading: true })
    try {
      const config = {
        url: `${process.env.REACT_APP_CLIENT_URL}/login`,
        handleCodeInApp: true,
      }

      await auth.sendPasswordResetEmail(email, config)
      setState({
        ...state,
        loading: false,
        error: false,
        email: '',
        success: `Password link was sent to ${userEmail} , please check your mailbox to continue.`,
      })
    } catch (error) {
      console.log(error)
      setState({
        ...state,
        email: '',
        loading: false,
        success: false,
        error: error.message,
      })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.formBlock}>
        <h1>Password Reset</h1>
        <div>
          <p className={classes.helperText}>
            Password reset link will be sent to your mailbox. {<br></br>}{' '}
            *Please Note: The new password you create must be at least 8
            characters long, otherwise you will not be able to login with your
            new password!
          </p>
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
            {success && (
              <Alerts
                type={'success'}
                variable={success}
                // close={handleSuccessClose}
                textColor={'black'}
              />
            )}
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
                startIcon={<SendIcon />}
                variant='contained'
                disabled={success}
              >
                submit
              </Button>
            )}
          </form>
          <p className={classes.helperText}>
            Go back to
            <Link className={classes.regularLink} to='/login'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
