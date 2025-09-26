import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div>
      <div className='flex flex-col items-start gap-5'>
        <div>
          <h1 className="text-3xl font-black mb-2">
              Project paper
          </h1>
          <p className="text-neutral-600">Explore our project paper detailing the methodology, training process, and performance evaluation of our melanoma detection algorithm.</p>
        </div>
      
        <a href='/project.pdf' download>
          <Button variant={'destructive'}>
            Download full paper <Download />
          </Button>
        </a>
        <div className='w-full'>
          <div className='max-w-250 mx-auto'>
            <object type='application/pdf' data='/project.pdf' className='w-full h-183 rounded-md'>
              <div className="text-sm border border-sidebar-border p-5 rounded-md flex flex-col gap-1">
                  <p>Your browser cannot display an embedded PDF.</p>
                  <a
                    href='/project.pdf'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Click here to open the PDF in a new tab.
                  </a>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  )
}