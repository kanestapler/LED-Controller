import React, { useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { History } from 'history'

import Firebase from './firebase'
import { getUser, createUser } from './database'

interface SignedInProps {
  history: History
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10em',
    },
  })
)

const SignedIn: React.FC<SignedInProps> = ({ history }) => {
  const classes = useStyles()
  useEffect(() => {
    return Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUser(user.uid).then(x => {
          if (x) {
            history.push('/')
          } else {
            createUser(user).then(() => {
              history.push('/')
            })
          }
        })
      }
    })
  }, [history])
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} size={100} />
    </div>
  )
}

export default SignedIn
