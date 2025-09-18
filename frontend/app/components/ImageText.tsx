
import { Badge } from "@/components/ui/badge"
import IconWithBg from '@/app/components/IconWithBg'
import type { LucideIcon } from "lucide-react"
import { ReactElement, ReactHTMLElement, ReactNode } from "react"
import clsx from "clsx"

type badgeInfo = {
  text: string
  variant: "default" | "secondary" | "destructive" | "outline" | null | undefined
}

type ImageTextProps = {
  Icon?: LucideIcon
  title: string
  badges?: badgeInfo[],
  Image?: ReactElement,
  ImageSide?: 'right' | 'left'
  children: ReactNode
}

export default function ImageText({ Icon, title, badges, Image, ImageSide = 'right', children }: ImageTextProps) {
  const badgeElements = badges 
    ? badges.map( (badge, index) => <Badge key={index} variant={badge.variant}>{badge.text}</Badge>)
    : null

  return (
    <div className=" flex flex-col gap-4 items-center sm:flex-row sm:gap-16 sm:justify-between sm:h-70">
      <div className={clsx(ImageSide === 'right' ? 'sm:order-1' : '', "w-full h-80 sm:w-1/3")}>
        {Image}
      </div>
      <div className="flex flex-col gap-4 sm:w-2/3">
        <div className="flex items-center">
          {Icon && <IconWithBg Icon={Icon} color='red' size="sm"/>}
          <h3 className="ml-4 text-xl font-bold">{title}</h3>
        </div>
        <p className="leading-relaxed">{children}</p>
        <div className="flex gap-2">
          {badges && badgeElements}
        </div>
      </div>
    </div>
  )
}