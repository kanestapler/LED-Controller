import React from 'react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

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
  })
)

const Header: React.FC<ChildComponentProps> = ({ history }) => {
  const classes = useStyles()
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
          <Button
            color="inherit"
            onClick={() => {
              history.push('/login')
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Header)
