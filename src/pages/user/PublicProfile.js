import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PUBLIC_PROFILE } from '../../graphql/queries'
import Spinner from '../../components/Spinner'
import Alerts from '../../components/Alerts'

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
  image: {
    border: '1px solid',
    [theme.breakpoints.down('xs')]: { maxWidth: '80%', heading: '200px' },
    [theme.breakpoints.up('sm')]: { maxWidth: '100%', height: '350px' },
    boxShadow:
      'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  },
  userDetailsDiv: {
    padding: '10px',
  },
  underLine: {
    textDecoration: 'underLine',
  },
}))

const PublicProfile = () => {
  const classes = useStyles()
  const params = useParams()
  const { email } = params

  const { data: userData, loading: userLoading, error: userError } = useQuery(
    PUBLIC_PROFILE,
    {
      variables: { email },
    }
  )

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <h2 className={classes.underLine}>
          {userData && userData.publicProfile.username}
        </h2>
        <Grid container>
          <Grid item md={5} xs={12}>
            {userLoading && <Spinner />}
            {userError && (
              <Alerts
                type={'error'}
                variable={userError.message}
                textColor={'black'}
              />
            )}
            <div className={classes.userDetailsDiv}>
              <img
                className={classes.image}
                src={userData && userData.publicProfile.images[0].url}
              />
              <h4>{userData && userData.publicProfile.email}</h4>

              <p>{userData && userData.publicProfile.about}</p>
            </div>
          </Grid>
          <Grid item md={7} xs={12}></Grid>
        </Grid>
      </div>
    </div>
  )
}

export default PublicProfile
