import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-6 sm:px-10', className)}>{children}</div>
}

type SectionProps = {
  id?: string
  labelledBy?: string
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={clsx('py-20 sm:py-28', className)}>
      {children}
    </section>
  )
}
