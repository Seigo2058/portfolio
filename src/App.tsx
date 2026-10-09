import { useEffect } from 'react'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import { getWork } from './data/works'
import { useHash, useRoute } from './lib/router'
import { profile } from './data/profile'

export default function App() {
  const hash = useHash()
  const route = useRoute()
  const work = route.name === 'work' ? getWork(route.slug) : undefined
  const section = route.name === 'home' ? route.section : undefined

  useEffect(() => {
    // Scroll to the requested section after render, or to the top on page change.
    const target = section ? document.getElementById(section) : null
    if (target) target.scrollIntoView({ block: 'start' })
    else window.scrollTo({ top: 0 })
    document.title = route.name === 'about' ? `About me | ${profile.nameJa}` : work ? `${work.title} | ${profile.nameJa}` : `${profile.nameJa} | Portfolio`
  }, [hash, section, work])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        本文へスキップ
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {route.name === 'about' ? (
          <AboutPage />
        ) : work?.detail ? <WorkPage key={work.slug} work={{ ...work, detail: work.detail }} /> : <HomePage />}
      </main>
      <SiteFooter />
    </div>
  )
}
