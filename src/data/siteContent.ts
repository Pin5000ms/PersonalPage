export interface LinkItem {
  label: string
  href: string
}

export interface SkillItem {
  title: string
  summary: string
  tags: string[]
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectItem {
  title: string
  category: string
  summary: string
  outcome: string
  stack: string[]
  metrics: ProjectMetric[]
  links: LinkItem[]
}

export interface ArticleItem {
  title: string
  summary: string
  publishDate: string
  readingTime: string
  href: string
}

export interface InterviewItem {
  company: string
  role: string
  year: string
  summary: string
  takeaways: string[]
}

export const profile = {
  name: 'Ting Yu',
  title: 'Vue Frontend Developer',
  intro:
    '我用 Vue 打造清楚、可維護、能持續演進的前端體驗，並把實作過程整理成容易理解的技術內容。',
  mission:
    '這個網站會同時是作品集、技術部落格和個人品牌入口，目標是累積可信度、建立搜尋流量，再把流量轉成小額贊助與合作機會。',
  primaryLink: {
    label: '查看作品集',
    href: '#/about',
  },
  secondaryLink: {
    label: '閱讀技術文章',
    href: '#/articles',
  },
  focusPoints: [
    '把專案經驗整理成可快速理解的案例',
    '用作品與文章建立前端專業可信度',
    '為後續贊助、接案與內容收入打基礎',
  ],
}

export const skills: SkillItem[] = [
  {
    title: 'Vue 3 與 Composition API',
    summary:
      '熟悉元件拆分、資料流設計、可重用 composables 與靜態部署流程，能把網站從 demo 做到可長期維護。',
    tags: ['Vue 3', 'TypeScript', 'Vite'],
  },
  {
    title: '前端介面與使用體驗',
    summary:
      '重視資訊層級、閱讀節奏、互動回饋與 RWD，讓作品集不只是列出功能，而是讓人願意停留。',
    tags: ['UI Design', 'Responsive', 'Accessibility'],
  },
  {
    title: '技術內容創作',
    summary:
      '能把實作經驗整理成教學文章，適合經營 SEO 長尾主題，也讓作品有更多延伸曝光的機會。',
    tags: ['Technical Writing', 'SEO', 'Documentation'],
  },
]

export const projects: ProjectItem[] = [
  {
    title: '個人品牌網站與技術文章平台',
    category: 'Portfolio / Content Platform',
    summary:
      '以 Vue 3 和 Vite 建立個人網站，整合技能介紹、專案案例與技術文章入口，作為長期經營的內容基地。',
    outcome:
      '把自我介紹頁升級成能承接流量、展示實力、引導贊助與後續合作的作品集網站。',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'GitHub Pages'],
    metrics: [
      { label: '網站定位', value: '作品集 + 部落格' },
      { label: '部署方式', value: 'GitHub Actions' },
      { label: '維護成本', value: '免費靜態託管' },
    ],
    links: [
      { label: '網站首頁', href: '#/about' },
      { label: 'GitHub Repo', href: 'https://github.com/' },
    ],
  },
  {
    title: 'Vue 元件與版型練習庫',
    category: 'Frontend System',
    summary:
      '整理常用版型、卡片、導覽與 CTA 區塊，讓之後新增文章頁或 landing page 時能更快複用。',
    outcome:
      '降低後續擴充成本，讓每次新增內容都能維持一致的視覺語言與開發節奏。',
    stack: ['Vue 3', 'Scoped CSS', 'Design Tokens'],
    metrics: [
      { label: '重用目標', value: '首頁 / 文章頁 / 專案頁' },
      { label: '核心價值', value: '一致性與維護性' },
      { label: '下階段', value: '抽成內容模板' },
    ],
    links: [
      { label: '技能頁', href: '#/skills' },
      { label: '文章列表', href: '#/articles' },
    ],
  },
]

export const articles: ArticleItem[] = [
  {
    title: '用 Vue 3 建立可部署到 GitHub Pages 的個人網站',
    summary:
      '從 Vite 設定、base path 到 GitHub Actions 部署，整理一套適合個人品牌站的最小可行流程。',
    publishDate: '2026-03-23',
    readingTime: '6 min read',
    href: '#',
  },
  {
    title: '技術文章怎麼寫，才更容易累積穩定流量',
    summary:
      '分享我會如何規劃主題集群、文章結構與 CTA，讓內容不只被看到，也能慢慢轉成支持。',
    publishDate: '2026-03-18',
    readingTime: '5 min read',
    href: '#',
  },
  {
    title: 'GitHub Pages 與 Vercel 怎麼選',
    summary:
      '從成本、部署自由度與長期變現方向，分析兩種平台對個人網站經營的差異。',
    publishDate: '2026-03-10',
    readingTime: '4 min read',
    href: '#',
  },
]

export const interviews: InterviewItem[] = [
  {
    company: 'Frontend Engineer Mock Interview',
    role: 'Vue Frontend Candidate',
    year: '2025',
    summary:
      '針對 Vue 元件拆分、狀態管理與部署流程做完整模擬，幫助我整理實戰經驗的說法。',
    takeaways: [
      '先講需求與限制，再說技術選型原因',
      '回答元件拆分時要帶出資料流與維護性',
      '部署經驗能增加工程完整度的說服力',
    ],
  },
  {
    company: 'Product UI Team Interview Practice',
    role: 'Frontend Developer',
    year: '2024',
    summary:
      '練習如何把 UI 細節、RWD 與使用者體驗轉成面試官聽得懂的成果敘述。',
    takeaways: [
      '不只講做了什麼，也要講改善了什麼',
      '用案例說明設計與工程如何協作',
      '準備一套可重複使用的 STAR 回答結構',
    ],
  },
]
