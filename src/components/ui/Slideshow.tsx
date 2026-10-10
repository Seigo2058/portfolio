import { useEffect, useState } from 'react'
import clsx from 'clsx'

export type Slide = {
  src: string
  alt: string
  /** CSS object-position, to keep the subject in frame when the photo is cropped. */
  position?: string
}

type SlideshowProps = {
  slides: Slide[]
  label: string
  /** Milliseconds each slide stays on screen. */
  interval?: number
  className?: string
}

/** Crossfading photo slideshow with dot navigation. Doesn't auto-advance under reduced motion. */
export default function Slideshow({ slides, label, interval = 5000, className }: SlideshowProps) {
  const [index, setIndex] = useState(0)

  // Keyed on `index`, so picking a slide by hand restarts the timer.
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), interval)
    return () => window.clearTimeout(timer)
  }, [index, interval, slides.length])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={clsx('relative overflow-hidden bg-accent-soft', className)}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== index}
          loading={i === 0 ? 'eager' : 'lazy'}
          style={{ objectPosition: slide.position }}
          className={clsx(
            'absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[1600ms] ease-calm motion-reduce:transition-none',
            i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          )}
        />
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-5 right-5 flex items-center gap-1 rounded-full bg-surface/45 p-1 backdrop-blur-sm">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}枚目の写真を表示`}
              aria-current={i === index}
              className="flex size-7 items-center justify-center rounded-full"
            >
              <span
                className={clsx(
                  'block h-1.5 rounded-full transition-all duration-500 ease-calm',
                  i === index ? 'w-4 bg-accent' : 'w-1.5 bg-ink/35',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
