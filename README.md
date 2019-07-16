## Set up

`yarn install`

Create a new file in `/src/` called `firebaseConfig.ts` that looks like:

```
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}
```

You can grab these config values from your firebase project settings.

## Run

`yarn start`

## Deploy

This requires firebase CLI set up

1. `npm install -g firebase-tools`
2. `firebase login`

`yarn deploy`
