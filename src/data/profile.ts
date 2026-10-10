import cyclingPhoto from '../assets/about/cycling.webp'
import fishingPhoto from '../assets/about/fishing.webp'
import hikingPhoto from '../assets/about/hiking.webp'
import workingPhoto from '../assets/about/working.webp'
import type { Slide } from '../components/ui/Slideshow'

export const profile = {
  nameJa: "吉永 誠悟",
  nameEn: "Seigo Yoshinaga",
  role: "Webフロントエンドエンジニア",
  affiliation: "北海道情報大学 情報メディア学部 情報メディア学科 安田ゼミ所属",
  graduation: "2028年卒業予定",
  catchcopy: "ブレずに取り組み続ける力と俯瞰的に問題を見て、提案する能力",
  intro:
    "WebサイトやWebアプリ開発が好きです。大学でデザインからバックエンドまで学び、インターンでマーケティングについて学んだことで、ただ開発するだけでなく、なぜ必要なのかをペルソナや要件定義から考えて開発できます。",
  skills: ["HTML/CSS", "JavaScript", "Next.js", "GSAP", "p5.js"],
  github: "https://github.com/Seigo2058",
  email: "s2421218@s.do-johodai.ac.jp",
}

/** Hero slideshow photos, in display order. `position` keeps the subject in frame when cropped. */
export const heroPhotos: Slide[] = [
  { src: workingPhoto, alt: 'カフェでノートPCに向かって作業する吉永誠悟', position: '40% center' },
  { src: hikingPhoto, alt: '山頂で湖を背にピースする吉永誠悟', position: 'center 65%' },
  { src: cyclingPhoto, alt: '湖畔でロードバイクと並ぶ吉永誠悟', position: '25% center' },
  { src: fishingPhoto, alt: '釣った魚を掲げる吉永誠悟', position: 'center 30%' },
]

export const aboutProfile = {
  title: 'Webフロントエンドエンジニア志望',
  belong: '北海道情報大学 情報メディア学部 情報メディア学科 2028年卒業予定(安田研究室 21期生)',
  strength:
    '私の強みはコーディングに留まらない幅広い経験です。学内のWebデザインコンテストで優秀賞を獲得するなど、WebサイトやWebアプリケーションのチーム開発経験があるだけでなく、基礎的なデザインやマーケティングの知識を活かして課題を多角的に捉えて考える能力があります。例えば、株式会社ルック・ヒライ様と行った「居酒屋 瑠玖」のホームページリニューアルでは、企画の段階から参加し、現状の分析やペルソナの設定を行い、SEOを取り入れたWebサイトにリニューアルしました。',
  skills: [
    { name: 'HTML, CSS', duration: '3年', learning: false },
    { name: 'JavaScript', duration: '3年', learning: false },
    { name: 'Next.js', duration: '6ヶ月', learning: true },
  ],
  libraries: ['GSAP', 'p5.js', 'Slick.js'],
  goal: '道内中小企業を支援するFDE(Forward Deployed Engineer)を目指している。そのために、エンジニアとしての幅広い知見と、経営・業務理解のためのコミュニケーション能力を伸ばしたい。',
  awards: [
    { date: '2026年4月', text: '学内Webデザインコンテスト 優秀賞' },
    { date: '2026年4月〜', text: '株式会社エレメント Webエンジニアインターン' },
    { date: '2026年9月', text: 'SAPPORO IT CAMP 2026 準優勝' },
    { date: '2026年9月', text: 'SMFコトバワークショップ2026 個人賞1位' },
  ],
  hobby: 'アウトドア(登山、サイクリング)',
}

export type TimelineTag = '講座' | '勉強会' | 'プロジェクト' | '海外' | 'イベント' | 'プログラム' | 'コンテスト' | 'インターン'

export const timelineTags: TimelineTag[] = ['講座', '勉強会', 'プロジェクト', '海外', 'イベント', 'プログラム', 'コンテスト', 'インターン']

export type TimelineItem = { date: string; text: string; tag?: TimelineTag }

/** Oldest first. */
export const timeline: TimelineItem[] = [
  { date: '2020年3月〜6月', text: 'プログラミングスクール「SUNABACO 江別」でHTML/CSS/JS/Pythonの基礎に触れる', tag: '講座' },
  { date: '2024年4月', text: '北海道情報大学 情報メディア学部に入学 / 自主ゼミ「デザイン道場ゼミ」に参加', tag: '勉強会' },
  { date: '2024年6月', text: '学内コンテスト「学生チャレンジプログラム」採択、江別市を舞台にしたRPGを制作', tag: 'プロジェクト' },
  { date: '2024年8月', text: 'マレーシア短期留学(10日間)', tag: '海外' },
  { date: '2025年2月', text: 'ピッチコンテスト「HOKKAIDO INNOVATION HUNTER」に「学生チャレンジプログラム」のプロジェクトで参加', tag: 'イベント' },
  { date: '2025年4月', text: '学内の国際情報プログラム(IIP)に参加', tag: 'プログラム' },
  { date: '2026年1月', text: '安田研究室に21期生として所属決定' },
  { date: '2026年2月', text: '「HACK FOR IMPACT 共創で未来を生み出すハッカソン」に参加', tag: 'イベント' },
  { date: '2026年4月', text: '学内Webデザインコンテストで優秀賞', tag: 'コンテスト' },
  { date: '2026年4月', text: '株式会社エレメントでWebエンジニアインターン開始', tag: 'インターン' },
  { date: '2026年4月', text: '北大未来開拓倶楽部・マーケティングゼミで運営メンバーに', tag: '勉強会' },
  { date: '2026年6月', text: '産学連携プロジェクト「Creative Meet UP」でエスピー工研様と安田ゼミAチームでプロジェクトを実施', tag: 'プロジェクト' },
  { date: '2026年8月', text: '「国際コラボレーションプログラム」Web部門に参加(20日間・タイ)', tag: '海外' },
  { date: '2026年9月', text: '「SAPPORO IT CAMP 2026」準優勝', tag: 'イベント' },
  { date: '2026年9月', text: '安田研究室・台湾ゼミ合宿(7日間)', tag: '海外' },
  { date: '2026年9月', text: '「SMFコトバワークショップ2026」個人賞1位', tag: 'イベント' },
]
