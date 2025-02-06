"use client"

import { useState } from "react"
import type { AsciiSettings, Preset } from "../types/ascii"
import ImageUpload from "./ImageUpload"
import TextInput from "./TextInput"
import SettingsPanel from "./SettingsPanel"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon, SunIcon, MoonIcon } from "@heroicons/react/20/solid"

interface SidebarProps {
  settings: AsciiSettings
  onSettingsChange: (newSettings: Partial<AsciiSettings>) => void
  onImageUpload: (file: File) => void
  onTextSubmit: (text: string) => void
  onPresetChange: (preset: Preset) => void
  presets: Preset[]
  inputMode: "image" | "text"
  theme: "dark" | "light"
  onThemeToggle: () => void
}

export default function Sidebar({
  settings,
  onSettingsChange,
  onImageUpload,
  onTextSubmit,
  onPresetChange,
  presets,
  inputMode,
  theme,
  onThemeToggle,
}: SidebarProps) {
  const [activePreset, setActivePreset] = useState(presets[0])
  const [activeTab, setActiveTab] = useState<"image" | "text">(inputMode)

  const handlePresetChange = (preset: Preset) => {
    setActivePreset(preset)
    onPresetChange(preset)
  }

  return (
    <aside className="w-80 bg-white dark:bg-gray-800 p-6 overflow-y-auto flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "image" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("image")}
          >
            Image
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "text" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("text")}
          >
            Text
          </button>
        </div>
        {activeTab === "image" ? <ImageUpload onUpload={onImageUpload} /> : <TextInput onTextSubmit={onTextSubmit} />}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Presets</h3>
        <select
          value={activePreset.name}
          onChange={(e) => handlePresetChange(presets.find((p) => p.name === e.target.value) || presets[0])}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          {presets.map((preset) => (
            <option key={preset.name} value={preset.name}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <span>Basic Adjustments</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <SettingsPanel settings={settings} onSettingsChange={onSettingsChange} section="basic" />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <span>Advanced Settings</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <SettingsPanel settings={settings} onSettingsChange={onSettingsChange} section="advanced" />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </aside>
  )
}

