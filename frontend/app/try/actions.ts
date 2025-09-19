export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  console.log(file)

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

  const backendFormData = new FormData()
  backendFormData.append('file', file)
  

  const res = await fetch('http://placeholder-backend-url/process', {
    method: 'POST',
    body: backendFormData
  })
  if (!res.ok) {
    throw new Error('Issue with processing the image. Please try another image.')
  }
  const data = await res.json()

  console.log(data)
  return data
}