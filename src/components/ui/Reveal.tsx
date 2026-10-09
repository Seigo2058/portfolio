import { useEffect, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'

type RevealProps = {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3
  className?: string
}

/** Subtle fade-up when the element enters the viewport. Disabled under reduced motion. */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-visible={visible} data-delay={delay} className={clsx('reveal', className)}>
      {children}
    </div>
  )
}
