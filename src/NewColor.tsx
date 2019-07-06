import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Modal, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { ChromePicker, RGBColor } from 'react-color'

interface NewColorProps {
  addNewColor: (newColor: Color) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      margin: theme.spacing(1),
    },
    newColorButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 75,
      height: 75,
      margin: 10,
      background: 'white',
      cursor: 'pointer',
      borderRadius: '50%',
    },
    addIcon: {
      color: 'black',
    },
  })
)

const NewColor: React.FC<NewColorProps> = ({ addNewColor }) => {
  const [open, setOpen] = useState(false)
  const [newColor, setNewColor] = useState<RGBColor>({ r: 255, g: 0, b: 0 })
  const classes = useStyles()
  return (
    <>
      <Paper
        className={classes.newColorButton}
        onClick={() => {
          setOpen(true)
        }}
      >
        <Add className={classes.addIcon} fontSize="large" />
      </Paper>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        disableAutoFocus
        className={classes.modal}
      >
        <>
          <ChromePicker
            disableAlpha
            color={newColor}
            onChange={color => {
              setNewColor(color.rgb)
            }}
          />
          <div style={{ width: 225 }}>
            <div style={{ float: 'right' }}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  addNewColor({
                    red: newColor.r,
                    green: newColor.g,
                    blue: newColor.b,
                  })
                  setOpen(false)
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}

export default NewColor
