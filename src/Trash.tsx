import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Delete } from '@material-ui/icons'

interface TrashProps {
  droppableId: string
  size: number
  className: string
}

const Trash: React.FC<TrashProps> = props => {
  const { droppableId, size, className } = props
  return (
    <Droppable droppableId={droppableId} isDropDisabled>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={className}
        >
          <Delete color="error" style={{ fontSize: size }} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Trash
