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
    <div className="flex flex-col gap-14">    
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-black">
          Melanoma Cancer 
          <span className="block text-red-600">Detection Algorithm</span>
        </h1>
        <p className="text-neutral-600 text-lg">
          Upload an image of a lesion on your skin and our model will estimate the probability of melanoma cancer in the lesion. This algorithm was made as a student project on the IT-University in Copenhagen, with the goal of training an algorithm to correctly identify melanoma cases.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <Link href='/try'>
            <Button className="w-full sm:w-auto bg-red-600 py-5 hover:bg-red-500">
              <p>Try algorithm now</p>
              <MoveRight />
            </Button>
          </Link>
          <Link href='/research'>        
            <Button className="w-full sm:w-auto py-5" variant={'outline'}>
              View Research
            </Button>
          </Link>
        </div>
      </section>
    
      <div className="flex flex-col gap-20"> 
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
          Our algorithm is trained on the comprehensive PAD-UFES-20 dataset, featuring thousands of high-resolution dermatological images.
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
          Melanoma lesions are marked by asymmetry, irregular borders, and color variation—known as the ABC model. We tested methods to remove hair and extract these features with computer vision algorithms.
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
          Logistic regression delivered the best AUC and F1 score among tested models. To handle class imbalance, we used oversampling and stratified k-fold cross-validation. Read the <Link className="underline" href='/'>research report</Link> for details.
        </ImageText>
      </div>

      <section className="bg-red-600 p-8 rounded-md flex flex-col items-center gap-5">
        <h3 className="text-white text-xl font-bold">Try for ourself</h3>
        <p className="text-white text-center sm:max-w-2/3">Try to upload an image of a lesion on your skin. Within a few seconds you will get back an our algorithms estimate of the probability of it being melanoma cancer.</p>
        <Button className="w-full sm:w-auto bg-white py-5 text-black hover:text-white">
          <p>Try now</p>
          <MoveRight />
        </Button>
      </section>
    </div>
  );
}
