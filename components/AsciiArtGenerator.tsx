"use client"

import { useState, useCallback, useEffect } from "react"
import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import type { AsciiSettings, Preset } from "../types/ascii"
import { generateAsciiArt, generateTextAsciiArt } from "../utils/asciiGenerator"
import { presets } from "../utils/presets"

export default function AsciiArtGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [asciiArt, setAsciiArt] = useState<string>("")
  const [settings, setSettings] = useState<AsciiSettings>(presets[0].settings)
  const [inputMode, setInputMode] = useState<"image" | "text">("image")
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark"
      document.documentElement.classList.toggle("dark", newTheme === "dark")
      return newTheme
    })
  }, [])

  const generateArt = useCallback(() => {
    if (inputMode === "image" && image) {
      const img = new Image()
      img.onload = () => {
        const newAsciiArt = generateAsciiArt(img, settings)
        setAsciiArt(newAsciiArt)
      }
      img.src = image
    }
  }, [image, settings, inputMode])

  useEffect(() => {
    generateArt()
  }, [generateArt])

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setInputMode("image")
    }
    reader.readAsDataURL(file)
  }, [])

  const handleTextSubmit = useCallback(
    (text: string) => {
      console.log("Submitting text:", text)
      const newAsciiArt = generateTextAsciiArt(text, settings)
      console.log("Generated ASCII art:", newAsciiArt)
      setAsciiArt(newAsciiArt)
      setInputMode("text")
      setImage(null) // Clear the image when switching to text mode
    },
    [settings],
  )

  const handleSettingsChange = useCallback((newSettings: Partial<AsciiSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }, [])

  const handlePresetChange = useCallback((preset: Preset) => {
    setSettings(preset.settings)
  }, [])

  const handleDownloadedImageUpload = useCallback(
    (asciiText: string) => {
      // Create a new image from the ASCII text
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const lines = asciiText.split("\n")
      const lineHeight = 7 // Adjust this value based on your font size
      canvas.width = lines[0].length * 6 // Adjust this value based on your font width
      canvas.height = lines.length * lineHeight

      ctx.font = `${lineHeight}px monospace`
      ctx.fillStyle = settings.theme === "dark" ? "white" : "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = settings.theme === "dark" ? "black" : "white"

      lines.forEach((line, i) => {
        ctx.fillText(line, 0, (i + 1) * lineHeight)
      })

      const dataUrl = canvas.toDataURL("image/png")
      setImage(dataUrl)
      setInputMode("image")
    },
    [settings.theme],
  )

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onImageUpload={handleImageUpload}
        onPresetChange={handlePresetChange}
        onTextSubmit={handleTextSubmit}
        presets={presets}
        inputMode={inputMode}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <MainContent
        asciiArt={asciiArt}
        image={image}
        onDownloadedImageUpload={handleDownloadedImageUpload}
        inputMode={inputMode}
      />
    </div>
  )
}

