import React, { useState, useContext } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { AuthContext } from './AuthContext'

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
      minHeight: '76px',
      overflowX: 'scroll',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
      flexDirection: 'column',
    },
    color: {
      margin: 8,
    },
  })
)

const LightColors: React.FC<LightColorsProps> = props => {
  const { light, trashId, updateScale } = props
  const [scale, setScale] = useState(light.scale)
  const classes = useStyles()
  const user = useContext(AuthContext)
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{light.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
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
          disabled={user ? !user.brightness : true}
        />
        <Droppable
          droppableId={light.id}
          direction="horizontal"
          isDropDisabled={user ? !user.changeColor : true}
        >
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className={classes.bucket}>
                  {light.colors.length === 0
                    ? null
                    : light.colors.map((color, index) => {
                        return (
                          <div className={classes.color}>
                            <Draggable
                              key={color.id}
                              draggableId={color.id}
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
                                      color={color}
                                      isDragging={snapshotDraggable.isDragging}
                                      dropToTrash={
                                        snapshotDraggable.draggingOver ===
                                        trashId
                                      }
                                    />
                                  </div>
                                )
                              }}
                            </Draggable>
                          </div>
                        )
                      })}
                </div>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default LightColors
