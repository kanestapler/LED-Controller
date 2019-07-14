import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { CloseRounded } from '@material-ui/icons'

interface ColorBankProps {
  color: Color
  isDragging: boolean
  dropToTrash: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 60,
      height: 60,
      margin: 8,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
)

const ColorBank: React.FC<ColorBankProps> = ({
  color,
  isDragging,
  dropToTrash,
}) => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.root}
      elevation={isDragging ? 24 : 1}
      style={{
        background: `rgba(${color.red},${color.green},${color.blue},${
          isDragging ? 0.8 : 1
        })`,
      }}
    >
      {dropToTrash ? <CloseRounded fontSize="large" /> : null}
    </Paper>
  )
}

export default ColorBank
