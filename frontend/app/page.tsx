import { Button } from "@/components/ui/button";
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex flex-col">
      <h1 className="text-4xl font-black mb-1">
        Melanoma Cancer 
        <span className="block text-red-600">Detection Algorithm</span>
      </h1>
      <p className="text-neutral-600 text-lg mb-6">
        This algorithm was made as a student project on the IT-University in Copenhagen, with the goal of training an algorithm to correctly identify melanoma cases.
      </p>
      <div className="flex flex-col gap-3">
        <Link href='/'>
          <Button className="w-full sm:w-auto bg-red-600 py-5 hover:bg-red-500">
            <p>Try algorithm now</p>
            <MoveRight />
          </Button>
        </Link>
        <Link href='/'>        
          <Button className="w-full sm:w-auto py-5" variant={'outline'}>
            View Research
          </Button>
        </Link>
      </div>
    </section>
  );
}
