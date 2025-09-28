import { RefObject } from "react"
import type { Crop } from 'react-image-crop'
  
export async function cropImage(file: File | null, crop: Crop | undefined, imgRef: RefObject<HTMLImageElement | null>): Promise<File | null> {
    if (!file) return null
    
    const imageEl = imgRef.current

    if (!crop || !imageEl) {
      return file
    }

    // Displayed size vs natural pixel size
    const displayedW = imageEl.clientWidth
    const displayedH = imageEl.clientHeight
    const naturalW = imageEl.naturalWidth
    const naturalH = imageEl.naturalHeight

    const scaleX = naturalW / displayedW
    const scaleY = naturalH / displayedH

    const sx = Math.max(0, Math.round(crop.x * scaleX))
    const sy = Math.max(0, Math.round(crop.y * scaleY))
    const sWidth = Math.min(naturalW - sx, Math.round(crop.width * scaleX))
    const sHeight = Math.min(naturalH - sy, Math.round(crop.height * scaleY))

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, sWidth)
    canvas.height = Math.max(1, sHeight)
    const ctx = canvas.getContext('2d')!

    // Draw from the same <img> element (no need to reload)
    ctx.drawImage(imageEl, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight)

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name, { type: file.type })
          resolve(croppedFile)
        }
      }, file.type)
    })
  }