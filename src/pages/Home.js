import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Users from '../components/homePage/Users'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: { width: '95%' },
    [theme.breakpoints.up('md')]: { width: '1280px', maxWidth: '90%' },
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: '400px',
    border: '2px solid',
    margin: '20px 0',
    padding: '0 0 20px 0',
    borderRadius: '1em',
  },
  heading: {
    color: '#bf80ff',
    backgroundColor: '#e5ccff',
    textShadow: '0 2px 0 #c9c9c9',
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <h1 className={classes.heading}>Welcome to the blog site</h1>
        <Grid container>
          <Grid item md={4} xs={12}>
            <h2>Users</h2>
            <Users />
          </Grid>
          <Grid item md={8} xs={12}>
            <h2>All Posts</h2>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Home
