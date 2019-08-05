import { saveLight } from './database'

export const updateLight = (light: Light) => {
  saveLight(light)
}
