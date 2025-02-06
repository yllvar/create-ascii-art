import AsciiArtGenerator from "../components/AsciiArtGenerator"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ASCII Art Generator</h1>
      </header>
      <AsciiArtGenerator />
    </div>
  )
}

