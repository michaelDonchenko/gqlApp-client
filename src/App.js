import React, { useContext } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import background from './images/background01.jpg'
import { makeStyles } from '@material-ui/core'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${background})`,
    minHeight: '100vh',
  },
})

const App = () => {
  const classes = useStyles()

  return (
    <ApolloProvider client={client}>
      <NavBar />
      <main className={classes.root}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route
            path='/complete-registration'
            exact
            component={RegisterComplete}
          />
          <Route path='/forgot-password' exact component={ForgotPassword} />
        </Switch>
      </main>
    </ApolloProvider>
  )
}

export default App
