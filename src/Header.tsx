import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import { AuthContext } from './AuthContext'
import { logout } from './firebase'

interface ChildComponentProps {
  history: History
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      margin: 10,
      cursor: 'pointer',
    },
  })
)

const Header: React.FC<ChildComponentProps> = ({ history }) => {
  const classes = useStyles()
  const user = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              history.push('/')
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Jellyfish Jam
          </Typography>
          {user ? (
            <>
              <Avatar
                alt={user.displayName ? user.displayName : undefined}
                src={user.photoURL ? user.photoURL : undefined}
                className={classes.avatar}
                onClick={event => {
                  setAnchorEl(event.currentTarget)
                }}
              />
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => {
                  setAnchorEl(null)
                }}
              >
                <MenuItem
                  onClick={() => {
                    logout()
                    setAnchorEl(null)
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                history.push('/login')
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Header)
