"use client"

import { useState, useRef, useEffect } from "react"
import { Resizable } from "re-resizable"

interface AsciiOutputProps {
  asciiArt: string
  onDownloadedImageUpload: (asciiText: string) => void
  inputMode: "image" | "text"
}

export default function AsciiOutput({ asciiArt, onDownloadedImageUpload, inputMode }: AsciiOutputProps) {
  const [copied, setCopied] = useState(false)
  const [fontSize, setFontSize] = useState(12)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const asciiRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (asciiRef.current) {
      asciiRef.current.style.fontSize = `${fontSize}px`
    }
  }, [fontSize])

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiArt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([asciiArt], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "ascii_art.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onDownloadedImageUpload(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">ASCII Output</h2>
      <Resizable
        defaultSize={{ width: "100%", height: 400 }}
        minHeight={200}
        maxHeight="100%"
        className="mb-4 overflow-auto bg-gray-100 dark:bg-gray-700 rounded"
      >
        <pre
          ref={asciiRef}
          className={`whitespace-pre font-mono p-4 ${inputMode === "text" ? "text-center" : ""}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {asciiArt || "Upload an image or enter text to generate ASCII art"}
        </pre>
      </Resizable>
      <div className="flex items-center mb-4">
        <label htmlFor="fontSize" className="mr-2 text-gray-700 dark:text-gray-300">
          Font Size:
        </label>
        <input
          type="range"
          id="fontSize"
          min="8"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-48"
        />
        <span className="ml-2 text-gray-700 dark:text-gray-300">{fontSize}px</span>
      </div>
      <div className="flex flex-wrap gap-4">
        <button onClick={handleCopy} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {copied ? "Copied!" : "Copy ASCII Art"}
        </button>
        <button onClick={handleDownload} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Download ASCII Art
        </button>
        <button onClick={handleUploadClick} className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
          Upload Downloaded Image
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".txt" className="hidden" />
      </div>
    </div>
  )
}

