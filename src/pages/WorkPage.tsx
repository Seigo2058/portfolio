import type { ReactNode } from 'react'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Link from '../components/ui/Link'
import Placeholder from '../components/ui/Placeholder'
import Reveal from '../components/ui/Reveal'
import { TagList } from '../components/ui/Tag'
import { Eyebrow, Heading, Text } from '../components/ui/Typography'
import { Container } from '../components/ui/Layout'
import { getAdjacentWorks, workHref, type Work, type WorkDetail } from '../data/works'
import { paths } from '../lib/router'

/** Two-column content block: label on the left (PC), body on the right. */
function DetailSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
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

function Overview({ overview }: { overview: WorkDetail['overview'] }) {
  const rows = [
    { term: '制作期間', value: overview.period },
    { term: '開発形態', value: overview.team },
    { term: '担当範囲', value: overview.role },
  ]
  return (
    <Reveal>
      <section aria-label="概要" className="rounded-3xl border border-line bg-surface p-7 sm:p-10">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <div key={row.term}>
              <dt className="text-xs font-semibold tracking-[0.15em] text-ink-muted">{row.term}</dt>
              <dd className="mt-2 font-medium leading-relaxed text-ink text-ja">{row.value}</dd>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1">
            <dt className="text-xs font-semibold tracking-[0.15em] text-ink-muted">使用技術</dt>
            <dd className="mt-3 space-y-4">
              {overview.tech.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-xs text-ink-muted">{group.label}</p>
                  <TagList items={group.items} tone="accent" />
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </section>
    </Reveal>
  )
}

function Features({ features }: { features: WorkDetail['features'] }) {
  return (
    <section aria-labelledby="features-title" className="border-t border-line py-16 sm:py-20">
      <Reveal>
        <Eyebrow>Features</Eyebrow>
        <Heading level={2} size="md" id="features-title" className="mt-3">
          主な機能
        </Heading>
      </Reveal>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <li key={feature.title}>
            <Reveal delay={((index % 3) + 1) as 1 | 2 | 3} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-4">
                <Placeholder
                  ratio="portrait"
                  alt={feature.image?.alt ?? `${feature.title}のスクリーンショット`}
                  src={feature.image?.src}
                  label={feature.title}
                />
                <div className="p-3 pt-6">
                  <p className="font-sans text-xs font-semibold tracking-widest text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <Heading level={3} size="sm" className="mt-2">
                    {feature.title}
                  </Heading>
                  <Text size="sm" tone="muted" className="mt-2">
                    {feature.description}
                  </Text>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Sections that render only when the work data provides content. */
function OptionalSections({ detail }: { detail: WorkDetail }) {
  const { techReasons, challenges, architecture, results, retrospective } = detail
  return (
    <>
      {techReasons && (
        <DetailSection id="tech-reasons" eyebrow="Tech Choices" title="技術選定の理由">
          <Text size="lg">{techReasons}</Text>
        </DetailSection>
      )}
      {challenges && challenges.length > 0 && (
        <DetailSection id="challenges" eyebrow="Problem & Solution" title="課題と解決方法">
          <ol className="space-y-6">
            {challenges.map((item) => (
              <li key={item.problem} className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-xs font-semibold tracking-[0.15em] text-ink-muted">課題</p>
                <Text className="mt-1">{item.problem}</Text>
                <p className="mt-5 text-xs font-semibold tracking-[0.15em] text-accent">解決方法</p>
                <Text className="mt-1">{item.solution}</Text>
              </li>
            ))}
          </ol>
        </DetailSection>
      )}
      {architecture && (architecture.text || architecture.images?.length) && (
        <DetailSection id="architecture" eyebrow="Design & Architecture" title="設計・構成">
          {architecture.text && <Text size="lg">{architecture.text}</Text>}
          {architecture.images && architecture.images.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {architecture.images.map((image) => (
                <Placeholder key={image.alt} alt={image.alt} src={image.src} />
              ))}
            </div>
          )}
        </DetailSection>
      )}
      {results && (
        <DetailSection id="results" eyebrow="Outcome" title="成果・反応">
          <Text size="lg">{results}</Text>
        </DetailSection>
      )}
      {retrospective && (
        <DetailSection id="retrospective" eyebrow="Retrospective" title="振り返りと今後の改善点">
          <Text size="lg">{retrospective}</Text>
        </DetailSection>
      )}
    </>
  )
}

function WorkPager({ work }: { work: Work }) {
  const { prev, next } = getAdjacentWorks(work.slug)
  const cards = [
    { dir: 'prev' as const, label: '前の作品', target: prev },
    { dir: 'next' as const, label: '次の作品', target: next },
  ]
  return (
    <nav aria-label="作品ナビゲーション" className="border-t border-line py-16 sm:py-20">
      <ul className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ dir, label, target }) =>
          target ? (
          <li key={dir} className={dir === 'next' ? 'sm:col-start-2' : undefined}>
            <Link
              href={workHref(target, paths.work)}
              className={`group flex h-full items-center gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent ${dir === 'next' ? 'sm:flex-row-reverse sm:text-right' : ''}`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                <Icon name={dir === 'prev' ? 'arrow-left' : 'arrow-right'} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-[0.15em] text-ink-muted">{label}</span>
                <span className="mt-1 block font-bold text-ink transition-colors group-hover:text-accent text-ja">
                  {target.title}
                </span>
              </span>
            </Link>
          </li>
          ) : null,
        )}
      </ul>
      <div className="mt-12 flex justify-center">
        <Button variant="secondary" href={paths.works} leadingIcon="arrow-left">
          一覧に戻る
        </Button>
      </div>
    </nav>
  )
}

/** Work page template. Renders any `Work` that has `detail` data. */
export default function WorkPage({ work }: { work: Work & { detail: WorkDetail } }) {
  const { detail } = work
  return (
    <article>
      <Container>
        <header className="pt-12 sm:pt-20">
          <Reveal>
            <Link
              href={paths.works}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
            >
              <Icon name="arrow-left" className="size-4 transition-transform duration-300 ease-calm group-hover:-translate-x-0.5" />
              一覧に戻る
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <Eyebrow className="mt-10">Works</Eyebrow>
            <Heading level={1} size="display" className="mt-4 break-words">
              {work.title}
            </Heading>
            <Text size="lg" tone="muted" className="mt-6 max-w-3xl">
              {detail.lead}
            </Text>
          </Reveal>
        </header>

        <Reveal delay={2} className="mt-12 sm:mt-16">
          <Placeholder
            ratio="video"
            alt={detail.hero?.alt ?? `${work.title} のメインビジュアル`}
            src={detail.hero?.src}
            label={work.title}
            className="rounded-3xl"
          />
        </Reveal>

        {(detail.siteUrl || detail.githubUrl) && (
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {detail.siteUrl && (
              <Button href={detail.siteUrl} external size="lg" trailingIcon="arrow-up-right">
                サイトを見る
              </Button>
            )}
            {detail.githubUrl && (
              <Button href={detail.githubUrl} external size="lg" variant="secondary" leadingIcon="github">
                GitHub
              </Button>
            )}
          </Reveal>
        )}

        <div className="mt-14 sm:mt-20">
          <Overview overview={detail.overview} />
        </div>

        <div className="mt-16 sm:mt-20">
          <DetailSection id="background-title" eyebrow="Background" title="制作背景・課題">
            <Text size="lg">{detail.background}</Text>
          </DetailSection>
          {detail.features.length > 0 && <Features features={detail.features} />}
          <DetailSection id="highlights-title" eyebrow="Highlights" title="工夫した点・こだわり">
            <Text size="lg">{detail.highlights}</Text>
          </DetailSection>
          <OptionalSections detail={detail} />
          <WorkPager work={work} />
        </div>
      </Container>
    </article>
  )
}
