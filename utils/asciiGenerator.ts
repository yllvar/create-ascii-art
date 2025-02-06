import type { AsciiSettings } from "../types/ascii"
import { asciiCharacters } from "./asciiCharacters"

export function generateAsciiArt(img: HTMLImageElement, settings: AsciiSettings): string {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  const asciiWidth = settings.asciiWidth
  const asciiHeight = Math.round((img.height / img.width) * asciiWidth * 0.55)

  canvas.width = asciiWidth
  canvas.height = asciiHeight
  ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight)

  const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight)
  const data = imageData.data

  let ascii = ""
  const graySteps =
    settings.charset === "detailed"
      ? "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "
      : "@%#*+=-:. "

  for (let i = 0; i < data.length; i += 4) {
    if (i % (asciiWidth * 4) === 0) ascii += "\n"

    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const avg = (r + g + b) / 3

    const grayIndex = Math.floor((avg / 255) * (graySteps.length - 1))
    ascii += graySteps[grayIndex]
  }

  return ascii
}

const asciiLetters: { [key: string]: string[] } = {
  a: ["  ___  ", " / _ \\ ", "/ /_\\ \\", "|  _  |", "| | | |", "\\_| |_/"],
  b: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "| |_) |", "|____/ "],
  c: ["  ____ ", " / ___|", "| |  _ ", "| |_| |", " \\___|", "      "],
  d: [" ____  ", "|  _ \\ ", "| | | |", "| | | |", "| |_| |", "|____/ "],
  e: [" _____ ", "| ____|", "|  _|  ", "| |___ ", "|_____|", "      "],
  f: [" _____ ", "|____ |", "   / / ", "  / /  ", " /_/   ", "      "],
  g: ["  ____ ", " / ___|", "| |  _ ", "| |_| |", " \\___|", "      "],
  h: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  i: [" _____ ", "|_   _|", "  | |  ", "  | |  ", "  | |  ", "  \\_/  "],
  j: ["  ____ ", " |  _ \\", " | |_) |", " |  __/ ", " |_|    ", "      "],
  k: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  l: [" _ ", "| |", "| |", "| |", "| |", "\\_/ "],
  m: [" _   _ ", "| \\ | |", "|  \\| |", "| . ` |", "| |\\  |", "\\_| \\_/"],
  n: [" _   _ ", "| \\ | |", "|  \\| |", "| . ` |", "| |\\  |", "\\_| \\_/"],
  o: ["  ___  ", " / _ \\ ", "| | | |", "| | | |", "\\ \\_/ /", " \\___/ "],
  p: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "| |_) |", "|____/ "],
  q: ["  ___  ", " / _ \\ ", "| | | |", "| | | |", "\\ \\_/ /", " \\___/ "],
  r: [" ____  ", "|  _ \\ ", "| |_) |", "|  _ < ", "| |_) |", "|____/ "],
  s: [" _____ ", "| ____|", "|  _|  ", "| |___ ", "|_____|", "      "],
  t: [" _____ ", "|_   _|", "  | |  ", "  | |  ", "  | |  ", "  \\_/  "],
  u: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  v: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  w: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  x: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  y: [" _   _ ", "| | | |", "| |_| |", "|  _  |", "| | | |", "\\_| |_|"],
  z: [" _____ ", "|____ |", "   / / ", "  / /  ", " /_/   ", "      "],
  " ": ["      ", "      ", "      ", "      ", "      ", "      "],
}

export function generateTextAsciiArt(text: string, settings: AsciiSettings): string {
  console.log("Input text:", text)
  console.log("Settings:", settings)

  const lines = text.split("\n")
  console.log("Number of lines:", lines.length)

  const asciiArt = lines.map((line) => {
    console.log("Processing line:", line)
    const characters = line.split("")
    const asciiLines = Array(6).fill("")

    characters.forEach((char) => {
      const asciiChar = asciiCharacters[char] || asciiCharacters[" "] // Fallback to space if character not found
      for (let i = 0; i < 6; i++) {
        asciiLines[i] += asciiChar[i] || " " // Fallback to space if line is undefined
      }
    })
    console.log("ASCII Lines:", asciiLines)
    return asciiLines.join("\n")
  })

  const result = asciiArt.join("\n\n")
  console.log("Final ASCII art:")
  console.log(result)

  return result
}

