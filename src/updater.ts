import { saveLight } from './database'

export const updateLight = (light: Light) => {
  //Update Light in database
  saveLight(light)
  //Update LEDs in other database
}
