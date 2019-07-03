import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import { useDefaultColors, useLights } from './database'

const reorder = (
  list: DefaultColor[],
  startIndex: number,
  endIndex: number
): DefaultColor[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const Home: React.FC = () => {
  const defaultColors = useDefaultColors()
  const { lights, setLights } = useLights()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      const lightBoxSourceIndex = lights.findIndex(light => {
        return light.id === source.droppableId
      })
      if (lightBoxSourceIndex < 0) {
        return
      }
      lights[lightBoxSourceIndex].colors.splice(source.index, 1)
      setLights(lights)
      return
    }

    const lightBoxDroppedIndex = lights.findIndex(light => {
      return light.id === destination.droppableId
    })
    if (lightBoxDroppedIndex < 0) {
      return
    }

    if (source.droppableId === 'color-bank') {
      const addedColor = Object.assign({}, defaultColors[source.index])
      addedColor.id = `${Math.random()}`
      lights[lightBoxDroppedIndex].colors.splice(
        destination.index,
        0,
        addedColor
      )
      setLights(lights)
    } else if (source.droppableId === destination.droppableId) {
      const items = reorder(
        lights[lightBoxDroppedIndex].colors,
        source.index,
        destination.index
      )
      const newLights = [...lights]
      newLights[lightBoxDroppedIndex].colors = items
      setLights(newLights)
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="color-bank"
          direction="horizontal"
          isDropDisabled
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex' }}
            >
              {defaultColors.map((colorChoice, index) => {
                return (
                  <Draggable
                    key={colorChoice.id}
                    draggableId={colorChoice.id}
                    index={index}
                  >
                    {(providedDraggable, snapshotDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <div
                          style={{
                            width: 75,
                            height: 75,
                            background: `rgb(${colorChoice.red},${colorChoice.green},${colorChoice.blue})`,
                            margin: 15,
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <br />
        <br />
        <br />
        {lights.map(light => {
          return (
            <Droppable
              key={light.id}
              droppableId={light.id}
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: 'flex' }}
                >
                  {light.colors.map((color, index) => {
                    return (
                      <Draggable
                        key={color.id}
                        draggableId={color.id}
                        index={index}
                      >
                        {(providedDraggable, snapshotDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <div
                              style={{
                                width: 75,
                                height: 75,
                                background: `rgb(${color.red},${color.green},${color.blue})`,
                                margin: 15,
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </DragDropContext>
      {/* <ChromePicker
        disableAlpha
        color={color}
        onChange={color => {
          setColor(color.rgb)
        }}
      /> */}
    </>
  )
}

export default Home
