import React from 'react'
import { Alert } from '@material-ui/lab'

const Alerts = ({ type, variable, close, textColor }) => {
  return (
    <Alert
      severity={type}
      style={{
        margin: '15px 10px',
        padding: '10px',
        color: textColor,
      }}
      onClose={close}
    >
      {variable}
    </Alert>
  )
}

export default Alerts
