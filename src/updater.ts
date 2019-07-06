import { saveLight, updateLightLED } from './database'

export const updateLight = (light: Light) => {
  //Update Light in database
  saveLight(light)
  //Update LEDs in other database
  const LEDs = getLEDArray(light.colors, light.numberOfLEDs)
  updateLightLED(light, LEDs)
}

const getLEDArray = (colors: Color[], numberOfLEDs: number) => {
  const ledArray: Color[] = []
  for (let i = 0; i < numberOfLEDs; i++) {
    const interval = numberOfLEDs / (colors.length - 1)
    const arrayIndex = Math.floor(i / interval)
    ledArray.push(getColorAtIndex(colors, i % interval, arrayIndex, interval))
  }
  return ledArray
}

const getColorAtIndex = (
  colors: Color[],
  index: number,
  arrayIndex: number,
  interval: number
) => {
  const red = getSingleValue(
    index,
    colors[arrayIndex].red,
    colors[arrayIndex + 1].red,
    interval
  )
  const blue = getSingleValue(
    index,
    colors[arrayIndex].blue,
    colors[arrayIndex + 1].blue,
    interval
  )
  const green = getSingleValue(
    index,
    colors[arrayIndex].green,
    colors[arrayIndex + 1].green,
    interval
  )
  return {
    red,
    blue,
    green,
  }
}

const getSingleValue = (
  index: number,
  startValue: number,
  endValue: number,
  periodLength: number
) => {
  if (startValue < endValue) {
    return (index / periodLength) * (endValue - startValue) + startValue
  } else if (endValue < startValue) {
    return (
      ((periodLength - index) / periodLength) * (startValue - endValue) +
      endValue
    )
  } else {
    return startValue
  }
}
