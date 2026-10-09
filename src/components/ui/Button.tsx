import clsx from 'clsx'
import Link, { type LinkProps } from './Link'
import Icon, { type IconName } from './Icon'

type ButtonProps = Omit<LinkProps, 'variant'> & {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  leadingIcon?: IconName
  trailingIcon?: IconName
}

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'bg-surface text-ink border border-line-strong hover:border-ink',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

/** Navigational button (renders an anchor). */
export default function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link
      {...rest}
      className={clsx(
        'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-colors duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {leadingIcon && <Icon name={leadingIcon} className="size-4.5" />}
      <span>{children}</span>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          className="size-4 transition-transform duration-300 ease-calm group-hover:translate-x-0.5"
        />
      )}
    </Link>
  )
}
