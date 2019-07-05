import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import ColorBlock from './ColorBlock'
import NewColor from './NewColor'

interface ColorBankProps {
  defaultColors: DefaultColor[]
  droppableId: string
  addNewColor: (newColor: Color) => void
}

const ColorBank: React.FC<ColorBankProps> = props => {
  const { defaultColors, droppableId, addNewColor } = props
  return (
    <Droppable droppableId={droppableId} direction="horizontal" isDropDisabled>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ display: 'flex', flexWrap: 'wrap' }}
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
