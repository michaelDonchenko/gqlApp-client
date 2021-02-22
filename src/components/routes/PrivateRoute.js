import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext)
  const { user } = state

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
