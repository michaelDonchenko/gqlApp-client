import { CircularProgress } from '@material-ui/core'
import React from 'react'

const Spinner = () => {
  return (
    <div style={{ margin: '15px 0', textAlign: 'center' }}>
      <CircularProgress />
    </div>
  )
}

export default Spinner
