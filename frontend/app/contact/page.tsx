import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-2">Contact</h1>
      <p className="text-neutral-600">
        If you have any questions about this project, feel free to reach out to me on my email pmh@pmhconsulting.dk.
      </p>
      <Link href='mailto:pmh@pmhconsulting.dk' target='_blank'>      
        <Button className='mt-5'>
          Email me <Send />
        </Button>
      </Link>
    </div>
  )
}