interface Color {
  red: number
  green: number
  blue: color
}

interface DefaultColor extends Color {
  id: string
}

interface Light {
  colors: DefaultColor[]
  name: string
  id: string
}
