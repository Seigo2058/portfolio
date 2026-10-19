import { useState, type ReactNode } from "react";
import clsx from "clsx";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Link from "../components/ui/Link";
import Placeholder from "../components/ui/Placeholder";
import Reveal from "../components/ui/Reveal";
import { TagList } from "../components/ui/Tag";
import { Eyebrow, Heading, Text } from "../components/ui/Typography";
import { Container } from "../components/ui/Layout";
import {
  aboutPhoto,
  aboutProfile,
  profile,
  timeline,
  type TimelineTag,
} from "../data/profile";
import { paths } from "../lib/router";

/** Calm tones built around the deep-green accent. */
const tagStyles: Record<TimelineTag, { chip: string; dot: string }> = {
  大学: { chip: "bg-[#e6eee9] text-[#153d2e]", dot: "bg-[#1f5641]" },
  学外: { chip: "bg-[#e9efe0] text-[#3f5220]", dot: "bg-[#5f7a34]" },
  プロジェクト: { chip: "bg-[#e0eeee] text-[#1d4d4f]", dot: "bg-[#2f7478]" },
  イベント: { chip: "bg-[#f1ecdc] text-[#625019]", dot: "bg-[#a08a3a]" },
  海外: { chip: "bg-[#e3ebf0] text-[#2c4a5f]", dot: "bg-[#4a7189]" },
  インターン: { chip: "bg-[#ece8e2] text-[#5a4a38]", dot: "bg-[#8a755b]" },
};

function Block({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-line py-16 sm:py-20"
    >
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
  );
}

function Timeline() {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const items = order === "asc" ? timeline : [...timeline].reverse();

  const pill = (active: boolean) =>
    clsx(
      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
      active ? "bg-accent text-on-accent" : "text-ink-muted hover:text-ink",
    );

  return (
    <div>
      <div
        role="group"
        aria-label="並び順"
        className="ml-auto flex w-fit gap-1 rounded-full border border-line-strong bg-surface p-1"
      >
        <button
          type="button"
          aria-pressed={order === "desc"}
          onClick={() => setOrder("desc")}
          className={pill(order === "desc")}
        >
          新しい順
        </button>
        <button
          type="button"
          aria-pressed={order === "asc"}
          onClick={() => setOrder("asc")}
          className={pill(order === "asc")}
        >
          古い順
        </button>
      </div>

      <ol className="relative mt-10 border-l border-line-strong">
        {items.map((item) => {
          // The dot takes the colour of the item's first tag.
          const dot = tagStyles[item.tags[0]].dot;
          return (
            <li
              key={`${item.date}-${item.text}`}
              className="relative pb-9 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute -left-[5px] top-2 size-2.5 rounded-full ring-4 ring-canvas",
                  dot,
                )}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <time className="font-sans text-sm font-semibold tracking-wide text-accent">
                  {item.date}
                </time>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={clsx(
                      "rounded-full px-3 py-0.5 text-xs font-medium",
                      tagStyles[tag].chip,
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Text className="mt-1">{item.text}</Text>
            </li>
          );
        })}
      </ol>
    </div>
  );
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
                  <span className="mt-3 block text-xl font-medium tracking-wide text-ink-muted sm:text-2xl">
                    {profile.nameJa}
                  </span>
                </Heading>
                <p className="mt-8 text-lg font-bold text-accent text-ja">
                  {aboutProfile.title}
                </p>
                <dl className="mt-5 grid max-w-2xl grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2">
                  {aboutProfile.belong.map((row) => (
                    <div key={row.term} className="contents">
                      <dt className="text-xs font-semibold tracking-[0.15em] text-ink-muted">
                        {row.term}
                      </dt>
                      <dd className="text-ink text-ja">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="max-w-xs lg:col-span-4 lg:max-w-none">
                <Placeholder
                  ratio="portrait"
                  src={aboutPhoto.src}
                  alt={aboutPhoto.alt}
                  position={aboutPhoto.position}
                />
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
                <li
                  key={skill.name}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <p className="font-bold text-ink">{skill.name}</p>
                  <p className="mt-3 font-sans text-3xl font-bold tracking-tight text-accent">
                    {skill.duration}
                  </p>
                  {skill.learning && (
                    <span className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-strong">
                      学習中
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs font-semibold tracking-[0.15em] text-ink-muted">
              ライブラリ
            </p>
            <TagList
              items={aboutProfile.libraries}
              tone="accent"
              className="mt-3"
            />
          </Block>

          <Block id="goal-title" eyebrow="Goal" title="将来の目標">
            <Text size="lg">{aboutProfile.goal}</Text>
          </Block>

          <Block
            id="awards-title"
            eyebrow="Awards & Internship"
            title="受賞・インターン"
          >
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {aboutProfile.awards.map((award) => (
                <li
                  key={award.text}
                  className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="shrink-0 font-sans text-sm font-semibold tracking-wide text-accent sm:w-28">
                    {award.date}
                  </span>
                  <span className="font-medium text-ink text-ja">
                    {award.text}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block
            id="timeline-title"
            eyebrow="Timeline"
            title="経歴タイムライン"
          >
            <Timeline />
          </Block>

          <Block id="hobby-title" eyebrow="Hobby" title="趣味">
            <Text size="lg">{aboutProfile.hobby}</Text>
          </Block>

          <Block id="contact-title" eyebrow="Contact" title="連絡先">
            <ul className="space-y-3">
              <li>
                <Link
                  href={profile.github}
                  external
                  variant="inline"
                  className="inline-flex items-center gap-2"
                >
                  <Icon name="github" />
                  GitHub: {profile.github}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${profile.email}`}
                  variant="inline"
                  className="inline-flex items-center gap-2"
                >
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
  );
}
