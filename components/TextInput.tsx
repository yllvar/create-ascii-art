"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface TextInputProps {
  onTextSubmit: (text: string) => void
}

export default function TextInput({ onTextSubmit }: TextInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onTextSubmit(text)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to convert to ASCII art..."
        className="w-full h-32"
      />
      <Button type="submit" className="w-full">
        Convert Text to ASCII
      </Button>
    </form>
  )
}

