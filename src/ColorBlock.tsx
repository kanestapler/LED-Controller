import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

interface ColorBankProps {
  color: Color
  isDragging: boolean
  //   dropToTrash: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 75,
      height: 75,
      margin: 10,
      borderRadius: '50%',
    },
  })
)

const ColorBank: React.FC<ColorBankProps> = ({
  color,
  isDragging,
  //   dropToTrash,
}) => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.root}
      elevation={isDragging ? 24 : 1}
      style={{
        background: `rgb(${color.red},${color.green},${color.blue})`,
      }}
    />
  )
}

export default ColorBank
