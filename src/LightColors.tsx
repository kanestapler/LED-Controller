import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Paper, Typography } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import ColorBlock from './ColorBlock'

interface LightColorsProps {
  light: Light
  trashId: string
  updateScale: (scale: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bucket: {
      display: 'inline-flex',
      width: '100%',
      overflowX: 'scroll',
    },
    root: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })
)

const LightColors: React.FC<LightColorsProps> = props => {
  const { light, trashId, updateScale } = props
  const [scale, setScale] = useState(light.scale)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4">{light.name}</Typography>
      <Slider
        value={scale}
        onChange={(event, newValue) => {
          setScale(newValue as number)
        }}
        onChangeCommitted={(event, newValue) => {
          updateScale(newValue as number)
        }}
        valueLabelDisplay="auto"
        min={0}
        max={255}
      />
      <Droppable droppableId={light.id} direction="horizontal">
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Paper className={classes.bucket}>
                {light.colors.map((color, index) => {
                  return (
                    <Draggable
                      key={color.id}
                      draggableId={color.id}
                      index={index}
                    >
                      {(providedDraggable, snapshotDraggable) => {
                        return (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <ColorBlock
                              color={color}
                              isDragging={snapshotDraggable.isDragging}
                              dropToTrash={
                                snapshotDraggable.draggingOver === trashId
                              }
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
              </Paper>
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

export default LightColors
