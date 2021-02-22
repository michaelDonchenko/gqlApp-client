import React, { useContext } from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import UserMenu from './user/UserMenu'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ede7f6',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
  },
  navButton: {
    color: 'black',
    fontWeight: '500',
  },
  mainButton: {
    color: 'black',
    margin: '5px 0 10px 0',
    fontSize: '20px',
    padding: 0,
  },
  toolBar: {
    minHeight: '20px',
    width: '100%',
    maxWidth: '1280px',
  },
})

const NavBar = () => {
  const classes = useStyles()
  const { state } = useContext(AuthContext)
  const { user } = state

  const [menu, setMenu] = React.useState(null)

  const handleClick = (event) => {
    setMenu(event.currentTarget)
  }

  const handleClose = () => {
    setMenu(null)
  }

  return (
    <AppBar position='sticky' className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <NavLink className={classes.navLink} to='/'>
          <h4 className={classes.mainButton}>GQL App</h4>
        </NavLink>
        <div style={{ flexGrow: 1 }}></div>

        {user ? (
          <>
            <Button
              className={classes.navButton}
              aria-controls='userMenu'
              aria-haspopup='true'
              onClick={handleClick}
              startIcon={<MenuIcon style={{ fontSize: '1.5rem' }} />}
            >
              <span>User Menu</span>
            </Button>
            <UserMenu menu={menu} handleClose={handleClose} />
          </>
        ) : (
          <>
            <NavLink className={classes.navLink} to='/login'>
              <Button className={classes.navButton}>login</Button>
            </NavLink>

            <NavLink className={classes.navLink} to='/register'>
              <Button className={classes.navButton}>register</Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
