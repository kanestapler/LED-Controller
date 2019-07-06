import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import {
  useDefaultColors,
  useLights,
  addNewDefaultColor,
  deleteDefaultColor,
} from './database'
import { updateLight } from './updater'
import ColorBank from './ColorBank'
import LightColors from './LightColors'
import Trash from './Trash'

const COLOR_BANK_ID = 'COLOR-BANK-DROPPABLE-ID'
const TRASH_ID = 'TRASH-DROPPABLE-ID'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trash: {
      bottom: '25px',
      right: '25px',
      position: 'absolute',
    },
  })
)

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
  const classes = useStyles()
  const { defaultColors } = useDefaultColors()
  const { lights } = useLights()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const lightBoxDroppedIndex = lights.findIndex(light => {
      return light.id === destination.droppableId
    })

    if (destination.droppableId === TRASH_ID) {
      if (source.droppableId === COLOR_BANK_ID) {
        deleteDefaultColor(defaultColors[source.index])
      } else {
        const lightBoxSourceIndex = lights.findIndex(light => {
          return light.id === source.droppableId
        })
        if (lightBoxSourceIndex < 0) {
          return
        }
        lights[lightBoxSourceIndex].colors.splice(source.index, 1)
        updateLight(lights[lightBoxSourceIndex])
      }
    } else if (source.droppableId === COLOR_BANK_ID) {
      const addedColor = Object.assign({}, defaultColors[source.index])
      addedColor.id = `${Math.random()}`
      lights[lightBoxDroppedIndex].colors.splice(
        destination.index,
        0,
        addedColor
      )
      updateLight(lights[lightBoxDroppedIndex])
    } else if (source.droppableId === destination.droppableId) {
      const items = reorder(
        lights[lightBoxDroppedIndex].colors,
        source.index,
        destination.index
      )
      const newLights = [...lights]
      newLights[lightBoxDroppedIndex].colors = items
      updateLight(lights[lightBoxDroppedIndex])
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColorBank
          defaultColors={defaultColors}
          droppableId={COLOR_BANK_ID}
          addNewColor={newColor => {
            addNewDefaultColor(newColor)
          }}
          trashId={TRASH_ID}
        />
        <br />
        <br />
        <br />
        {lights.map(light => {
          return (
            <LightColors
              key={light.id}
              light={light}
              trashId={TRASH_ID}
              updateScale={newScale => {
                light.scale = newScale
                updateLight(light)
              }}
            />
          )
        })}
        <Trash droppableId={TRASH_ID} size={50} className={classes.trash} />
      </DragDropContext>
    </>
  )
}

export default Home
