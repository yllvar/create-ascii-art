export interface AsciiSettings {
  theme: "dark" | "light"
  asciiWidth: number
  brightness: number
  contrast: number
  blur: number
  dithering: boolean
  ditherAlgorithm: "floyd" | "atkinson" | "noise" | "ordered"
  invert: boolean
  ignoreWhite: boolean
  charset: "standard" | "blocks" | "binary" | "detailed"
  edgeDetection: "none" | "sobel" | "dog"
  edgeThreshold: number
  // New settings for text-to-ASCII
  textCase: "preserve" | "uppercase" | "lowercase"
  textAlignment: "left" | "center" | "right"
}

export interface Preset {
  name: string
  settings: AsciiSettings
}

