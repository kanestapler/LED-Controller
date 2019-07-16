import React, { useContext } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { AuthContext } from './AuthContext'

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
    color: {
      margin: 8,
    },
  })
)

const ColorBank: React.FC<ColorBankProps> = props => {
  const classes = useStyles()
  const { defaultColors, droppableId, addNewColor, trashId } = props
  const user = useContext(AuthContext)

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
              <div key={colorChoice.id} className={classes.color}>
                <Draggable
                  draggableId={colorChoice.id}
                  index={index}
                  isDragDisabled={user ? !user.changeColor : true}
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
                          dropToTrash={
                            snapshotDraggable.draggingOver === trashId
                          }
                        />
                      </div>
                    )
                  }}
                </Draggable>
              </div>
            )
          })}
          {user ? (
            user.createColor ? (
              <NewColor addNewColor={addNewColor} />
            ) : null
          ) : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default ColorBank
