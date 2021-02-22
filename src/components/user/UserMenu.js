import { Menu, MenuItem } from '@material-ui/core'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { auth } from '../../firebase'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PostAddIcon from '@material-ui/icons/PostAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  menu: {
    '& .MuiList-padding': {
      paddingTop: '5px',
    },
  },
  item: {
    margin: '10px',
  },
  icon: {
    margin: '0 7px 0 0 ',
  },
})

const UserMenu = ({ menu, handleClose }) => {
  const { dispatch } = useContext(AuthContext)
  const classes = useStyles()

  const handleLogout = async () => {
    await auth.signOut()

    dispatch({
      type: 'LOGGED_IN_USER',
      payload: null,
    })

    localStorage.removeItem('user')

    handleClose()
  }

  return (
    <Menu
      className={classes.menu}
      id='userMenu'
      anchorEl={menu}
      keepMounted
      open={Boolean(menu)}
      onClose={handleClose}
    >
      <Link className={classes.link} to='/profile'>
        <MenuItem className={classes.item} onClick={handleClose}>
          <PersonIcon className={classes.icon} /> Profile
        </MenuItem>
      </Link>

      <Link className={classes.link} to='/post'>
        <MenuItem className={classes.item} onClick={handleClose}>
          <PostAddIcon className={classes.icon} /> Post
        </MenuItem>
      </Link>

      <MenuItem className={classes.item} onClick={handleLogout}>
        <ExitToAppIcon className={classes.icon} /> Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
