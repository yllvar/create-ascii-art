import type React from "react"
import type { AsciiSettings } from "../types/ascii"
import { Tooltip } from "react-tooltip"

interface SettingsPanelProps {
  settings: AsciiSettings
  onSettingsChange: (newSettings: Partial<AsciiSettings>) => void
  section: "basic" | "advanced"
}

export default function SettingsPanel({ settings, onSettingsChange, section }: SettingsPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    onSettingsChange({ [name]: newValue })
  }

  const basicSettings = (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ASCII Width:
          <input
            type="range"
            name="asciiWidth"
            min="20"
            max="300"
            value={settings.asciiWidth}
            onChange={handleChange}
            className="w-full"
          />
          <span className="text-xs text-gray-500 ml-2">{settings.asciiWidth}</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Brightness:
          <input
            type="range"
            name="brightness"
            min="-100"
            max="100"
            value={settings.brightness}
            onChange={handleChange}
            className="w-full"
          />
          <span className="text-xs text-gray-500 ml-2">{settings.brightness}</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contrast:
          <input
            type="range"
            name="contrast"
            min="-100"
            max="100"
            value={settings.contrast}
            onChange={handleChange}
            className="w-full"
          />
          <span className="text-xs text-gray-500 ml-2">{settings.contrast}</span>
        </label>
      </div>
    </>
  )

  const advancedSettings = (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span data-tooltip-id="dithering-tooltip">Dithering:</span>
          <input
            type="checkbox"
            name="dithering"
            checked={settings.dithering}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        <Tooltip id="dithering-tooltip" place="right">
          Dithering is a technique used to create the illusion of color depth in images with a limited color palette.
        </Tooltip>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span data-tooltip-id="edge-detection-tooltip">Edge Detection:</span>
          <select
            name="edgeDetection"
            value={settings.edgeDetection}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
          >
            <option value="none">None</option>
            <option value="sobel">Sobel</option>
            <option value="canny">Canny</option>
          </select>
        </label>
        <Tooltip id="edge-detection-tooltip" place="right">
          Edge detection highlights the boundaries of objects in the image.
        </Tooltip>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <span data-tooltip-id="charset-tooltip">Character Set:</span>
          <select name="charset" value={settings.charset} onChange={handleChange} className="ml-2 p-1 border rounded">
            <option value="standard">Standard</option>
            <option value="blocks">Blocks</option>
            <option value="binary">Binary</option>
            <option value="detailed">Detailed</option>
          </select>
        </label>
        <Tooltip id="charset-tooltip" place="right">
          The set of characters used to create the ASCII art.
        </Tooltip>
      </div>
    </>
  )

  return <div className="space-y-4">{section === "basic" ? basicSettings : advancedSettings}</div>
}

