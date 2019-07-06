import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import ColorBlock from './ColorBlock'
import NewColor from './NewColor'

interface ColorBankProps {
  defaultColors: DefaultColor[]
  droppableId: string
  addNewColor: (newColor: Color) => void
  trashId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  })
)

const ColorBank: React.FC<ColorBankProps> = props => {
  const classes = useStyles()
  const { defaultColors, droppableId, addNewColor, trashId } = props
  return (
    <Droppable droppableId={droppableId} direction="horizontal" isDropDisabled>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={classes.root}
        >
          {defaultColors.map((colorChoice, index) => {
            return (
              <Draggable
                key={colorChoice.id}
                draggableId={colorChoice.id}
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
                        color={colorChoice}
                        isDragging={snapshotDraggable.isDragging}
                        dropToTrash={snapshotDraggable.draggingOver === trashId}
                      />
                    </div>
                  )
                }}
              </Draggable>
            )
          })}
          <NewColor addNewColor={addNewColor} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default ColorBank
