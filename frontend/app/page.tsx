import { Button } from "@/components/ui/button";
import { MoveRight, Database } from 'lucide-react'
import Link from 'next/link'
import ImageText from '@/app/components/ImageText'
import ImageSection1 from '@/public/home-1.jpg'
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-14">    
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-black">
          Melanoma Cancer 
          <span className="block text-red-600">Detection Algorithm</span>
        </h1>
        <p className="text-neutral-600 text-lg">
          This algorithm was made as a student project on the IT-University in Copenhagen, with the goal of training an algorithm to correctly identify melanoma cases.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
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

      <ImageText 
        Icon={Database} 
        title='PAD-UFES-20 Dataset' 
        badges={[
          {
          text: '+1000 images',
          variant: 'outline'
          },
          {
          text: 'Biopsy-proven labels',
          variant: 'outline'
          },
          {
          text: 'Up to 26 features',
          variant: 'outline'
          },
        ]}
        Image={
          <Image 
          src={ImageSection1}
          alt='bla'
          width={3456}
          height={5184}
          className="w-full h-full object-cover rounded-md"
          />
        }
        ImageSide="right"
      >
        Our algorithm leverages the comprehensive PAD-UFES-20 dataset, featuring thousands of high-resolution dermatological images. This diverse training foundation enables accurate identification of complex skin lesion patterns across all demographics and skin types.
      </ImageText>

      <ImageText 
        Icon={Database} 
        title='PAD-UFES-20 Dataset' 
        badges={[
          {
          text: '+1000 images',
          variant: 'outline'
          },
          {
          text: 'Biopsy-proven labels',
          variant: 'outline'
          },
          {
          text: 'Up to 26 features',
          variant: 'outline'
          },
        ]}
        Image={
          <Image 
          src={ImageSection1}
          alt='bla'
          width={3456}
          height={5184}
          className="w-full h-full object-cover rounded-md"
          />
        }
        ImageSide="left"
      >
        Our algorithm leverages the comprehensive PAD-UFES-20 dataset, featuring thousands of high-resolution dermatological images. This diverse training foundation enables accurate identification of complex skin lesion patterns across all demographics and skin types.
      </ImageText>
    </div>
  );
}
