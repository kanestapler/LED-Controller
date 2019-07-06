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
    <div className={className}>
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Delete color="error" style={{ fontSize: size }} />
              <div style={{ display: 'none' }}>{provided.placeholder}</div>
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

export default Trash
