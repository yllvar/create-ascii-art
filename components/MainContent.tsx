"use client"
import AsciiOutput from "./AsciiOutput"
import ImagePreview from "./ImagePreview"

interface MainContentProps {
  asciiArt: string
  image: string | null
  onDownloadedImageUpload: (asciiText: string) => void
  inputMode: "image" | "text"
}

export default function MainContent({ asciiArt, image, onDownloadedImageUpload, inputMode }: MainContentProps) {
  return (
    <main className="flex-1 p-6 overflow-hidden flex flex-col">
      {inputMode === "image" && image && (
        <div className="flex-1 mb-4 overflow-y-auto">
          <ImagePreview image={image} />
        </div>
      )}
      <div className={`flex-1 ${inputMode === "text" ? "h-full" : ""} overflow-y-auto`}>
        <AsciiOutput asciiArt={asciiArt} onDownloadedImageUpload={onDownloadedImageUpload} inputMode={inputMode} />
      </div>
    </main>
  )
}

