import { Button } from "@/components/ui/button";
import { MoveRight, Database, ChartColumn, Search } from 'lucide-react'
import Link from 'next/link'
import ImageText from '@/app/components/ImageText'
import ImageSection1 from '@/public/home-1.jpg'
import ImageSection2 from '@/public/home-2.png'
import ImageSection3 from '@/public/home-3.png'
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-14 my-5">    
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-black">
          Melanoma Cancer 
          <span className="block text-red-600">Detection Algorithm</span>
        </h1>
        <p className="text-neutral-600 text-lg">
          Upload an image of a leasion on your skin and our model will estimate the probability of melanoma cancer in the leasion. This algorithm was made as a student project on the IT-University in Copenhagen, with the goal of training an algorithm to correctly identify melanoma cases.
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
          text: '2298 images',
          variant: 'outline'
          },
          {
          text: 'Biopsy-proven labels',
          variant: 'outline'
          },
          {
          text: '26 features',
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
        Icon={Search} 
        title='ABC model' 
        badges={[
          {
          text: 'Masking',
          variant: 'outline'
          },
          {
          text: 'Hair removal',
          variant: 'outline'
          },
          {
          text: 'ABC features',
          variant: 'outline'
          },
        ]}
        Image={
          <Image 
          src={ImageSection2}
          alt='bla'
          width={3456}
          height={5184}
          className="w-full h-full object-cover rounded-md"
          />
        }
        ImageSide="left"
      >
        Melanoma lesions are often characterized by asymmetry, irregular border, and variation of color in their architectural features. This is known by dermatologists as the ABC model.
        Therefore, we developed and tested different methods to first remove hair and then extract these features using computer vision algorithms. 
      </ImageText>

      <ImageText 
        Icon={ChartColumn} 
        title='Training and testing' 
        badges={[
          {
          text: 'AUC 95% CI: 0.579 – 0.941',
          variant: 'outline'
          },
          {
          text: 'Oversampling',
          variant: 'outline'
          },
        ]}
        Image={
          <Image 
          src={ImageSection3}
          alt='bla'
          width={3456}
          height={5184}
          className="w-full h-full object-cover rounded-md"
          />
        }
        ImageSide="right"
      >
        After testing several classification models, logistic regression achieved the best results based on AUC and F1 score. To address class imbalance, we applied oversampling and stratified k-fold cross-validation. Read the <Link className="underline" href='/'>research report</Link> for details.
      </ImageText>

      <section className="bg-[#f3f4f6] p-6 rounded-md flex flex-col items-center gap-5">
        <h3 className="text-white text-xl font-bold">Test the algorithm</h3>
        <p>wienfwopifehnwipeof</p>
        <Button className="w-full sm:w-auto bg-white py-5 text-red-600">
          <p>Try algorithm now</p>
          <MoveRight />
        </Button>
      </section>
    </div>
  );
}
