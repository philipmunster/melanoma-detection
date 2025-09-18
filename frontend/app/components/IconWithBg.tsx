import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

const COLOR_STYLES = {
  red: 'bg-red-600',
  blue: 'bg-blue-600',
  gray: 'bg-gray-600',
} as const

type ColorKey = keyof typeof COLOR_STYLES

type SizeKey = 'sm' | 'md' | 'lg'

const SIZE_STYLES: Record<SizeKey, { wrapper: string; icon: string }> = {
  sm: { wrapper: 'h-10 aspect-square', icon: 'h-5 w-5' },
  md: { wrapper: 'h-14 aspect-square', icon: 'h-8 w-8' },
  lg: { wrapper: 'h-16 aspect-square', icon: 'h-9 w-9' },
}

type IconWithBgProps = HTMLAttributes<HTMLDivElement> & {
  Icon: LucideIcon
  color?: ColorKey
  size?: SizeKey
  iconClassName?: string
}

export default function IconWithBg({
  Icon,
  color = 'gray',
  size = 'md',
  className,
  iconClassName,
  ...divProps
}: IconWithBgProps) {
  return (
    <div
      {...divProps}
      className={clsx(
        'flex items-center justify-center rounded-lg',
        SIZE_STYLES[size].wrapper,
        COLOR_STYLES[color],
        // put consumer-provided className last so it can override defaults
        className,
      )}
    >
      <Icon className={clsx(SIZE_STYLES[size].icon, 'text-white', iconClassName)} />
    </div>
  )
}