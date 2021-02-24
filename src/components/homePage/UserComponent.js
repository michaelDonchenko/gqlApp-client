import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderColor: 'black',
    borderRadius: '1rem',
    margin: '15px 10px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
    backgroundColor: 'white',
    boxShadow:
      'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    color: 'black',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  img: {
    height: '90px',
    [theme.breakpoints.down('sm')]: { height: '60px' },
    marginRight: '15px',
    borderColor: 'black',
    boxShadow:
      'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  },
  detailsDiv: {
    overflowX: 'hidden',
  },
}))

const UserComponent = ({ user }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.img} src={user.images[0].url} atl='user image' />
      <div style={{ flex: 1 }}>{/* flex1 div */}</div>
      <div className={classes.detailsDiv}>
        <p style={{ fontWeight: '600', textDecoration: 'underline' }}>
          {user.username}
        </p>
        <p style={{ fontSize: '14px' }}>{user.email}</p>
      </div>
    </div>
  )
}

export default UserComponent
