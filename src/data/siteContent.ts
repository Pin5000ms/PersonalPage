
import profileAvatar from '../assets/avatar.jpg'
import project1Cover from '../assets/projects/project1-cover.png'
import project1Detail01 from '../assets/projects/project1-detail-01.png'
import project2Cover from '../assets/projects/project2-cover.png'
import project2Detail01 from '../assets/projects/project2-detail-01.png'
import project3Cover from '../assets/projects/project3-cover.gif'
import project3Detail01 from '../assets/projects/project3-detail-01.gif'
import project4Cover from '../assets/projects/project4-cover.gif'
import project4Detail01 from '../assets/projects/project4-detail-01.gif'

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
  group: 'ai' | 'other'
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
    aiTitle: LocalizedText
    otherTitle: LocalizedText
    detailLabel: LocalizedText
    dragHint: LocalizedText
    autoScrolling: LocalizedText
    paused: LocalizedText
  }
}

export const siteCopy: SiteCopy = {
  nav: [
    { label: { zh: 'About (關於我)', en: 'About' }, to: '/about', mark: '我' },
    { label: { zh: 'Articles (技術分享文章)', en: 'Articles' }, to: '/articles', mark: '文' },
    { label: { zh: 'Projects (作品集)', en: 'Projects' }, to: '/projects', mark: '作' },
    { label: { zh: 'Contact (聯絡我)', en: 'Contact' }, to: '/contact', mark: '聯' },
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
      zh: '',
      en: '',
    },
  },
  projectsPage: {
    kicker: { zh: 'Projects overview', en: 'Projects overview' },
    title: { zh: '作品集', en: 'Projects' },
    description: {
      zh: '',
      en: '',
    },
  },
  articlesPage: {
    kicker: { zh: 'Technical writing', en: 'Technical writing' },
    title: { zh: '技術分享文章', en: 'Technical articles' },
    description: {
      zh: '',
      en: '',
    },
  },
  contactPage: {
    kicker: { zh: 'Contact', en: 'Contact' },
    title: { zh: '聯絡我', en: 'Contact me' },
    description: {
      zh: '',
      en: '',
    },
    availability: {
      zh: '如果你想聊作品合作或面試機會，可以從這邊找到我，我目前在看新的工作機會。',
      en: 'Currently open to new opportunities, frontend collaboration, and technical content conversations.',
    },
  },
  hero: {
    kicker: { zh: 'Profile', en: 'Profile' },
    panelLabel: { zh: '目前重點', en: 'Current focus' },
  },
  skillsSection: {
    kicker: { zh: 'What I can help with', en: 'What I can help with' },
    title: {
      zh: '從桌面軟體、AI 到電腦視覺與 Web 開發',
      en: 'From desktop software and AI to computer vision and web development',
    },
    description: {
      zh: '這裡整理我目前最具代表性的技術能力，涵蓋桌面應用、機器學習、視覺檢測與全端系統開發。',
      en: 'This section highlights the technical areas that best represent my work across desktop applications, machine learning, vision inspection, and full-stack development.',
    },
    dragHint: { zh: '向右滑動查看更多技能', en: 'Scroll right to explore more skills' },
    autoScrolling: { zh: '自動滑動中', en: 'Auto scrolling' },
    paused: { zh: '已暫停，方便閱讀', en: 'Paused for browsing' },
  },
  projectsSection: {
    kicker: { zh: 'Projects', en: 'Projects' },
    title: {
      zh: '我做過的專案',
      en: 'Clear project storytelling is more persuasive than listing technologies alone',
    },
    description: {
      zh: '每個專案都用「做了什麼、為什麼這樣做、最後帶來什麼結果」來呈現。',
      en: 'Each project is framed by what I built, why I approached it that way, and what outcome it created.',
    },
    aiTitle: { zh: 'AI 相關', en: 'AI related' },
    otherTitle: { zh: '其他專案', en: 'Other projects' },
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
      zh: '用作品與文章建立技術專業可信度',
      en: 'Use projects and writing to establish tech credibility',
    },
  ],
}

export const contactInfo: ContactInfoItem[] = [
  {
    label: 'Email',
    value: 'tomchang@gmail.com',
    href: 'mailto:tomchang@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/tomchang',
    href: 'github.com/tomchang',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/tomchang',
    href: 'linkedin.com/in/tomchang',
  },
]

export const skills: SkillItem[] = [
  {
    title: { zh: '軟體工程', en: 'Software Engineering' },
    summary: {
      zh: '具備 Windows 桌面應用開發經驗，熟悉 C# WinForms、WPF 與 MVVM 架構，也能用 Python 建立後端服務與 AI 應用流程。',
      en: 'Experienced in Windows desktop application development with C# WinForms, WPF, and MVVM, while also using Python to build backend services and AI-driven workflows.',
    },
    tags: ['C#', 'WinForms', 'WPF', 'MVVM', 'Python', 'PyTorch', 'FastAPI'],
  },
  {
    title: { zh: 'AI / Machine Learning', en: 'AI / Machine Learning' },
    summary: {
      zh: '熟悉深度學習模型實作與整合，包含 CNN、FNN、YOLO、SAM 與 LLM，能依需求選擇合適模型落地到實際應用情境。',
      en: 'Comfortable implementing and integrating deep-learning solutions including CNN, FNN, YOLO, SAM, and LLM workflows for practical use cases.',
    },
    tags: ['CNN', 'FNN', 'YOLO', 'SAM', 'LLM'],
  },
  {
    title: { zh: '電腦視覺', en: 'Computer Vision' },
    summary: {
      zh: '熟悉影像處理與機器視覺檢測流程，能結合 OpenCV 與 Halcon 建立量測、定位、缺陷分析與自動化視覺應用。',
      en: 'Skilled in image processing and machine vision inspection workflows, combining OpenCV and Halcon for measurement, localization, defect analysis, and automation.',
    },
    tags: ['OpenCV', 'Halcon'],
  },
  {
    title: { zh: 'Web 開發', en: 'Web Development' },
    summary: {
      zh: '可開發前後端整合系統，包含 ASP.NET Core Web API、Vue.js、React 與 Three.js，支援資料介接、互動式介面與 3D 視覺化。',
      en: 'Able to build integrated web systems with ASP.NET Core Web API, Vue.js, React, and Three.js for data-driven interfaces, interactive tooling, and 3D visualization.',
    },
    tags: ['ASP.NET Core Web API', 'Vue.js', 'React', 'Three.js'],
  },
]

export const projects: ProjectItem[] = [
  {
    slug: 'unsupervised-clustering-of-solder-joints',
    group: 'ai',
    title: { zh: '焊點非監督式分群', en: 'Unsupervised Clustering of Solder Joints' },
    category: { zh: '電腦視覺 / AI 分群', en: 'Computer Vision / AI Clustering' },
    summary: {
      zh: '我建立了一套非監督式分群流程，先利用 Segment Anything Model（SAM）對焊點進行分割，再透過 autoencoder 萃取 128 維潛在特徵，最後使用 DBSCAN 在無標註資料的情況下自動將焊點型態分群。',
      en: 'Developed an unsupervised clustering pipeline by segmenting solder joints using Segment Anything Model (SAM), extracting 128-dimensional latent embeddings with an autoencoder, and applying DBSCAN clustering to group patterns without labeled data.',
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
    group: 'ai',
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
      zh: 'PCB 元件偵測結果',
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
    group: 'other',
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
  {
    slug: 'csharp-wpf-sudoku-flowchart',
    group: 'other',
    title: { zh: 'C# / WPF 數獨與流程圖', en: 'C# / WPF Sudoku & FlowChart' },
    category: { zh: '桌面應用 / WPF 工具', en: 'Desktop App / WPF Tooling' },
    summary: {
      zh: '我開發了一個數獨求解器，使用回溯演算法並即時視覺化顯示求解過程。',
      en: 'A Sudoku solver that utilizes a backtracking algorithm with real-time visualization of the solving process.',
    },
    outcome: {
      zh: '我也製作了一個流程圖概念驗證（POC），用於靈活建立工作流程，其中每個方塊都代表一個獨立功能，展示我在 C# / WPF 桌面應用與互動式工具設計上的能力。',
      en: 'I also built a flowchart proof of concept (POC) designed for flexible workflow creation, where each block represents a distinct function, demonstrating my ability to design interactive desktop tools with C# and WPF.',
    },
    coverImageSrc: project4Cover,
    coverImageAlt: {
      zh: '數獨求解器與即時視覺化畫面',
      en: 'Sudoku solver with real-time visualization',
    },
    coverImageTone: 'sunrise',
    detailImageSrc: project4Detail01,
    detailImageAlt: {
      zh: '流程圖工作流概念驗證畫面',
      en: 'Flowchart workflow proof-of-concept view',
    },
    stack: ['C#', 'WPF', 'Backtracking Algorithm', 'Desktop UI', 'Workflow POC'],
    metrics: [
      { label: { zh: '應用型態', en: 'Application type' }, value: { zh: '桌面工具', en: 'Desktop tool' } },
      { label: { zh: '求解方法', en: 'Solving method' }, value: { zh: '回溯演算法', en: 'Backtracking algorithm' } },
      { label: { zh: '延伸功能', en: 'Extended feature' }, value: { zh: '流程圖工作流建立', en: 'Flowchart workflow creation' } },
    ],
    links: [
      { label: { zh: '聯絡我了解更多', en: 'Contact me for more details' }, href: '#/contact' },
    ],
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
