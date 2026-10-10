import clsx from "clsx"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"
import Link from "../components/ui/Link"
import DeviceMockup from "../components/ui/DeviceMockup"
import Placeholder from "../components/ui/Placeholder"
import Reveal from "../components/ui/Reveal"
import Slideshow from "../components/ui/Slideshow"
import { TagList } from "../components/ui/Tag"
import { Eyebrow, Heading, Text } from "../components/ui/Typography"
import { Container, Section } from "../components/ui/Layout"
import { heroPhotos, profile } from "../data/profile"
import { works, workHref, type Work } from "../data/works"
import { paths } from "../lib/router"

function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-12 py-20 lg:flex-row lg:items-center"
    >
      <Container>
        <div className="flex justify-start">
          <div className="flex w-full max-w-xl flex-col gap-10 lg:w-1/2 lg:pr-12">
            <Reveal>
              <Heading level={1} size="display" id="hero-name">
                {profile.nameEn}
                <span className="mt-3 block text-xl font-medium tracking-wide text-ink-muted sm:text-2xl">
                  {profile.nameJa}
                </span>
              </Heading>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                {profile.affiliation}
                <br />
                {profile.graduation}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
      {/* Phones: below the name. lg+: fills the right half of the first view. */}
      <Slideshow
        slides={heroPhotos}
        label={`${profile.nameJa}の写真`}
        className="mx-6 aspect-[4/3] rounded-3xl sm:mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:aspect-auto lg:w-1/2 lg:rounded-none"
      />
      <Link
        href={paths.works}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:left-1/4 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted hover:text-ink sm:flex"
      >
        Scroll
        <span aria-hidden="true" className="h-10 w-px bg-line-strong" />
      </Link>
    </section>
  )
}

function Profile() {
  return (
    <Section
      labelledBy="profile-title"
      className="border-t border-line bg-surface"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Profile</Eyebrow>
            <Heading level={2} size="xl" id="profile-title" className="mt-4">
              自己紹介
            </Heading>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <dl className="space-y-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Name
                </dt>
                <dd className="mt-4 text-base leading-loose text-ink text-ja sm:text-lg">
                  {profile.nameJa}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Belong to
                </dt>
                <dd className="mt-4 text-base leading-loose text-ink text-ja sm:text-lg">
                  {profile.affiliation}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Job Hunting
                </dt>
                <dd className="mt-4 text-base leading-loose text-ink text-ja sm:text-lg">
                  {profile.role}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Skills
                </dt>
                <dd>
                  <TagList items={profile.skills} className="mt-4" />
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  Strength
                </dt>
                <dd className="mt-4 text-base leading-loose text-ink text-ja sm:text-lg">
                  {profile.catchcopy}
                </dd>
              </div>
            </dl>
            <Button href={paths.about} size="lg" trailingIcon="arrow-right" className="mt-12">
              About meを見る
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function WorkFeature({ work, index }: { work: Work; index: number }) {
  const number = String(index + 1).padStart(2, "0")
  const total = String(works.length).padStart(2, "0")
  return (
    <li className="flex min-h-svh items-center border-t border-line py-20 lg:min-h-[85svh]">
      <Reveal className="w-full">
        <Link
          href={workHref(work, paths.work)}
          className="group grid gap-8 rounded-3xl lg:grid-cols-12 lg:items-center lg:gap-14"
        >
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl transition-transform duration-700 ease-calm group-hover:scale-[1.015]">
              {work.thumbnails ? (
                <DeviceMockup {...work.thumbnails} />
              ) : (
                <Placeholder alt={`${work.title} のサムネイル`} label={work.title} />
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm font-semibold tracking-widest text-accent">
              {number}
              <span className="text-ink-muted"> / {total}</span>
            </p>
            <Heading
              level={3}
              size="lg"
              className="mt-4 transition-colors group-hover:text-accent"
            >
              {work.title}
            </Heading>
            <Text tone="muted" className="mt-4">
              {work.summary}
            </Text>
            <TagList items={work.tags} tone="accent" className="mt-6" />
            <span
              className={clsx(
                "mt-10 inline-flex items-center gap-3 text-sm font-medium text-accent",
              )}
            >
              <span className="border-b border-transparent pb-0.5 group-hover:border-current">
                作品を見る
              </span>
              <span className="flex size-10 items-center justify-center rounded-full border border-accent/30 transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                <Icon name="arrow-right" />
              </span>
            </span>
          </div>
        </Link>
      </Reveal>
    </li>
  )
}

function Works() {
  return (
    <Section id="works" labelledBy="works-title" className="pb-0 sm:pb-0">
      <Container>
        <Reveal className="flex items-end justify-between gap-6 pb-4">
          <div>
            <Eyebrow>Works</Eyebrow>
            <Heading level={2} size="xl" id="works-title" className="mt-4">
              作品一覧
            </Heading>
          </div>
          <p className="font-sans text-sm font-medium text-ink-muted">
            {works.length} projects
          </p>
        </Reveal>
        <ol className="mt-10">
          {works.map((work, index) => (
            <WorkFeature key={work.slug} work={work} index={index} />
          ))}
        </ol>
      </Container>
    </Section>
  )
}

function Contact() {
  const items = [
    {
      label: "GitHub",
      value: profile.github.replace("https://", ""),
      href: profile.github,
      icon: "github" as const,
      external: true,
    },
    {
      label: "Gmail",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: "mail" as const,
      external: false,
    },
  ]
  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      className="border-t border-line bg-surface"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Contact</Eyebrow>
            <Heading level={2} size="xl" id="contact-title" className="mt-4">
              連絡先
            </Heading>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    external={item.external}
                    className="group flex items-center gap-5 py-7 sm:gap-8"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        {item.label}
                      </span>
                      <span className="mt-1 block break-all text-lg font-medium text-ink transition-colors group-hover:text-accent sm:text-xl">
                        {item.value}
                      </span>
                    </span>
                    <Icon
                      name="arrow-up-right"
                      className="size-5 shrink-0 text-ink-muted transition-transform duration-300 ease-calm group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Profile />
      <Works />
      <Contact />
    </>
  )
}
