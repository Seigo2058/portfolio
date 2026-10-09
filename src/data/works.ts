/**
 * Work data. The work page (pages/WorkPage.tsx) is a template driven entirely
 * by `WorkDetail`; add a `detail` object to any work to give it a page.
 * Optional sections render only when they contain content.
 */

export type ImageSlot = {
  /** Image URL. Leave undefined to show a placeholder. */
  src?: string
  alt: string
}

export type WorkFeature = {
  title: string
  description: string
  image?: ImageSlot
}

export type WorkDetail = {
  lead: string
  hero?: ImageSlot
  siteUrl?: string
  githubUrl?: string
  overview: {
    period: string
    team: string
    role: string
    tech: { label: string; items: string[] }[]
  }
  background: string
  features: WorkFeature[]
  highlights: string
  // Optional sections — shown only when filled in.
  techReasons?: string
  challenges?: { problem: string; solution: string }[]
  architecture?: { text?: string; images?: ImageSlot[] }
  results?: string
  retrospective?: string
}

export type Work = {
  slug: string
  title: string
  summary: string
  tags: string[]
  thumbnail?: ImageSlot
  detail?: WorkDetail
}

export const works: Work[] = [
  {
    slug: 'allerqual',
    title: 'ALLERQUAL',
    summary: 'タイの大学との国際ワークショップで制作した、食物アレルギー対応のメニュー確認Webアプリ',
    tags: ['Next.js', 'Tailwind CSS', 'Supabase', 'Gemini API'],
    detail: {
      lead: 'タイの大学と北海道情報大学の「国際コラボレーションワークショップ」でWebデザインチームとして制作',
      siteUrl: 'https://iwdc-1-allerqual.vercel.app/',
      githubUrl: 'https://github.com/Seigo2058/iWDC-1',
      overview: {
        period: '2週間',
        team: '4人(デザイン2名、コーディング2名)',
        role: '企画、技術選定、要件定義、コーディング',
        tech: [
          { label: '開発', items: ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel', 'Gemini API'] },
          { label: 'デザイン', items: ['Figma', 'Illustrator'] },
        ],
      },
      background:
        'ワークショップのテーマはツーリズム。食物アレルギーを持つ人が、現地語のメニュー表や看板しかないレストランでも、食べたい料理を安心して選べるようにすることを目指した',
      features: [
        {
          title: '撮影画面',
          description: '現地語で書かれたメニュー表や看板をスマホのカメラで撮影できる',
        },
        {
          title: '料理詳細画面',
          description: 'メニュー表から料理名を判別後、料理詳細画面を閲覧できる',
        },
        {
          title: 'アレルギー選択画面',
          description: '自身が持つアレルギーや宗教上の理由で食べられない食材を、21品目の中から選択できる',
        },
      ],
      highlights: '撮影画面と画像切り抜き画面を独自UIとし、使いやすい動作になるよう工夫した',
    },
  },
  {
    slug: 'patto-tsugaku',
    title: 'パッと見通学',
    summary: '大学の授業で制作したWebアプリ。時間割から毎日の通学ルートを計算',
    tags: ['Next.js', 'Tailwind CSS', 'Firebase', 'TransitAPI'],
    detail: {
      lead: '大学の授業で制作したWebアプリ',
      siteUrl: 'https://pattomi-tsugaku.vercel.app/',
      githubUrl: 'https://github.com/Seigo2058/pattomi-tsugaku',
      overview: {
        period: '3ヶ月',
        team: '4人(デザイン2名、コーディング2名)',
        role: '企画、技術選定、要件定義、コーディング',
        tech: [
          { label: '開発', items: ['Next.js', 'Tailwind CSS', 'Firebase', 'Vercel', 'TransitAPI'] },
          { label: 'デザイン', items: ['Figma'] },
        ],
      },
      background:
        '大学生は曜日によって通学時間が違い、変則的な予定も入りやすいため、毎日の通学時間を覚えにくい。特に北海道情報大学は本数の限られたバス通学が必須で、バスの時間確認が必要',
      features: [
        { title: '時間割からのルート計算', description: '時間割から毎日の通学ルートを計算する機能' },
        { title: 'ルートの検索・登録', description: '通学以外のルートを検索して登録する機能' },
        { title: '時刻表の計算・登録', description: '通学以外の時刻表を計算して登録する機能' },
      ],
      highlights:
        '既存の乗換アプリでは不便な「時間割に基づくルート登録」を主機能にした。ホーム画面に時間割とMyルートを一覧表示し、毎回検索する手間をなくした',
    },
  },
  {
    slug: 'higuma',
    title: 'となりのデカくて不器用なヤツ',
    summary: 'Webデザインコンテスト応募作品(優秀賞)。ヒグマの生態と問題の原因を伝えるサイト',
    tags: ['HTML', 'SCSS', 'JavaScript', 'GSAP', 'p5.js'],
    detail: {
      lead: 'Webデザインコンテスト応募作品(優秀賞)',
      siteUrl: 'https://seigo2058.github.io/webcon/',
      githubUrl: 'https://github.com/Seigo2058/webcon',
      overview: {
        period: '4ヶ月',
        team: '2人(デザイン1名、コーディング1名=本人)。企画・調査・原稿2ヶ月、デザイン2ヶ月、コーディング1ヶ月半',
        role: '企画、調査、原稿、技術選定、コーディング',
        tech: [
          { label: '開発', items: ['HTML', 'CSS(SCSS)', 'JavaScript(GSAP, p5.js)'] },
          { label: 'デザイン', items: ['Figma', 'Illustrator', 'After Effects'] },
        ],
      },
      background:
        'ヒグマの問題個体が報じられる中、北海道の若者にヒグマの正しい生態と問題の根本原因をわかりやすく伝えるために制作',
      features: [
        { title: 'ヒグマの生態', description: 'ヒグマの生態をBento UIでインタラクティブに解説' },
        { title: '問題の原因', description: 'ヒグマ問題の原因をビジュアルとアコーディオンパネルで解説' },
        { title: '私たちにできる対策', description: '私たちにできるヒグマ対策をインタラクティブに解説' },
      ],
      highlights:
        '既存の記事や動画は正確だが、専門的だったり視覚的に分かりにくく、興味がある人しか見ないコンテンツになっている。そこで、イラストとインタラクティブ要素を多用し、楽しみながら学べることを重視した',
    },
  },
  {
    slug: 'ebetsu',
    title: '野鳥と暮らす街、江別',
    summary: '大学の授業で制作したWebサイト。江別市への移住を促す提案',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Slick.js'],
    detail: {
      lead: '大学の授業で制作したWebサイト',
      siteUrl: 'https://seigo2058.github.io/EbetsuWithBird/',
      githubUrl: 'https://github.com/Seigo2058/EbetsuWithBird',
      overview: {
        period: '3ヶ月',
        team: '3人(デザイン1名、コーディング1名、撮影1名)',
        role: '企画、技術選定、要件定義、コーディング',
        tech: [
          { label: '開発', items: ['HTML', 'CSS', 'JavaScript(GSAP, Slick.js)'] },
          { label: 'デザイン', items: ['Figma', 'Illustrator', 'Photoshop'] },
        ],
      },
      background:
        '授業「Web制作プロジェクト」で、江別市への移住を促進するアイデアを考えてWebサイトを制作した。江別の野幌森林公園にはシマエナガやシマフクロウなど人気の野鳥が多く生息する。野鳥観察を生活の一部にした暮らしを提案する',
      features: [
        { title: 'ホーム', description: '江別が野鳥観察に最適で住みやすい理由を解説' },
        { title: '江別で暮らすページ', description: '自然に近く、都会と同じような生活も送れる江別の良さを解説' },
        { title: '野幌森林公園ページ', description: '野鳥の住処である野幌森林公園の魅力を解説' },
      ],
      highlights:
        'ターゲットは、定年前にセカンドライフの移住先を探している東京在住の50代。この年齢層に合わせて、落ち着いたデザインとアニメーションを選んだ',
    },
  },
]

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug)
}

/** Previous / next works in list order (undefined at either end). */
export function getAdjacentWorks(slug: string) {
  const index = works.findIndex((work) => work.slug === slug)
  return { prev: works[index - 1] as Work | undefined, next: works[index + 1] as Work | undefined }
}

/** Link target for a work, or undefined while its page doesn't exist yet. */
export function workHref(work: Work, build: (slug: string) => string) {
  return work.detail ? build(work.slug) : undefined
}
