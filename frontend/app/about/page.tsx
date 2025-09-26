import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-2">About</h1>
      <p className="text-neutral-600">
        Learn more about this project and the ideas behind it.
      </p>

      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">Who built this project?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mb-2">
            <p>
              The algorithm was built by Asta Trier Wang, Bruno Alessandro Damian Modica Figueira, Jan Peter
              Cardell, Maja Kalina Oska, and Philip Münster-Hansen. This algorithm was developed as part of the
              “Projects in Data Science” course at the IT University of Copenhagen.
            </p>
            <p>
              The website and backend orchestration were built as a hobby project by Philip Münster-Hansen.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">What is the motivation behind the project?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mb-2">
            <p>
              Building and testing the algorithm was a lot of fun. However, creating algorithms in controlled
              environments and making them work in the real world are two very different challenges.
            </p>
            <p>
              I built this website to try and take this project into the real world so friends and family can try the technology themselves.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">How reliable is the algorithm?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mb-2">
            <p>
              Melanoma detection is extremely complex, and achieving reliable results is not easy. Unfortunately,
              this project is no exception. Result are very unstable and should therefore not be seen as medical advice.
            </p>
            <p>
              The biggest challenge is detecting the lesion border in the image, which is complicated by noise such
              as hair and shadows. I’ve tried to mitigate this by letting users crop the image before upload so that
              only the lesion remains in frame.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold">How can I contact you?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mb-2">
            <p>
              You can contact me by filling out{" "}
              <Link href="/contact" className="underline">
                this form
              </Link>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}