"use client"

import { Upload, ImagePlus, AlertCircleIcon, LoaderCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useRef, useEffect } from 'react'
import { uploadImage } from "./actions" 
import { Button } from "@/components/ui/button"

type Data = {
  result: number
  hairless_image: string
  mask_image: string
}

export default function TryPage() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  console.log(isLoading)

  useEffect(() => {
    // nothing
    return () => {
      // clean up before new image uploaded
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl)
      }
    }
  }, [uploadedImageUrl])

  async function handleUpload(formData: FormData) {
    setIsLoading(true)
    setTimeout(()=>{},5000)
    setError(null)
    setData(null)
    const file = formData.get('file') as File
    const fileURL = URL.createObjectURL(file)
    setUploadedImageUrl(fileURL)
    try {
      const data: Data = await uploadImage(formData)
      if (data) {
        setData(data)
      } else {
        throw new Error('An unknown error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    handleUpload(formData)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer?.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      handleUpload(formData)
    }
  }

  function handleTryAgain() {
    setUploadedImageUrl(null)
    setData(null)
    setError(null)
  }

  return (
    <div className="flex flex-col gap-8">
      <Alert variant="destructive" className="border-red-300 bg-red-50">
        <AlertCircleIcon />
        <AlertTitle>Do not take these results seriously!</AlertTitle>
        <AlertDescription>
          This website was made as a hobby project and results are not medical advice.
        </AlertDescription>
      </Alert>
        <div>
          <h1 className="text-3xl font-black mb-2">
              Try now
          </h1>
          <p>Upload an image of a lesion and receive our algorithm's estimated probability of melanoma. Our AI will analyze the image using the same ABC features that dermatologists use in clinical practice.</p>
        </div>

      {/* upload outer wrapper */}

      {(!data) && (
        <div className="border border-sidebar-border p-5 rounded-md">

        <p className="font-semibold">Upload Lesion Image</p>
        <p>Drag and drop an image file or click to browse.</p>
        
        {/* upload drag and drop area */}
        {!isLoading 
          ? (
            <div 
              className={
                `border border-neutral-300 border-dashed px-5 py-16 mt-5 rounded-md flex flex-col gap-6 items-center
                ${isDragging ? "bg-blue-100 border-blue-800" : ""}
                `
              }
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="size-10"/>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-lg text-center">Drag and drop an image here</p>
                <p className="text-gray-600 text-sm text-center">Supported formats: JPG and PNG</p>
              </div>

              <input 
                type="file" 
                id='file' 
                name="file" 
                accept=".png, .jpg, .jpeg" 
                className="hidden"
                onChange={onFileChange}
              />
              <label className="flex items-center gap-2 border bg-black px-6 py-2 text-white rounded-md text-sm hover:bg-gray-800" htmlFor='file'>
                  or click to upload<ImagePlus className="size-5"/>
              </label>
            </div>
            ) 
          : <div className=" border border-neutral-300 border-dashed px-5 py-16 mt-5 rounded-md flex justify-center gap-2 items-center">
              <p className="font-semibold">Loading</p>
              <LoaderCircle className="size-4 animate-spin" />
            </div>
        } 
          
      </div>)}

      {data ? (
        <div className="border border-sidebar-border p-5 rounded-md flex flex-col items-center gap-12 py-12">

          {/* result probability */}
          <div>
            <h3 className="font-semibold text-center">Your result is in</h3>
            <p className="text-center">Probability of melanoma is estimated to be:</p>
            <p className="mt-4 text-5xl font-bold text-center">{Math.round(data.result * 10000) / 100}%</p>
          </div>

          {/* images */}
          <div className="flex flex-col items-center gap-10 flex-wrap sm:flex-row sm:justify-center sm:gap-5">
            {/* uploaded image */}
            {uploadedImageUrl && (
              <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
                <p>Your uploaded image:</p>
                <img src={uploadedImageUrl} className="rounded-sm"/>
              </div>
            )}
            {/* hair removed */}
            <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
              <p>Result from removing hair:</p>
              <img src={data.hairless_image} className="rounded-sm"/>
            </div>
            
            {/* mask */}
            <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
              <p>Mask of the lesion detected:</p>
              <img src={data.mask_image} className="rounded-sm"/>
            </div>
          </div>

          {/* try another image */}
          <Button variant={'outline'} onClick={handleTryAgain}>Try again with another image <ImagePlus className="size-5"/></Button>

        </div>
      ) : error ? error && <p className="text-center mt-6 text-red-600 text-xl font-bold">{error}</p> : null}
      
    </div>
  )
}