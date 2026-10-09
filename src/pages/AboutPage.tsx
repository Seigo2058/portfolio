import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Link from '../components/ui/Link'
import Placeholder from '../components/ui/Placeholder'
import Reveal from '../components/ui/Reveal'
import { TagList } from '../components/ui/Tag'
import { Eyebrow, Heading, Text } from '../components/ui/Typography'
import { Container } from '../components/ui/Layout'
import { aboutProfile, profile, timeline, timelineTags, type TimelineTag } from '../data/profile'
import { paths } from '../lib/router'

/** Calm tones built around the deep-green accent. */
const tagStyles: Record<TimelineTag | 'none', { chip: string; dot: string }> = {
  講座: { chip: 'bg-[#e6eee9] text-[#153d2e]', dot: 'bg-[#1f5641]' },
  勉強会: { chip: 'bg-[#e9efe0] text-[#3f5220]', dot: 'bg-[#5f7a34]' },
  プロジェクト: { chip: 'bg-[#e0eeee] text-[#1d4d4f]', dot: 'bg-[#2f7478]' },
  海外: { chip: 'bg-[#e3ebf0] text-[#2c4a5f]', dot: 'bg-[#4a7189]' },
  イベント: { chip: 'bg-[#f1ecdc] text-[#625019]', dot: 'bg-[#a08a3a]' },
  プログラム: { chip: 'bg-[#e8e9ef] text-[#41445f]', dot: 'bg-[#6b6f94]' },
  コンテスト: { chip: 'bg-[#1f5641] text-white', dot: 'bg-[#153d2e]' },
  インターン: { chip: 'bg-[#ece8e2] text-[#5a4a38]', dot: 'bg-[#8a755b]' },
  none: { chip: 'bg-subtle text-ink-muted', dot: 'bg-line-strong' },
}

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading level={2} size="md" id={id} className="mt-3">
            {title}
          </Heading>
        </Reveal>
        <Reveal delay={1} className="lg:col-span-8">
          {children}
        </Reveal>
      </div>
    </section>
  )
}

function Timeline() {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [filter, setFilter] = useState<TimelineTag | null>(null)
  const items = (order === 'asc' ? timeline : [...timeline].reverse()).filter((item) => !filter || item.tag === filter)

  const pill = (active: boolean) =>
    clsx(
      'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
      active ? 'border-accent bg-accent text-on-accent' : 'border-line-strong bg-surface text-ink-muted hover:border-ink hover:text-ink',
    )

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div role="group" aria-label="タグで絞り込み" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)} className={pill(filter === null)}>
            すべて
          </button>
          {timelineTags.map((tag) => (
            <button key={tag} type="button" aria-pressed={filter === tag} onClick={() => setFilter(filter === tag ? null : tag)} className={pill(filter === tag)}>
              {tag}
            </button>
          ))}
        </div>
        <div role="group" aria-label="並び順" className="flex shrink-0 gap-2">
          <button type="button" aria-pressed={order === 'desc'} onClick={() => setOrder('desc')} className={pill(order === 'desc')}>
            新しい順
          </button>
          <button type="button" aria-pressed={order === 'asc'} onClick={() => setOrder('asc')} className={pill(order === 'asc')}>
            古い順
          </button>
        </div>
      </div>

      <ol className="relative mt-10 border-l border-line-strong">
        {items.map((item) => {
          const style = tagStyles[item.tag ?? 'none']
          return (
            <li key={`${item.date}-${item.text}`} className="relative pb-9 pl-8 last:pb-0">
              <span aria-hidden="true" className={clsx('absolute -left-[5px] top-2 size-2.5 rounded-full ring-4 ring-canvas', style.dot)} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <time className="font-sans text-sm font-semibold tracking-wide text-accent">{item.date}</time>
                {item.tag && <span className={clsx('rounded-full px-3 py-0.5 text-xs font-medium', style.chip)}>{item.tag}</span>}
              </div>
              <Text className="mt-1">{item.text}</Text>
            </li>
          )
        })}
        {items.length === 0 && <li className="pl-8 text-ink-muted">該当する項目はありません</li>}
      </ol>
    </div>
  )
}

export default function AboutPage() {
  return (
    <article>
      <Container>
        <header className="pt-12 sm:pt-20">
          <Reveal>
            <Eyebrow>About me</Eyebrow>
            <div className="mt-6 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Heading level={1} size="display" className="break-words">
                  {profile.nameEn}
                  <span className="mt-3 block text-xl font-medium tracking-wide text-ink-muted sm:text-2xl">{profile.nameJa}</span>
                </Heading>
                <p className="mt-8 text-lg font-bold text-accent text-ja">{aboutProfile.title}</p>
                <Text tone="muted" className="mt-3 max-w-2xl">
                  {aboutProfile.belong}
                </Text>
              </div>
              <div className="max-w-xs lg:col-span-4 lg:max-w-none">
                <Placeholder ratio="portrait" alt="顔写真またはイラスト" label="Portrait" />
              </div>
            </div>
          </Reveal>
        </header>

        <div className="mt-16 sm:mt-20">
          <Block id="strength-title" eyebrow="Strength" title="強み">
            <Text size="lg">{aboutProfile.strength}</Text>
          </Block>

          <Block id="skills-title" eyebrow="Skills" title="スキル">
            <ul className="grid gap-4 sm:grid-cols-3">
              {aboutProfile.skills.map((skill) => (
                <li key={skill.name} className="rounded-2xl border border-line bg-surface p-6">
                  <p className="font-bold text-ink">{skill.name}</p>
                  <p className="mt-3 font-sans text-3xl font-bold tracking-tight text-accent">{skill.duration}</p>
                  {skill.learning && (
                    <span className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-strong">学習中</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs font-semibold tracking-[0.15em] text-ink-muted">ライブラリ</p>
            <TagList items={aboutProfile.libraries} tone="accent" className="mt-3" />
          </Block>

          <Block id="goal-title" eyebrow="Goal" title="将来の目標">
            <Text size="lg">{aboutProfile.goal}</Text>
          </Block>

          <Block id="awards-title" eyebrow="Awards & Internship" title="受賞・インターン">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {aboutProfile.awards.map((award) => (
                <li key={award.text} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="shrink-0 font-sans text-sm font-semibold tracking-wide text-accent sm:w-28">{award.date}</span>
                  <span className="font-medium text-ink text-ja">{award.text}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="timeline-title" eyebrow="Timeline" title="経歴タイムライン">
            <Timeline />
          </Block>

          <Block id="hobby-title" eyebrow="Hobby" title="趣味">
            <Text size="lg">{aboutProfile.hobby}</Text>
          </Block>

          <Block id="contact-title" eyebrow="Contact" title="連絡先">
            <ul className="space-y-3">
              <li>
                <Link href={profile.github} external variant="inline" className="inline-flex items-center gap-2">
                  <Icon name="github" />
                  GitHub: {profile.github}
                </Link>
              </li>
              <li>
                <Link href={`mailto:${profile.email}`} variant="inline" className="inline-flex items-center gap-2">
                  <Icon name="mail" />
                  Gmail: {profile.email}
                </Link>
              </li>
            </ul>
          </Block>

          <div className="flex justify-center border-t border-line py-16 sm:py-20">
            <Button href={paths.works} size="lg" trailingIcon="arrow-right">
              作品を見る
            </Button>
          </div>
        </div>
      </Container>
    </article>
  )
}
