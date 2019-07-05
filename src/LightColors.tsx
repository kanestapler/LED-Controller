import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Paper } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import ColorBlock from './ColorBlock'

interface LightColorsProps {
  light: Light
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bucket: {
      display: 'inline-flex',
      width: '100%',
      overflowX: 'scroll',
    },
  })
)

const LightColors: React.FC<LightColorsProps> = props => {
  const { light } = props
  const classes = useStyles()
  return (
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
  )
}

export default LightColors
