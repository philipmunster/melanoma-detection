import { Button } from "@/components/ui/button"
import { Upload, ImagePlus, AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TryPage() {
  return (
    <div className="flex flex-col gap-8 my-5">
    <Alert variant="destructive" className="border-red-300 bg-red-50">
      <AlertCircleIcon />
      <AlertTitle>Do not take these results seriously!</AlertTitle>
      <AlertDescription>
        This algorithm can make mistakes. Always consult a doctor.
      </AlertDescription>
    </Alert>
      <div>
        <h1 className="text-3xl font-black mb-2">
            Try now
        </h1>
        <p>Upload an image of a mole and receive our algorithm's estimated probability of melanoma. Our AI will analyze the image using the same ABC features that dermatologists use in clinical practice.</p>
      </div>

    <div className="border border-sidebar-border p-5 rounded-md">
      <p className="font-semibold">Upload Lesion Image</p>
      <p>Drag and drop an image file or click to browse.</p>

      <div className="border border-neutral-300 border-dashed px-5 py-12 mt-5 rounded-md flex flex-col gap-5 items-center hover:bg-neutral-100">
        <Upload className="size-10"/>
        <div>
          <p className="text-lg text-center">Drag and drop an image here</p>
          <p className="text-gray-600 text-sm mt-2 text-center">Supported formats: JPG and PNG</p>
        </div>

        <Button>Browse files <ImagePlus /></Button>
      </div>

    </div>
    
    </div>
  )
}