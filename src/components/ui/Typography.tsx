import type { ReactNode } from 'react'
import clsx from 'clsx'

type HeadingProps = {
  level: 1 | 2 | 3
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm'
  className?: string
  id?: string
  children: ReactNode
}

const headingSizes = {
  display: 'text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight font-bold',
  xl: 'text-3xl sm:text-4xl lg:text-5xl leading-snug tracking-tight font-bold',
  lg: 'text-2xl sm:text-3xl leading-snug tracking-tight font-bold',
  md: 'text-xl sm:text-2xl leading-snug font-bold',
  sm: 'text-lg leading-snug font-bold',
}

export function Heading({ level, size = 'lg', className, id, children }: HeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag id={id} className={clsx('text-ink text-ja', headingSizes[size], className)}>
      {children}
    </Tag>
  )
}

type TextProps = {
  size?: 'lg' | 'md' | 'sm'
  tone?: 'default' | 'muted'
  className?: string
  children: ReactNode
}

const textSizes = {
  lg: 'text-base sm:text-lg leading-loose',
  md: 'text-base leading-loose',
  sm: 'text-sm leading-relaxed',
}

export function Text({ size = 'md', tone = 'default', className, children }: TextProps) {
  return (
    <p
      className={clsx(
        'text-ja',
        textSizes[size],
        tone === 'muted' ? 'text-ink-muted' : 'text-ink',
        className,
      )}
    >
      {children}
    </p>
  )
}

/** Small uppercase Latin label placed above section headings. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        'flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
    </p>
  )
}
