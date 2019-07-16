import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'
import green from '@material-ui/core/colors/green'
import { ThemeProvider } from '@material-ui/styles'

import { AuthContext } from './AuthContext'
import Firebase from './firebase'
import { useUser } from './database'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import SignedIn from './SignedIn'
import Edit from './Edit'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: green,
    type: 'dark',
  },
})

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const dbUser = useUser(user ? user.uid : null)
  useEffect(() => {
    return Firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])
  let combinedUser: User | null = null
  if (user) {
    combinedUser = { ...user } as User
  }
  if (dbUser) {
    combinedUser = { ...combinedUser, ...dbUser }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={combinedUser}>
        <Router>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/edit/:lightId" exact component={Edit} />
          <Route path="/login" exact component={Login} />
          <Route path="/signed-in" exact component={SignedIn} />
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
