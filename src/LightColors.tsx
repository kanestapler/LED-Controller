import React, { useState, useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Input,
  IconButton,
  Slider,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  ExpandMore,
  BrightnessLow,
  Edit,
  BlurOn,
  Cake,
  PowerSettingsNew,
} from '@material-ui/icons'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

import { AuthContext } from './AuthContext'
import { updateLightStatus } from './updater'
import { useLightStatus } from './database'

import ColorBlock from './ColorBlock'

interface RouterProps {
  history: string | undefined
}

interface LightColorsProps extends RouteComponentProps<RouterProps> {
  light: Light
  trashId: string
  updateBrightness: (scale: number) => void
}

export enum LightStatus {
  StaticColorArray = 'static',
  PartyMode = 'party',
  Power = 'power',
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
    input: {
      width: 42,
    },
    settingsButton: {
      padding: 0,
      marginLeft: theme.spacing(1),
    },
    toggleBox: {
      marginBottom: theme.spacing(1),
    },
  })
)

const MAX_BRIGHTNESS = 125

const LightColors: React.FC<LightColorsProps & RouterProps> = props => {
  const { light, trashId, updateBrightness, history } = props
  const [brightness, setBrightness] = useState(light.scale)
  const [expanded, setExpanded] = useState(false)
  const lightStatus = useLightStatus(light)
  const classes = useStyles()
  const user = useContext(AuthContext)

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={(e, x) => {
        setExpanded(x)
      }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{light.name}</Typography>
        <IconButton
          className={classes.settingsButton}
          onClick={() => {
            history.push(`/edit/${light.id}`)
          }}
          style={!expanded ? { display: 'none' } : undefined}
        >
          <Edit fontSize="small" />
        </IconButton>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <ToggleButtonGroup
          value={lightStatus}
          exclusive
          onChange={(e, x: LightStatus) => {
            if (x === LightStatus.Power) {
              if (lightStatus) {
                updateLightStatus(light, null)
              } else {
                updateLightStatus(light, LightStatus.StaticColorArray)
              }
            } else {
              updateLightStatus(light, x)
            }
          }}
          className={classes.toggleBox}
        >
          <ToggleButton
            selected={!!lightStatus}
            value={LightStatus.Power}
            disabled={user ? !user.togglePower : true}
          >
            <PowerSettingsNew />
          </ToggleButton>
          <ToggleButton
            value={LightStatus.StaticColorArray}
            disabled={user ? !user.togglePower : true}
          >
            <BlurOn />
          </ToggleButton>
          <ToggleButton
            value={LightStatus.PartyMode}
            disabled={user ? !user.togglePower : true}
          >
            <Cake />
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography id="input-slider" gutterBottom>
          Brightness
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <BrightnessLow />
          </Grid>
          <Grid item xs>
            <Slider
              value={brightness}
              onChange={(event, newValue) => {
                setBrightness(newValue as number)
              }}
              onChangeCommitted={(event, newValue) => {
                updateBrightness(newValue as number)
              }}
              valueLabelDisplay="auto"
              min={0}
              max={MAX_BRIGHTNESS}
              disabled={user ? !user.brightness || !lightStatus : true}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={brightness}
              margin="dense"
              onChange={e => {
                let value = Number(e.currentTarget.value)
                if (value < 0) {
                  value = 0
                } else if (value > MAX_BRIGHTNESS) {
                  value = MAX_BRIGHTNESS
                }
                setBrightness(value)
                updateBrightness(value)
              }}
              disableUnderline
              inputProps={{
                step: 5,
                min: 0,
                max: MAX_BRIGHTNESS,
                type: 'number',
              }}
              disabled={user ? !user.brightness || !lightStatus : true}
            />
          </Grid>
        </Grid>
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
                          <div key={color.id} className={classes.color}>
                            <Draggable
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

export default withRouter(LightColors)
