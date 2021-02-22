import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core'
import Alerts from './Alerts'
import Spinner from './Spinner'

const PasswordDialog = ({
  dialog,
  state,
  setState,
  handleChange,
  password,
  classes,
  passwordConfirm,
  passwordError,
  passwordSuccess,
  passwordLoading,
  handlePasswordUpdate,
}) => {
  return (
    <Dialog
      open={dialog}
      onClose={() => setState({ ...state, dialog: false })}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Do you want to update your password?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <form>
            <TextField
              onChange={handleChange}
              value={password}
              className={classes.inputField}
              name='password'
              label='Password'
              type='password'
              helperText='Enter new password if you want to change it'
            />
            <TextField
              onChange={handleChange}
              value={passwordConfirm}
              className={classes.inputField}
              name='passwordConfirm'
              label='Password Confirm'
              type='password'
              helperText='Check your Password'
            />
            {passwordError && (
              <Alerts
                type={'error'}
                variable={passwordError}
                close={() => setState({ ...state, passwordError: false })}
                textColor={'black'}
              />
            )}
            {passwordSuccess && (
              <Alerts
                type={'success'}
                variable={passwordSuccess}
                close={() => setState({ ...state, passwordSuccess: false })}
                textColor={'black'}
              />
            )}
            {passwordLoading ? (
              <Spinner />
            ) : (
              <Button
                className={classes.passwordButton}
                onClick={handlePasswordUpdate}
                type='submit'
                fullWidth
                variant='contained'
              >
                Update
              </Button>
            )}
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setState({ ...state, dialog: false })}
          color='primary'
        >
          exit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PasswordDialog
