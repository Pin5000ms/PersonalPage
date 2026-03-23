
import profileAvatar from '../assets/avatar.jpg'
import project1Cover from '../assets/projects/project1-cover.png'
import project1Detail01 from '../assets/projects/project1-detail-01.png'
import project2Cover from '../assets/projects/project2-cover.png'
import project2Detail01 from '../assets/projects/project2-detail-01.png'
import project3Cover from '../assets/projects/project3-cover.png'
import project3Detail01 from '../assets/projects/project3-detail-01.png'

export type Locale = 'zh' | 'en'

export interface LocalizedText {
  zh: string
  en: string
}

export interface LinkItem {
  label: LocalizedText
  href: string
}

export interface SkillItem {
  title: LocalizedText
  summary: LocalizedText
  tags: string[]
}

export interface ProjectMetric {
  label: LocalizedText
  value: LocalizedText
}

export interface ProjectItem {
  slug: string
  title: LocalizedText
  category: LocalizedText
  summary: LocalizedText
  outcome: LocalizedText
  coverImageSrc?: string
  coverImageAlt?: LocalizedText
  coverImageTone?: string
  detailImageSrc?: string
  detailImageAlt?: LocalizedText
  stack: string[]
  metrics: ProjectMetric[]
  links: LinkItem[]
}

export interface ArticleItem {
  title: LocalizedText
  summary: LocalizedText
  publishDate: string
  readingTime: LocalizedText
  href: string
  imageLabel: LocalizedText
  imageTone: string
}

export interface InterviewItem {
  company: string
  role: LocalizedText
  year: string
  summary: LocalizedText
  takeaways: LocalizedText[]
  imageLabel: LocalizedText
  imageTone: string
}

export interface ContactInfoItem {
  label: string
  value: string
  href: string
}

export interface SiteCopy {
  nav: Array<{ label: LocalizedText; to: string; mark: string }>
  languageSwitch: {
    zh: string
    en: string
    label: LocalizedText
  }
  aboutPage: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
  }
  projectsPage: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
  }
  articlesPage: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
  }
  interviewPage: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
  }
  contactPage: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
    availability: LocalizedText
  }
  hero: {
    kicker: LocalizedText
    panelLabel: LocalizedText
  }
  skillsSection: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
    dragHint: LocalizedText
    autoScrolling: LocalizedText
    paused: LocalizedText
  }
  projectsSection: {
    kicker: LocalizedText
    title: LocalizedText
    description: LocalizedText
    detailLabel: LocalizedText
    dragHint: LocalizedText
    autoScrolling: LocalizedText
    paused: LocalizedText
  }
}

export const siteCopy: SiteCopy = {
  nav: [
    { label: { zh: 'About me (關於我)', en: 'About me' }, to: '/about', mark: '我' },
    { label: { zh: 'Articles (技術分享文章)', en: 'Articles' }, to: '/articles', mark: '文' },
    { label: { zh: 'Projects (作品集)', en: 'Projects' }, to: '/projects', mark: '作' },
    { label: { zh: 'Interview (面試經驗)', en: 'Interview' }, to: '/interview', mark: '面' },
    { label: { zh: 'Contact me (聯絡我)', en: 'Contact me' }, to: '/contact', mark: '聯' },
  ],
  languageSwitch: {
    zh: '中文',
    en: 'EN',
    label: { zh: '切換語言', en: 'Switch language' },
  },
  aboutPage: {
    kicker: { zh: 'Personal brand', en: 'Personal brand' },
    title: { zh: '關於我', en: 'About me' },
    description: {
      zh: '我是誰，我在哪',
      en: 'Who am I, Where am I?',
    },
  },
  projectsPage: {
    kicker: { zh: 'Projects overview', en: 'Projects overview' },
    title: { zh: '作品集', en: 'Projects' },
    description: {
      zh: '這一頁聚焦我做過的前端專案，包含定位、成果、技術選型與後續可延伸的方向。',
      en: 'This page focuses on my frontend projects, including product context, outcomes, technical decisions, and possible next steps.',
    },
  },
  articlesPage: {
    kicker: { zh: 'Technical writing', en: 'Technical writing' },
    title: { zh: '技術分享文章', en: 'Technical articles' },
    description: {
      zh: '這裡收錄我把實作經驗整理成文章的內容，讓作品背後的思考、流程與取捨更完整地被看見。',
      en: 'Here I document implementation notes and technical write-ups so the thinking, trade-offs, and process behind my work are visible.',
    },
  },
  interviewPage: {
    kicker: { zh: 'Interview notes', en: 'Interview notes' },
    title: { zh: '面試經驗', en: 'Interview experience' },
    description: {
      zh: '我把面試練習與回顧整理在這裡，方便之後持續累積自己的回答框架與經驗總結。',
      en: 'I keep interview practice notes and retrospectives here so I can refine my answer structure and capture recurring patterns.',
    },
  },
  contactPage: {
    kicker: { zh: 'Contact', en: 'Contact' },
    title: { zh: '聯絡我', en: 'Contact me' },
    description: {
      zh: '如果你想聊作品合作、內容企劃或面試機會，可以從這邊找到我。',
      en: 'If you would like to talk about frontend engineering, collaboration, content planning, or interview opportunities, feel free to reach out through the channels below.',
    },
    availability: {
      zh: '目前在看新的工作機會、合作與技術內容交流。',
      en: 'Currently open to international interviews, frontend collaboration, and technical content conversations.',
    },
  },
  hero: {
    kicker: { zh: 'Profile', en: 'Profile' },
    panelLabel: { zh: '目前重點', en: 'Current focus' },
  },
  skillsSection: {
    kicker: { zh: 'What I can help with', en: 'What I can help with' },
    title: {
      zh: '技能不只是列清單，也要能支撐作品與內容輸出',
      en: 'Skills should support both project execution and technical communication',
    },
    description: {
      zh: '這一區聚焦的是你真正想被記住的能力，而不是把所有用過的工具一次堆上來。',
      en: 'This section focuses on the capabilities I want to be remembered for instead of listing every tool I have touched.',
    },
    dragHint: { zh: '向右滑動查看更多技能', en: 'Scroll right to explore more skills' },
    autoScrolling: { zh: '自動滑動中', en: 'Auto scrolling' },
    paused: { zh: '已暫停，方便閱讀', en: 'Paused for browsing' },
  },
  projectsSection: {
    kicker: { zh: 'Projects', en: 'Projects' },
    title: {
      zh: '這邊是我做過的一些專案',
      en: 'Clear project storytelling is more persuasive than listing technologies alone',
    },
    description: {
      zh: '每個專案都用「做了什麼、為什麼這樣做、最後帶來什麼結果」來呈現，盡量不說廢話。',
      en: 'Each project is framed by what I built, why I approached it that way, and what outcome it created.',
    },
    detailLabel: { zh: '詳細內容', en: 'Details' },
    dragHint: { zh: '向右滑動查看更多作品', en: 'Scroll right to explore more projects' },
    autoScrolling: { zh: '自動滑動中', en: 'Auto scrolling' },
    paused: { zh: '已暫停，方便閱讀', en: 'Paused for browsing' },
  },
}

export const profile = {
  name: { zh: 'Tom Chang', en: 'Tom Chang' },
  avatarSrc: profileAvatar,
  avatarAlt: {
    zh: 'Tom Chang 的大頭貼',
    en: 'Portrait of Tom Chang',
  },
  title: { zh: '軟體工程師', en: 'Software Engineer' },
  intro: {
    zh: '我是一位軟體工程師，專長於 Windows 桌面應用開發（C#、Python、C/C++、WPF），並具備 AI 應用的實務經驗。我的 AI 經驗包含使用 Python 與 PyTorch 建立深度學習模型、將 AI 整合進軟體系統，以及將 AI 解決方案部署到真實世界的應用場景中。',
    en: 'I am a software engineer with expertise in Windows desktop development (C#, Python, C/C++, WPF) and practical experience in AI applications. My AI experience includes building deep-learning models with Python/PyTorch, integrating AI into software systems, and deploying AI solutions for real-world use cases.',
  },
  mission: {
    zh: '過往的工作經驗讓我在電腦視覺、AI／深度學習、運動控制，以及自動化系統領域具備高度熟悉度與實作能力。',
    en: 'My work experience has made me highly proficient in computer vision, AI / deep learning, motion control, and automation systems.',
  },
  primaryLink: {
    label: { zh: '查看作品集', en: 'View projects' },
    href: '#/projects',
  },
  secondaryLink: {
    label: { zh: '聯絡我', en: 'Contact me' },
    href: '#/contact',
  },
  focusPoints: [
    {
      zh: '把專案經驗整理成可快速理解的案例',
      en: 'Turn project experience into examples that are quick to understand',
    },
    {
      zh: '用作品與文章建立前端專業可信度',
      en: 'Use projects and writing to establish frontend credibility',
    },
    {
      zh: '為後續贊助、接案與內容收入打基礎',
      en: 'Build a foundation for future support, freelance work, and content income',
    },
  ],
}

export const contactInfo: ContactInfoItem[] = [
  {
    label: 'Email',
    value: 'tom0917952503@gmail.com',
    href: 'mailto:tom0917952503@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/tomchang',
    href: 'https://github.com/Pin5000ms',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/tomchang',
    href: 'https://www.linkedin.com/in/tingyu-chang-742971140/',
  },
]

export const skills: SkillItem[] = [
  {
    title: { zh: 'Vue 3 與 Composition API', en: 'Vue 3 and Composition API' },
    summary: {
      zh: '熟悉元件拆分、資料流設計、可重用 composables 與靜態部署流程，能把網站從 demo 做到可長期維護。',
      en: 'Comfortable with component boundaries, data flow design, reusable composables, and static deployment workflows, turning demos into maintainable products.',
    },
    tags: ['Vue 3', 'TypeScript', 'Vite'],
  },
  {
    title: { zh: '前端介面與使用體驗', en: 'Frontend UI and user experience' },
    summary: {
      zh: '重視資訊層級、閱讀節奏、互動回饋與 RWD，讓作品集不只是列出功能，而是讓人願意停留。',
      en: 'I care about information hierarchy, reading rhythm, interaction feedback, and responsive design so a portfolio feels intentional instead of functional only.',
    },
    tags: ['UI Design', 'Responsive', 'Accessibility'],
  },
  {
    title: { zh: '技術內容創作', en: 'Technical content creation' },
    summary: {
      zh: '能把實作經驗整理成教學文章，適合經營 SEO 長尾主題，也讓作品有更多延伸曝光的機會。',
      en: 'I can turn implementation experience into instructional writing, which supports long-tail SEO topics and extends the visibility of each project.',
    },
    tags: ['Technical Writing', 'SEO', 'Documentation'],
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'unsupervised-clustering-of-solder-joints',
    title: { zh: '焊點非監督式分群', en: 'Unsupervised Clustering of Solder Joints' },
    category: { zh: '電腦視覺 / AI 缺陷分析', en: 'Computer Vision / AI Defect Analysis' },
    summary: {
      zh: '我建立了一套非監督式缺陷分群流程，先利用 Segment Anything Model（SAM）對焊點進行分割，再透過 autoencoder 萃取 128 維潛在特徵，最後使用 DBSCAN 在無標註資料的情況下自動將焊點型態分群。',
      en: 'Developed an unsupervised defect clustering pipeline by segmenting solder joints using Segment Anything Model (SAM), extracting 128-dimensional latent embeddings with an autoencoder, and applying DBSCAN clustering to group patterns without labeled data.',
    },
    outcome: {
      zh: '這個專案展示了我把電腦視覺、深度學習與非監督式學習串成完整分析流程的能力，能在不標註焊點類型的情況下，將不同型態的焊點分群。',
      en: 'This project demonstrates my ability to combine computer vision, deep learning, and unsupervised learning into a complete analysis workflow, helping uncover latent solder-joint patterns when labeled data is unavailable.',
    },
    coverImageSrc: project1Cover,
    coverImageAlt: {
      zh: 'AutoEncoder 與 DBSCAN 流程圖',
      en: 'AutoEncoder and DBSCAN pipeline',
    },
    coverImageTone: 'ocean',
    detailImageSrc: project1Detail01,
    detailImageAlt: {
      zh: '焊點分群前後結果',
      en: 'Clustering result of solder-joint',
    },
    stack: ['Python', 'PyTorch', 'Segment Anything Model', 'Autoencoder', 'DBSCAN'],
    metrics: [
      { label: { zh: '資料標註', en: 'Labels' }, value: { zh: '無標註資料', en: 'No labeled data' } },
      { label: { zh: '特徵維度', en: 'Embedding size' }, value: { zh: '128 維', en: '128 dimensions' } },
      { label: { zh: '分群方法', en: 'Clustering method' }, value: { zh: 'DBSCAN', en: 'DBSCAN' } },
    ],
    links: [
      { label: { zh: '聯絡我了解更多', en: 'Contact me for more details' }, href: '#/contact' },
    ],
  },
  {
    slug: 'pcb-component-detection-using-yolo',
    title: { zh: '使用 YOLO 的 PCB 元件偵測', en: 'PCB Component Detection using YOLO' },
    category: { zh: '電腦視覺 / 目標偵測', en: 'Computer Vision / Object Detection' },
    summary: {
      zh: '我實作了基於 YOLOv11 的 PCB 元件偵測系統，用來辨識電路板上的元件，例如電容、電阻與焊點等關鍵目標。',
      en: 'Implemented YOLOv11-based object detection for PCB component identification, detecting components such as capacitors, resistors, and solder joints.',
    },
    outcome: {
      zh: '這個專案展示了我將深度學習目標偵測應用在實際 PCB 視覺檢測任務上的能力，能有效協助元件定位與後續自動化檢測流程。',
      en: 'This project demonstrates my ability to apply deep-learning-based object detection to practical PCB inspection tasks, supporting component localization and downstream automation workflows.',
    },
    coverImageSrc: project2Cover,
    coverImageAlt: {
      zh: 'PCB 元件偵測結果 1',
      en: 'PCB component detection result 1',
    },
    coverImageTone: 'copper',
    detailImageSrc: project2Detail01,
    detailImageAlt: {
      zh: 'PCB 元件偵測結果 2',
      en: 'PCB component detection result 2',
    },
    stack: ['Python', 'YOLOv11', 'Object Detection', 'Computer Vision', 'PCB Inspection'],
    metrics: [
      { label: { zh: '模型架構', en: 'Model architecture' }, value: { zh: 'YOLOv11', en: 'YOLOv11' } },
      { label: { zh: '偵測目標', en: 'Targets' }, value: { zh: '電容 / 電阻 / 焊點', en: 'Capacitors / Resistors / Solder joints' } },
      { label: { zh: '應用場景', en: 'Use case' }, value: { zh: 'PCB 視覺檢測', en: 'PCB visual inspection' } },
    ],
    links: [
      { label: { zh: '聯絡我了解更多', en: 'Contact me for more details' }, href: '#/contact' },
    ],
  },
  {
    slug: 'web-based-aoi-review-platform',
    title: { zh: '網頁式 AOI 複判平台', en: 'Web-Based AOI Review Platform' },
    category: { zh: '全端系統 / AOI 缺陷複判', en: 'Full-Stack System / AOI Defect Review' },
    summary: {
      zh: '我使用 ASP.NET Core Web API（後端）與 Vue.js（前端）開發了一套完整的 SPC（Statistical Process Control）網頁平台。',
      en: 'Developed a full-stack SPC (statistical process control) web platform using ASP.NET Core Web API (backend) and Vue.js (frontend).',
    },
    outcome: {
      zh: '我實作了缺陷複判介面，可從 AOI 資料庫擷取 PCB 影像與 NG 元件資料，並整合基於 Three.js 的 3D 視覺化功能，讓使用者能在瀏覽器中互動式檢視缺陷深度圖。',
      en: 'Implemented a defect review interface to retrieve PCB images and NG component data from the AOI database. Integrated Three.js-based 3D visualization for interactive rendering of defect depth maps in the browser.',
    },
    coverImageSrc: project3Cover,
    coverImageAlt: {
      zh: 'AOI 複判平台畫面',
      en: 'AOI review platform overview',
    },
    coverImageTone: 'forest',
    detailImageSrc: project3Detail01,
    detailImageAlt: {
      zh: 'AOI 缺陷深度圖與複判畫面',
      en: 'AOI defect depth-map review view',
    },
    stack: ['ASP.NET Core Web API', 'Vue.js', 'Three.js', 'SPC', 'AOI Database'],
    metrics: [
      { label: { zh: '系統型態', en: 'System type' }, value: { zh: '全端 SPC 平台', en: 'Full-stack SPC platform' } },
      { label: { zh: '主要功能', en: 'Core feature' }, value: { zh: 'AOI 缺陷複判', en: 'AOI defect review' } },
      { label: { zh: '視覺化技術', en: 'Visualization' }, value: { zh: 'Three.js 3D 深度圖', en: 'Three.js 3D depth map' } },
    ],
    links: [
      { label: { zh: '聯絡我了解更多', en: 'Contact me for more details' }, href: '#/contact' },
    ],
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export const articles: ArticleItem[] = [
  {
    title: { zh: '用 Vue 3 建立可部署到 GitHub Pages 的個人網站', en: 'Building a personal website with Vue 3 for GitHub Pages' },
    summary: {
      zh: '從 Vite 設定、base path 到 GitHub Actions 部署，整理一套適合個人品牌站的最小可行流程。',
      en: 'A minimal but practical workflow covering Vite setup, base path handling, and deployment to GitHub Pages through GitHub Actions.',
    },
    publishDate: '2026-03-23',
    readingTime: { zh: '6 分鐘閱讀', en: '6 min read' },
    href: '#',
    imageLabel: { zh: 'Vue + GitHub Pages 部署流程', en: 'Vue + GitHub Pages deployment flow' },
    imageTone: 'sunrise',
  },
  {
    title: { zh: '技術文章怎麼寫，才更容易累積穩定流量', en: 'How to write technical articles that build consistent traffic' },
    summary: {
      zh: '分享我會如何規劃主題集群、文章結構與 CTA，讓內容不只被看到，也能慢慢轉成支持。',
      en: 'I explain how I would plan topic clusters, article structure, and calls to action so content can become both discoverable and useful.',
    },
    publishDate: '2026-03-18',
    readingTime: { zh: '5 分鐘閱讀', en: '5 min read' },
    href: '#',
    imageLabel: { zh: '內容策略與流量成長', en: 'Content strategy and traffic growth' },
    imageTone: 'ocean',
  },
  {
    title: { zh: 'GitHub Pages 與 Vercel 怎麼選', en: 'How to choose between GitHub Pages and Vercel' },
    summary: {
      zh: '從成本、部署自由度與長期變現方向，分析兩種平台對個人網站經營的差異。',
      en: 'A comparison of cost, deployment flexibility, and long-term monetization direction for personal websites.',
    },
    publishDate: '2026-03-10',
    readingTime: { zh: '4 分鐘閱讀', en: '4 min read' },
    href: '#',
    imageLabel: { zh: '平台比較與選型', en: 'Platform comparison and trade-offs' },
    imageTone: 'forest',
  },
]

export const interviews: InterviewItem[] = [
  {
    company: 'Frontend Engineer Mock Interview',
    role: { zh: 'Vue 前端候選人', en: 'Vue frontend candidate' },
    year: '2025',
    summary: {
      zh: '針對 Vue 元件拆分、狀態管理與部署流程做完整模擬，幫助我整理實戰經驗的說法。',
      en: 'A full mock interview focused on component boundaries, state management, and deployment workflows, helping me package real experience into clear answers.',
    },
    takeaways: [
      { zh: '先講需求與限制，再說技術選型原因', en: 'Start with constraints and requirements before explaining technical choices' },
      { zh: '回答元件拆分時要帶出資料流與維護性', en: 'When discussing component splits, connect them to data flow and maintainability' },
      { zh: '部署經驗能增加工程完整度的說服力', en: 'Deployment experience strengthens the impression of engineering completeness' },
    ],
    imageLabel: { zh: '模擬面試與回答結構', en: 'Mock interview and answer structure' },
    imageTone: 'plum',
  },
  {
    company: 'Product UI Team Interview Practice',
    role: { zh: '前端工程師', en: 'Frontend developer' },
    year: '2024',
    summary: {
      zh: '練習如何把 UI 細節、RWD 與使用者體驗轉成面試官聽得懂的成果敘述。',
      en: 'Practice converting UI details, responsive design work, and UX decisions into outcomes that are clear to interviewers.',
    },
    takeaways: [
      { zh: '不只講做了什麼，也要講改善了什麼', en: 'Do not only describe what was built, explain what improved' },
      { zh: '用案例說明設計與工程如何協作', en: 'Use examples to show how design and engineering collaborated' },
      { zh: '準備一套可重複使用的 STAR 回答結構', en: 'Prepare a reusable STAR-style structure for interview answers' },
    ],
    imageLabel: { zh: '產品設計與工程協作', en: 'Product design and engineering collaboration' },
    imageTone: 'copper',
  },
]
