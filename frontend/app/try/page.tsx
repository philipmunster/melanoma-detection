"use client"

import { Upload, ImagePlus, AlertCircleIcon, LoaderCircle, MoveRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useRef, useEffect } from 'react'
import { uploadImage } from "./actions" 
import { Button } from "@/components/ui/button"
import imageCompression from 'browser-image-compression'
import 'react-image-crop/dist/ReactCrop.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ReactCrop, { type Crop } from 'react-image-crop'
import { cropImage } from '@/app/try/cropImage'
import clsx from "clsx"
import Image from 'next/image'

type Data = {
  isMelanoma: boolean
  probability: number
  features: number[]
  hairless_image: string
  mask_image: string
}

export default function TryPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showCropModal, setShowCropModal] = useState<boolean>(false)
  const [crop, setCrop] = useState<Crop | undefined>()

  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // nothing
    return () => {
      // clean up before new image uploaded
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl)
      }
    }
  }, [uploadedImageUrl])

  async function handleUpload(file: File) {
    setIsLoading(true)
    setTimeout(()=>{},5000)
    setError(null)
    setData(null)
    const fileURL = URL.createObjectURL(file)
    setUploadedImageUrl(fileURL)
    try {
      // compress image and convert to JPEG
      const compressedBlob = await imageCompression(file, {
        maxWidthOrHeight: 1280,
        initialQuality: 0.8,
        maxSizeMB: 0.2,
        useWebWorker: true
      })
      const compFormData = new FormData()
      compFormData.append('file', new File([compressedBlob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
      // upload image
      const data: Data = await uploadImage(compFormData)
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

  async function handleCrop() {
    const cropFile = await cropImage(file, crop, imgRef)

    if (!cropFile) return

    setShowCropModal(false)
    setFile(null)
    setCrop(undefined)

    handleUpload(cropFile)

  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setUploadedImageUrl(URL.createObjectURL(uploadedFile))
      setShowCropModal(true)
    }
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
    const uploadedFile = e.dataTransfer?.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setUploadedImageUrl(URL.createObjectURL(uploadedFile))
      setShowCropModal(true)
    }
  }

  function handleTryAgain() {
    setUploadedImageUrl(null)
    setData(null)
    setError(null)
  }

  return (
    <div className="flex flex-col gap-8">

      {(showCropModal && uploadedImageUrl) && 
        <Dialog defaultOpen onOpenChange={() => setShowCropModal(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Click and drag on the image to crop it</DialogTitle>
              <DialogDescription>Make sure the only thing in the image is the lesion (with minimal skin around it)</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6">
              <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                  <img ref={imgRef} src={uploadedImageUrl} alt="user uploaded image of lesion" className='rounded-md'/>
              </ReactCrop>
          
              <Button onClick={handleCrop}>Calculate result <MoveRight /></Button>
            </div>
          </DialogContent>
        </Dialog>}

      <Alert variant="destructive" className="border-red-300 bg-red-50">
        <AlertCircleIcon />
        <AlertTitle>Not medical advice! Results are not reliable</AlertTitle>
        <AlertDescription>
          This website was made as a hobby project and results are not medical advice.
        </AlertDescription>
      </Alert>
        <div>
          <h1 className="text-3xl font-black mb-2">
              Try now
          </h1>
          <p className="text-neutral-600">Upload an image of a lesion and receive our algorithm&apos;s estimate of it being Melanoma or not. Our algorithm will try to analyze the image using the same ABC features that dermatologists use in clinical practice.</p>
          <p className="mt-4 text-sm">Just want to test? <a href="/example.png" download className="underline font-bold">Click here</a> to download a test image you can use.</p>
        </div>

      {/* upload outer wrapper */}

      {(!data) && (
        <div className="border border-sidebar-border p-5 rounded-md">

        <p className="font-semibold">Upload lesion image</p>
        <p>Drag and drop an image or click to upload.</p>
        
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
            <p className="text-center">The algorithm detects:</p>
            <p className={clsx(data.isMelanoma ? 'text-red-700' : 'text-green-700', "mt-4 text-4xl font-bold text-center")}>{data.isMelanoma ? 'Melanoma' : 'No Melanoma'}<sup className="text-gray-400">*</sup></p>
          </div>

          <Button variant={'outline'} onClick={handleTryAgain} className="sm:hidden">Try again with another image <ImagePlus className="size-5"/></Button>

          {/* images */}
          <div className="flex flex-col items-center gap-10 flex-wrap sm:flex-row sm:justify-center sm:gap-5">
            {/* uploaded image */}
            {uploadedImageUrl && (
              <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
                <p>Your uploaded image:</p>
                <div className="relative w-70 h-70">
                  <Image src={uploadedImageUrl} alt="User uploaded image of lesion" fill className="rounded-sm w-70 object-contain"/>
                </div>
              </div>
            )}
            {/* hair removed */}
            <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
              <p>Result from removing hair:</p>
              <div className="relative w-70 h-70">
                <Image src={data.hairless_image} alt="User uploaded image of leasion with hair removed" fill className="rounded-sm w-70 object-contain"/>
              </div>
            </div>
            
            {/* mask */}
            <div className="flex flex-col items-center gap-2 font-semibold sm:max-w-70">
              <p>Mask of the lesion detected:</p>
              <div className="relative w-70 h-70">
                <Image src={data.mask_image} alt="Mask of lesion in user uploaded image" fill className="rounded-sm object-contain"/>
              </div>
            </div>
          </div>

          {/* desktop try another image */}
          <Button variant={'outline'} onClick={handleTryAgain} className="hidden sm:flex">Try again with another image <ImagePlus className="size-5"/></Button>

          <div className="text-gray-500 text-sm text-left flex flex-col gap-2">
            <p>
              {/* Your exact result is an estimated probability of {Math.round(data.probability * 10000) / 100}%.  */}
              This result is based on a logistic regression algorithm. The aim is to maximize F1-score (harmonic balance between precision and recall), which is done by classifying everthing above an estimated probability of 56,3% as Melanoma.
            </p>
            <p>
              The standardized features detected was:
              Assymetry score: {Math.round(data.features[0] * 100) / 100}, 
              Border irregularity score: {Math.round(data.features[1] * 100) / 100},
              Color score: {Math.round(data.features[2] * 100) / 100}
            </p>
          </div>

        </div>
      ) : error ? error && <p className="text-center mt-6 text-red-600 text-xl font-bold">{error}</p> : null}
      
    </div>
  )
}