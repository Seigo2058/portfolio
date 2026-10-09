import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import clsx from 'clsx'
import Icon from './Icon'
import { rescroll } from '../../lib/router'

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Omit to render a link that looks interactive but has no destination yet. */
  href?: string
  external?: boolean
  variant?: 'inline' | 'nav' | 'plain'
  children: ReactNode
}

const variants = {
  inline:
    'text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors',
  nav: 'text-ink-muted hover:text-ink transition-colors',
  plain: '',
}

/** Base anchor. Handles external targets and not-yet-built destinations. */
export default function Link({
  href,
  external,
  variant = 'plain',
  className,
  children,
  onClick,
  ...rest
}: LinkProps) {
  const pending = href === undefined
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pending) event.preventDefault()
    else if (href.startsWith('#/') && href === (window.location.hash || '#/')) {
      event.preventDefault()
      rescroll(href)
    }
    onClick?.(event)
  }
  return (
    <a
      href={pending ? '#' : href}
      onClick={handleClick}
      title={pending ? '準備中' : rest.title}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={clsx(variants[variant], className)}
      {...rest}
    >
      {children}
      {external && <span className="sr-only">(新しいタブで開きます)</span>}
    </a>
  )
}

export function ArrowLink({ children, ...props }: LinkProps) {
  return (
    <Link
      variant="plain"
      {...props}
      className={clsx(
        'group inline-flex items-center gap-2 font-medium text-accent',
        props.className,
      )}
    >
      <span className="border-b border-transparent group-hover:border-current transition-colors">
        {children}
      </span>
      <Icon
        name={props.external ? 'arrow-up-right' : 'arrow-right'}
        className="size-4 transition-transform duration-300 ease-calm group-hover:translate-x-0.5"
      />
    </Link>
  )
}
