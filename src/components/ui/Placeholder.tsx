import clsx from 'clsx'

type PlaceholderProps = {
  /** Accessible description; becomes the image alt once replaced. */
  alt: string
  label?: string
  ratio?: 'video' | 'landscape' | 'portrait' | 'screen'
  src?: string
  className?: string
}

const ratios = {
  video: 'aspect-video',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  /** PC screenshot (1440×900). */
  screen: 'aspect-[16/10]',
}

/** Image slot. Shows a neutral placeholder until `src` is provided. */
export default function Placeholder({ alt, label, ratio = 'landscape', src, className }: PlaceholderProps) {
  const frame = clsx('relative overflow-hidden rounded-2xl bg-accent-soft', ratios[ratio], className)
  if (src) {
    return (
      <div className={frame}>
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" loading="lazy" />
      </div>
    )
  }
  return (
    <div role="img" aria-label={alt} className={frame}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-surface)_1px,transparent_1px),linear-gradient(90deg,var(--color-surface)_1px,transparent_1px)] [background-size:2rem_2rem]"
      />
      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        {label && (
          <span className="font-sans text-2xl font-bold tracking-tight text-accent/80 sm:text-3xl text-ja">
            {label}
          </span>
        )}
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent/70">Image placeholder</span>
      </div>
    </div>
  )
}
