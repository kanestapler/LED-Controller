import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Paper, Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import ColorBlock from './ColorBlock'

interface LightColorsProps {
  light: Light
  trashId: string
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
  const { light, trashId } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4">{light.name}</Typography>
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
