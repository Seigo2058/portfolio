import clsx from 'clsx'
import type { ImageSlot } from '../../data/works'

type DeviceMockupProps = {
  pc: ImageSlot
  sp?: ImageSlot
  ratio?: 'video' | 'landscape'
  className?: string
}

/** Frame and device positions per ratio, as % of the frame (sized in cqw so they scale with it). */
const layouts = {
  video: {
    frame: 'aspect-video',
    browser: 'left-[8%] top-[9%] w-[66%]',
    browserAlone: 'left-[15%] top-[9%] w-[70%]',
    phone: 'right-[9%] bottom-[7%] w-[18%]',
  },
  landscape: {
    frame: 'aspect-[4/3]',
    browser: 'left-[6%] top-[10%] w-[78%]',
    browserAlone: 'left-[8%] top-[13%] w-[84%]',
    phone: 'right-[6%] bottom-[8%] w-[22%]',
  },
}

/** PC screenshot in a browser window, overlapped by the smartphone screenshot when one is given. */
export default function DeviceMockup({ pc, sp, ratio = 'landscape', className }: DeviceMockupProps) {
  const layout = layouts[ratio]
  return (
    <div className={clsx('@container relative overflow-hidden rounded-2xl bg-accent-soft', layout.frame, className)}>
      <div
        className={clsx(
          'absolute overflow-hidden rounded-[1cqw] bg-surface shadow-[0_2cqw_5cqw_-1.5cqw_rgb(21_61_46/0.35)]',
          sp ? layout.browser : layout.browserAlone,
        )}
      >
        <div aria-hidden="true" className="flex items-center gap-[0.6cqw] border-b border-line px-[1.4cqw] py-[1.1cqw]">
          <span className="size-[0.9cqw] rounded-full bg-line-strong" />
          <span className="size-[0.9cqw] rounded-full bg-line-strong" />
          <span className="size-[0.9cqw] rounded-full bg-line-strong" />
        </div>
        <img src={pc.src} alt={pc.alt} className="block aspect-[16/10] w-full object-cover object-top" loading="lazy" />
      </div>
      {sp && (
        <div
          className={clsx(
            'absolute rounded-[3.2cqw] bg-ink p-[0.8cqw] shadow-[0_2cqw_4cqw_-1cqw_rgb(21_61_46/0.45)]',
            layout.phone,
          )}
        >
          <img
            src={sp.src}
            alt={sp.alt}
            className="block aspect-[390/844] w-full rounded-[2.5cqw] object-cover object-top"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}
