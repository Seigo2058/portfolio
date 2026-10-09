import Link from '../ui/Link'
import { paths } from '../../lib/router'
import { profile } from '../../data/profile'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href={paths.home} className="flex items-baseline gap-3" aria-label={`${profile.nameJa} トップページ`}>
          <span className="text-base font-bold tracking-wide text-ink">{profile.nameJa}</span>
          <span className="hidden text-xs font-medium tracking-wider text-ink-muted sm:inline">{profile.nameEn}</span>
        </Link>
        <nav aria-label="メイン">
          <ul className="flex items-center gap-7 text-sm font-medium">
            <li>
              <Link href={paths.works} variant="nav">
                Works
              </Link>
            </li>
            <li>
              <Link href={paths.about} variant="nav">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
