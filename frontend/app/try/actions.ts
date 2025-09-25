'use server'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File

  // error handling
  if (!file) {
    throw new Error('File could not be identified. Please try again.')
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5 MB. Please upload a smaller image.')
  }
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    throw new Error('Invalid file type. Please upload a .png, .jpg or .jpeg file.')
  }

  // const backendFormData = new FormData()
  // backendFormData.append('file', file)
  // console.log(backendFormData)
  
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'

  const res = await fetch(`${backendUrl}/process?api_key=${process.env.API_KEY}`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    let errorMessage = 'Issue with processing the image. Please try another image.'
    try {
      const errorData = await res.json()
      console.log(errorData)
      errorMessage = errorData?.error || errorMessage
    } catch {
      // don't catch anything cause we throw the default error message then
    }
    throw new Error(errorMessage)
  }

  const data = await res.json()

  return data
} 