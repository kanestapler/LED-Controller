import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Firebase from './firebase'

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    Firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/signed-in',
}

const Login = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />
)

export default Login
