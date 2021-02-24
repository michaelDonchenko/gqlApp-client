import React, { useMemo, useState } from 'react'
import { ALL_USERS } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import UserComponent from './UserComponent'
import Spinner from '../Spinner'
import Alerts from '../Alerts'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: { maxHeight: '310px' },
    [theme.breakpoints.up('md')]: {
      borderRight: '2px solid',
    },
    overflowY: 'scroll',
    maxHeight: '510px',
  },
  link: {
    textDecoration: 'none',
  },
}))

const Users = () => {
  const classes = useStyles()
  const { data, loading, error } = useQuery(ALL_USERS)

  const [state, setState] = useState({
    allUsers: '',
    usersError: '',
  })

  const { allUsers, usersError } = state

  useMemo(() => {
    if (data) {
      return setState({ ...state, allUsers: data.allUsers })
    }
    if (error) {
      return setState({ ...state, usersError: error })
    }
  }, [data])

  return (
    <div className={classes.root}>
      {loading && <Spinner />}
      {usersError && (
        <Alerts
          type={'error'}
          variable={usersError}
          close={() => setState({ ...state, usersError: '' })}
          textColor={'black'}
        />
      )}
      {allUsers &&
        allUsers.map((user) => (
          <Link className={classes.link} to={`/user/${user.email}`}>
            <UserComponent key={user.email} user={user} />
          </Link>
        ))}
    </div>
  )
}

export default Users
