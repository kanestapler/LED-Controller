import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Firebase from './firebase'

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signed-in',
  signInOptions: [
    Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    Firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const Login = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={Firebase.auth()} />
)

export default Login
