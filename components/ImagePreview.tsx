interface ImagePreviewProps {
  image: string
}

export default function ImagePreview({ image }: ImagePreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Image Preview</h2>
      <div className="flex justify-center items-center h-[calc(100%-2rem)]">
        <img src={image || "/placeholder.svg"} alt="Uploaded" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  )
}

