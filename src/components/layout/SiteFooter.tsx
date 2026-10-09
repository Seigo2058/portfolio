import Link from '../ui/Link'
import Icon from '../ui/Icon'
import { Container } from '../ui/Layout'
import { profile } from '../../data/profile'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold tracking-wide text-ink">
          {profile.nameJa}
          <span className="ml-3 text-xs font-medium tracking-wider text-ink-muted">{profile.nameEn}</span>
        </p>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href={profile.github} external variant="nav" className="inline-flex items-center gap-2">
              <Icon name="github" />
              GitHub
            </Link>
          </li>
          <li>
            <Link href={`mailto:${profile.email}`} variant="nav" className="inline-flex items-center gap-2">
              <Icon name="mail" />
              Mail
            </Link>
          </li>
        </ul>
      </Container>
      <Container className="pb-8">
        <p className="text-xs text-ink-muted">© {profile.nameEn}</p>
      </Container>
    </footer>
  )
}
