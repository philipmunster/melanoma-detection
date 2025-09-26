import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-2">
          About
      </h1>
      <p className="text-neutral-600">
        Get to know more about this project and the ideas behind it.
      </p>

    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Who build this project?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            
          </p>
          <p>
            
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is the motivation behind the project?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            
          </p>
          <p>
            
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How reliable is the algorithm?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            
          </p>
          <p>
            
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}