import clsx from 'clsx'

type TagProps = { children: string; tone?: 'neutral' | 'accent' }

/** Small label for skills and technologies. */
export default function Tag({ children, tone = 'neutral' }: TagProps) {
  return (
    <li
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 tracking-wide',
        tone === 'neutral' && 'bg-surface text-ink border border-line',
        tone === 'accent' && 'bg-accent-soft text-accent-strong',
      )}
    >
      {children}
    </li>
  )
}

export function TagList({ items, tone, className }: { items: string[]; tone?: TagProps['tone']; className?: string }) {
  return (
    <ul className={clsx('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <Tag key={item} tone={tone}>
          {item}
        </Tag>
      ))}
    </ul>
  )
}
