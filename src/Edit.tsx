import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

import { useLight, saveLight } from './database'

interface EditProps {
  match: {
    params: {
      lightId: string
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
)

const Edit: React.FC<EditProps> = ({ match }) => {
  const { light, setLight } = useLight(match.params.lightId)
  const classes = useStyles()
  if (!light) {
    return null
  }
  return (
    <div className={classes.root}>
      {JSON.stringify(light)}
      <TextField
        label="ID"
        className={classes.textField}
        value={light.id}
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Name"
        className={classes.textField}
        value={light.name}
        margin="normal"
        variant="outlined"
        onChange={e => {
          const updatedLight = {
            ...light,
            name: e.currentTarget.value,
          }
          setLight(updatedLight)
        }}
        onBlur={e => {
          const updatedLight = {
            ...light,
            name: e.currentTarget.value,
          }
          saveLight(updatedLight)
        }}
      />
      <TextField
        label="Number of LEDs"
        className={classes.textField}
        value={light.numberOfLEDs}
        margin="normal"
        variant="outlined"
        type="number"
        onChange={e => {
          const updatedLight = {
            ...light,
            numberOfLEDs: Number(e.currentTarget.value),
          }
          setLight(updatedLight)
        }}
        onBlur={e => {
          const updatedLight = {
            ...light,
            numberOfLEDs: Number(e.currentTarget.value),
          }
          saveLight(updatedLight)
        }}
      />
    </div>
  )
}

export default Edit
