import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'
import green from '@material-ui/core/colors/green'
import { ThemeProvider } from '@material-ui/styles'

import Home from './Home'
import Header from './Header'
import Login from './Login'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: green,
    type: 'dark',
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Router>
    </ThemeProvider>
  )
}

export default App
