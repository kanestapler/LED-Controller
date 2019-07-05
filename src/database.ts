import { useState, useEffect } from 'react'
import firebase from './firebase'

const database = firebase.firestore()

export const useDefaultColors = () => {
  const [defaultColors, setDefaultColors] = useState<Array<DefaultColor>>([])
  useEffect(() => {
    const unsubscribe = database.collection('defaults').onSnapshot(doc => {
      setDefaultColors(
        doc.docs.map(color => {
          return {
            ...(color.data() as Color),
            id: color.id,
          }
        })
      )
    })
    return unsubscribe
  }, [])
  return { defaultColors, setDefaultColors }
}

export const useLights = () => {
  const [lights, setLights] = useState<Array<Light>>([])
  useEffect(() => {
    const unsubscribe = database.collection('lights').onSnapshot(doc => {
      setLights(
        doc.docs.map(light => {
          const lightData = light.data() as Light
          return {
            ...lightData,
            id: light.id,
            colors: lightData.colors.map(x => {
              return { ...x, id: `${Math.random()}` }
            }),
          }
        })
      )
    })
    return unsubscribe
  }, [])
  return { lights, setLights }
}

export const addNewDefaultColor = (color: Color) => {
  database.collection('defaults').add({
    red: color.red,
    green: color.green,
    blue: color.blue,
  })
}

export const saveLight = (light: Light) => {
  database
    .collection('lights')
    .doc(light.id)
    .set({
      colors: light.colors.map(color => {
        return { red: color.red, green: color.green, blue: color.blue }
      }),
      name: light.name,
    })
}
