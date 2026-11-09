/**
 * 英文源 —— FROZEN COPY, reproduced 1:1 from CONTENT-FREEZE.md.
 *
 * 2026-07-22:原 frozen.ts 原样改名到这里,一个字符没动。
 * frozen.ts 现在是解析层:深合并 EN + 当前语种字典，再以**原来的具名 const**
 * 重新导出，所以 13 个页面的 import 语句一行都不用改。
 * 改文案仍然只改这个文件（并同步 CONTENT-FREEZE.md）。
 *
 * 铁律：文案 1:1 冻结。Do not edit, translate, rewrite, or polish any string
 * in this file without explicit user approval. Section ids (S1…S12) map to the
 * headings in ../../../CONTENT-FREEZE.md.
 *
 * Anything CONTENT-FREEZE.md does not specify is left absent on purpose and
 * recorded in the delivery notes — never invent filler copy here.
 */

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

export const ROUTES = {
  home: "/",
  about: "/about",
  strategy: "/strategy",
  roadmap: "/roadmap",
  ncoreBasic: "/ncore/basic",
  ncoreTrading: "/ncore/trading",
  ncoreFeatures: "/ncore/features",
  ncoreTrends: "/ncore/trends",
  ncoreX: "/ncore/x",
  ncoreToken: "/ncore/token",
  careers: "/careers",
  collaboration: "/collaboration",
  contact: "/contact",
} as const;

/** CONTENT-FREEZE.md line 130: Login 入口 → member portal. */
export const LOGIN_URL = "https://member.naslabtec.com/login";

/* ------------------------------------------------------------------ */
/* Nav — CONTENT-FREEZE.md · 导航 (Nav)                                 */
/* Home · Naslab · Products · Careers · Collaboration · Contact Us      */
/* · [语言切换 🇺🇸] · Login                                              */
/* ------------------------------------------------------------------ */

export type NavChild = {
  label: string;
  to: string;
  /** 二级缩进项(默认收起,点父项旁边的箭头才展开) */
  sub?: boolean;
  /** 归属哪个父项的 label —— 决定它跟着谁展开/收起 */
  parent?: string;
};
export type NavItem = { label: string; to?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Home", to: ROUTES.home },
  {
    label: "Naslab",
    children: [
      { label: "About Us", to: ROUTES.about },
      // NOTE: no frozen label exists for /strategy — placeholder, pending user.
      { label: "Strategy", to: ROUTES.strategy },
      { label: "Roadmap", to: ROUTES.roadmap },
    ],
  },
  {
    label: "Products",
    children: [
      // ⚠️ 预览中(2026-07-22),用户还没定案。
      // Ncore 3.0 是四页链式内容,原来只挂第一页 → Market Trends 只能从
      // /ncore/features 底部按钮进,导航里点不到。这里把四页平铺成缩进子项。
      // 若采用:content/locales/*.json 共 13 个语种的 NAV[2].children 都要补
      // 这 4 条译名,而且【必须按下标对齐】—— i18n merge 是按数组下标合并的,
      // 少一条后面全串位。
      { label: "Ncore 3.0", to: ROUTES.ncoreBasic },
      { label: "Basic Understanding", to: ROUTES.ncoreBasic, sub: true, parent: "Ncore 3.0" },
      { label: "Trading Logic", to: ROUTES.ncoreTrading, sub: true, parent: "Ncore 3.0" },
      { label: "Features", to: ROUTES.ncoreFeatures, sub: true, parent: "Ncore 3.0" },
      { label: "Market Trends", to: ROUTES.ncoreTrends, sub: true, parent: "Ncore 3.0" },
      { label: "Ncore X", to: ROUTES.ncoreX },
      { label: "NCT Token", to: ROUTES.ncoreToken },
    ],
  },
  { label: "Careers", to: ROUTES.careers },
  { label: "Collaboration", to: ROUTES.collaboration },
  { label: "Contact Us", to: ROUTES.contact },
];

/* ------------------------------------------------------------------ */
/* S1 · Hero                                                           */
/* ------------------------------------------------------------------ */

export const S1_HERO = {
  kicker: "THE MARKETING ENGINE OF NASTECH GLOBAL",
  h1: "WE POWER THE NEXT ERA OF DIGITAL WEALTH",
  body: "We empower individuals and businesses to access next-generation digital finance solutions through secure, scalable, and forward-looking strategies. By helping clients stay ahead of market trends and make smarter decisions, Naslab drives sustainable growth and long-term value in an ever-evolving digital economy.",
  ctaPrimary: "CONTACT US",
  ctaSecondary: "EXPLORE PRODUCTS",
} as const;

/* ------------------------------------------------------------------ */
/* S2 · A New Era                                                      */
/* ------------------------------------------------------------------ */

export const S2_NEW_ERA = {
  kicker: "A NEW PARADIGM",
  h2: "A NEW ERA OF DIGITAL WEALTH",
  body: "Build your crypto reserve with confidence, enjoying secure and steady growth with Naslab.",
  cta: "EXPLORE PRODUCTS",
  stats: [
    "24/7 Trading Operations",
    "99.9% Uptime Guarantee",
    "<50ms Execution Latency",
    "Global Market Coverage",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* S3 · 01 · MISSION — What We Do                                      */
/* ------------------------------------------------------------------ */

export const S3_MISSION = {
  kicker: "01 · MISSION — What We Do",
  h2: "What We Do for the Next Financial Era",
  body: "Naslab connects businesses and individuals with innovative digital finance solutions by strategically positioning Nastech Global's advanced products for sustainable, long-term growth.",
  cta: "LOOK AT OUR STRATEGY",
} as const;

/* ------------------------------------------------------------------ */
/* S4 · 02 · DIRECTION — Strategic Direction                           */
/* ------------------------------------------------------------------ */

export const S4_DIRECTION = {
  kicker: "02 · DIRECTION — Strategic Direction",
  h2: "Strategic Direction for the Future of Digital Finance",
  body: "A long-term roadmap outlining Naslab's evolution from automated trading systems to a scalable, global digital finance infrastructure.",
  cta: "VIEW STRATEGIC ROADMAP",
} as const;

/* ------------------------------------------------------------------ */
/* S5 · 03 · PREDICTIVE MEV ENGINE — Ncore 3.0                         */
/* ------------------------------------------------------------------ */

export const S5_NCORE_3 = {
  kicker: "03 · PREDICTIVE MEV ENGINE — Ncore 3.0",
  h2: "Ncore 3.0 — Predictive MEV Trading for DEX Markets",
  body: "A DEX-focused MEV trading platform that monitors the mempool, anticipates large orders, and executes front-run and back-run strategies with precision.",
  /** 附属 UI 卡 A — 动态数据示意 */
  mempoolCard: {
    title: "MEMPOOL STREAM",
    rows: [
      { hash: "0x7a..2f", kind: "SWAP", gas: "42 gwei", size: "0.45 ETH" },
      { hash: "0x4d..91", kind: "ADD LP", gas: "38 gwei", size: "1.20 ETH" },
      { hash: "0x12..b8", kind: "SWAP", gas: "55 gwei", size: "2.80 ETH" },
      { hash: "0xc9..14", kind: "LIQ", gas: "28 gwei", size: "0.08 ETH" },
    ],
  },
  /** 附属 UI 卡 B */
  logicCard: {
    title: "TRADING LOGIC",
    meta: "Live · v2.0",
    flow: "DETECT → PREDICT → EXECUTE",
  },
  panels: [
    {
      label: "01 · FUNDAMENTALS — Basic Understanding",
      body: "Before understanding the core of Ncore X, it is essential to grasp the foundational logic of on-chain execution: transactions are not guaranteed by submission, but determined by visibility, ordering, and execution paths in a public environment.",
    },
    {
      label: "02 · LOGIC — Trading Logic",
      body: "Ncore 3.0 is a DEX-focused MEV trading platform that systematically captures value through mempool monitoring, sandwich execution, and optimized transaction ordering before the market reacts.",
    },
    {
      label: "03 — Features",
      body: "Ncore 3.0 is an advanced DEX front-running and MEV trading system that combines mempool intelligence, real-time execution, gas optimization, and customizable risk controls to capture transaction-order-driven value continuously and securely.",
    },
    {
      label: "04 — Market Trends",
      body: "Ncore 3.0 is built to capitalize on major crypto market trends—DeFi growth, MEV dynamics, institutional participation, Layer 2 scaling, AI-driven trading, and rising volatility—by delivering adaptive, low-latency, and execution-optimized trading capabilities.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* S6 · 04 · CROSS-VENUE — Ncore X                                     */
/* ------------------------------------------------------------------ */

export const S6_NCORE_X = {
  kicker: "04 · CROSS-VENUE — Ncore X",
  h2: "Ncore X — Intelligent Cross-Platform Arbitrage Engine",
  body: "A cross-platform arbitrage engine covering DEX↔DEX, CEX↔CEX, and DEX↔CEX, transforming market price discrepancies into repeatable, systematic returns.",
  cta: "EXPLORE NCORE X",
  /** 附属 UI 卡 — 价差示意 */
  spreadCard: {
    legs: [
      { venue: "Uniswap V3", meta: "DEX · ETHEREUM", price: "$2,847.20" },
      { venue: "Binance", meta: "CEX · SPOT", price: "$2,851.46" },
    ],
    resultLabel: "SPREAD CAPTURED",
    resultValue: "+$4.26 / unit",
  },
} as const;

/* ------------------------------------------------------------------ */
/* /ncore/x 子页正文 — naslabtec.com/ncore/x 2026-07-17 补抓,1:1 照录   */
/* (来源:NASLABTEC-CAPTURE.md 🆕 段)                                  */
/* ------------------------------------------------------------------ */

export const X_PAGE = {
  title: "Ncore X",
  subtitle: "Intelligent Cross-Platform Arbitrage Engine",
  newEra: {
    heading: "A New Era of Cross-Platform Arbitrage",
    paragraphs: [
      "In today's digital asset markets, price fluctuations occur not only within a single exchange but also across multiple trading platforms.",
      "Ncore X is designed to capture these fleeting cross-platform opportunities, offering clients a systematic way to profit from temporary price deviations between decentralized (DEX) and centralized exchanges (CEX).",
      "By analyzing multi-platform prices, order books, and liquidity distribution in real-time, Ncore X executes automated arbitrage trades at the exact moment market inefficiencies occur, keeping clients ahead and capturing predictable, systematized profits.",
    ],
  },
  coreConcept: {
    heading: "Core Concept: Cross-Platform Arbitrage",
    intro:
      "Cross-Platform arbitrage exploits price differences between trading platforms to generate profit:",
    points: [
      {
        title: "Direction-independent",
        body: "Gains come from short-term price deviations rather than market trends",
      },
      {
        title: "Systematic execution",
        body: "Algorithm-driven automation reduces manual intervention",
      },
      {
        title: "Market efficiency enhancement",
        body: "Arbitrage activity helps align prices across platforms",
      },
    ],
    closing:
      "Ncore X fully productizes this strategy, enabling clients to capture arbitrage opportunities efficiently and reliably.",
  },
  scenarios: {
    heading: "Three Arbitrage Scenarios",
    items: [
      {
        title: "DEX ↔ DEX Arbitrage",
        bullets: [
          "Exploits temporary price gaps between decentralized exchanges",
          "Automatically buys from lower-priced liquidity pools and sells to higher-priced pools",
          "Completes arbitrage cycles rapidly, improving price consistency across DEXs",
        ],
        img: "/img/ncorex-dex-dex.jpg",
      },
      {
        title: "CEX ↔ CEX Arbitrage",
        bullets: [
          "Identifies micro price discrepancies between centralized exchanges",
          "Leverages differences in order depth, matching mechanisms, or regional factors",
          "Systematic execution allows clients to act ahead of market movements",
        ],
        img: "/img/ncorex-cex-cex.jpg",
      },
      {
        title: "DEX ↔ CEX Arbitrage",
        bullets: [
          "Bridges decentralized and centralized platforms",
          "Captures cross-system price deviations",
          "Automatically executes arbitrage trades, transferring liquidity efficiently",
        ],
        img: "/img/ncorex-dex-cex.jpg",
      },
    ],
  },
  advantages: {
    heading: "Ncore X Key Advantages",
    items: [
      {
        title: "Intelligent Multi-Platform Monitoring",
        bullets: [
          "Real-time tracking of DEX and CEX data",
          "Accurate detection of price anomalies and arbitrage signals",
        ],
        img: "/img/ncorex-monitoring.jpg",
      },
      {
        title: "Ultra-Low Latency Execution",
        bullets: [
          "Rapid transmission of trade instructions across platforms",
          "Ensures arbitrage opportunities are captured before prices revert",
        ],
        img: "/img/ncorex-latency.jpg",
      },
      {
        title: "Cost Optimization",
        bullets: [
          "Smart management of transaction fees",
          "Minimizes costs during network congestion to maximize net profits",
        ],
        img: "/img/ncorex-cost.jpg",
      },
      {
        title: "Risk Intelligence",
        bullets: [
          "Continuous monitoring of trade execution and market volatility",
          "Dynamic strategy adjustments to ensure stable and controlled returns",
        ],
        img: "/img/ncorex-risk.jpg",
      },
    ],
  },
  productized: {
    heading: "Productized Value for Clients",
    points: [
      {
        title: "Comprehensive Market Coverage",
        body: "A single strategy targets multiple platforms",
      },
      {
        title: "Automated Execution",
        body: "Arbitrage trades complete without manual intervention",
      },
      {
        title: "High Efficiency & Low Cost",
        body: "Optimized transaction fees and execution",
      },
      {
        title: "Controlled Risk",
        body: "Adaptive strategy parameters maintain safety and profitability",
      },
    ],
    closing:
      "Ncore X turns complex cross-platform arbitrage strategies into a ready-to-use, productized solution, allowing clients to focus on profits rather than technical complexity.",
    img: "/img/ncorex-product.jpg",
  },
  realWorld: {
    heading: "Real-World Application",
    intro: "In practice:",
    steps: [
      "Price discrepancies arise between platforms",
      "Ncore X automatically detects the arbitrage signal",
      "Buys low on one platform and sells high on another, closing the profit loop",
      "Locks in gains before the market broadly reacts",
    ],
    closing:
      "This approach allows clients to capture predictable, repeatable profits in fast-moving markets.",
    img: "/img/ncorex-realworld.jpg",
  },
  futureVision: {
    heading: "Future Vision of Ncore X",
    intro:
      "Ncore X is not just a trading tool—it represents the standardization of intelligent arbitrage:",
    bullets: [
      "Designed for both individual and institutional users",
      "Automates cross-platform arbitrage across multiple platforms",
      "Systematically captures market inefficiencies",
      "Scalable across multiple assets and platforms",
    ],
    closing:
      "In the rapidly evolving world of digital assets, Ncore X empowers clients to stay ahead, profit consistently, and achieve long-term growth.",
    img: "/img/ncorex-future.jpg",
  },
  highlights: {
    heading: "Key Highlights",
    bullets: [
      "Full cross-platform arbitrage coverage (DEX ↔ DEX / CEX ↔ CEX / DEX ↔ CEX)",
      "Systematic, automated, low-latency execution",
      "Optimized cost and intelligent risk management",
      "Productized solution, ready for immediate client use",
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* /ncore/token 子页正文 — naslabtec.com/ncore/token 2026-07-17 补抓    */
/* ------------------------------------------------------------------ */

export const NCT_PAGE = {
  title: "Ncore Token (NCT)",
  subtitle: "The Native Utility Token Powering the Ncore Ecosystem",
  intro: [
    "Ncore Token (NCT) is the core utility token of the Naslab ecosystem, designed around system usage, ecosystem participation, and long-term value alignment.",
    "Rather than serving as a speculative asset, NCT functions as the settlement, access, and incentive layer across Ncore products.",
  ],
  tokenomics: {
    heading: "Tokenomics",
    stats: [
      { label: "TOTAL SUPPLY", value: "1,000,000,000 NCT" },
      { label: "LAUNCH PRICE", value: "USD 0.10" },
      {
        label: "INITIAL CIRCULATING SUPPLY",
        value: "100,000,000 NCT (10%)",
      },
    ],
    initialSplit: [
      "50,000,000 allocated to existing users",
      "50,000,000 allocated to node holders",
    ],
    allocationHeading: "Allocation Breakdown",
    allocation: [
      { pct: "30%", label: "Community & Ecosystem" },
      { pct: "30%", label: "Listings & Partnerships" },
      { pct: "15%", label: "Treasury / Reserves" },
      { pct: "10%", label: "Founders & Team (4-year vesting)" },
      { pct: "5%", label: "Advisors" },
      { pct: "5%", label: "Private Sale" },
      { pct: "5%", label: "Public Sale" },
    ],
    img: "/img/nct-tokenomics.jpg",
  },
  revenue: {
    heading: "Revenue Model",
    bullets: [
      "All Ncore system subscriptions are paid exclusively in NCT",
      "Tokens used within the system are automatically burned",
      "Continuous reduction of circulating supply",
      "Buyback and swap mechanisms support long-term value stability",
      "Future staking mechanisms will unlock deeper ecosystem benefits",
    ],
    img: "/img/nct-revenue.jpg",
  },
  utility: {
    heading: "Utility & Advantages",
    groups: [
      {
        title: "Primary Settlement Token",
        bullets: [
          "NCT is the sole currency for Ncore subscriptions",
          "No fiat or alternative token substitutions",
          "Usage-driven burn mechanism reinforces scarcity",
        ],
        img: "/img/nct-utility.jpg",
      },
      {
        title: "Scarcity-Driven Value Structure",
        bullets: [
          "Tokens distributed only to existing users and node holders",
          "Controlled supply growth",
          "Demand expansion combined with supply reduction",
          "Designed for sustainable long-term value accumulation",
        ],
        img: "/img/nct-scarcity.jpg",
      },
      {
        title: "Exclusive Ecosystem Access",
        bullets: [
          "Whitelisting privileges",
          "Early participation in high-potential ecosystem projects",
          "Priority access to partner initiatives",
          "Strategic collaboration opportunities",
        ],
        img: "/img/nct-access.jpg",
      },
      {
        title: "Compliance & Long-Term Vision",
        bullets: [
          "NCT will be recognized as part of Naslab's asset base",
          "Planned integration into Hong Kong–regulated market structures",
          "Enhanced transparency and credibility with traditional finance",
          "Positioned as a bridge between blockchain innovation and regulated finance",
        ],
        img: "/img/nct-compliance.jpg",
      },
    ],
  },
  mastercard: {
    heading: "Naslab Mastercard",
    points: [
      {
        title: "Secure Crypto Storage",
        body: "Enables secure crypto storage, global spending, and transactions.",
      },
      {
        title: "Traditional Integration",
        body: "Integrates blockchain assets with traditional payment networks.",
      },
      {
        title: "Everyday Use",
        body: "Brings digital assets into everyday financial use.",
      },
    ],
    img: "/img/naslab-mastercard.jpg",
  },
} as const;

/* ------------------------------------------------------------------ */
/* S7 · 05 · UTILITY TOKEN — NCORE TOKEN (NCT)                         */
/* ------------------------------------------------------------------ */

export const S7_NCT = {
  kicker: "05 · UTILITY TOKEN — Ncore Token (NCT)",
  // 用户 2026-07-17 修订:全大写 NCORE TOKEN → Ncore Token(与 naslabtec 官方一致)
  h2: "Ncore Token (NCT)",
  body: "Ncore Token (NCT) is the native utility token of the Ncore ecosystem, serving as the exclusive settlement, access, and incentive layer that drives system usage, enforces scarcity through burn mechanisms, and aligns long-term ecosystem value.",
  cta: "Explore Ncore Token(NCT)",
} as const;

/* ------------------------------------------------------------------ */
/* S8 · 06 · OPEN ROLES — Careers                                      */
/* ------------------------------------------------------------------ */

export const S8_CAREERS = {
  kicker: "06 · OPEN ROLES — Careers",
  h2: "Careers at Naslab",
  body: "We're building technology-driven systems for fast-moving digital markets — and we're looking for people who care about execution, precision, and impact.",
  cta: "CONTACT US",
  /**
   * 5 role cards. `meta` is absent for Marketing Specialist because
   * CONTENT-FREEZE.md gives no meta line for it — do not invent one.
   */
  roles: [
    {
      title: "Quality Assurance (QA) Engineer",
      meta: "REMOTE · FULL-TIME · ENGINEERING",
    },
    { title: "Cybersecurity Specialist", meta: "HYBRID · FULL-TIME · SECURITY" },
    { title: "Marketing Specialist", meta: null },
    { title: "Sales Executive", meta: "FEATURED · FULL-TIME · GROWTH" },
    {
      title: "Customer Support Specialist",
      meta: "REMOTE · FULL-TIME · OPERATIONS",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* S9 · 07 · PARTNERSHIP — Collaboration                               */
/* ------------------------------------------------------------------ */

export const S9_COLLABORATION = {
  kicker: "07 · PARTNERSHIP — Collaboration",
  h2: "Collaboration with Naslab",
  body: "We collaborate with partners who value execution quality, technical rigor, and long-term system building.",
  cta: "CONTACT US",
  chips: ["INTEGRATIONS", "INFRASTRUCTURE", "TALENT PIPELINE", "RESEARCH"],
} as const;

/* ------------------------------------------------------------------ */
/* S10 · 08 · STRATEGIC ROADMAP                                        */
/* ------------------------------------------------------------------ */

export type RoadmapPhase = {
  period: string;
  items: readonly string[];
  /** 里程碑/注释 rendered after the phase card it belongs to. */
  note?: string;
};

export const S10_ROADMAP = {
  kicker: "08 · STRATEGIC ROADMAP",
  h2: "Shaping the Future of Digital Finance",
  body: "A long-term plan from foundational core systems through global scale — measured in milestones, capital tiers, and user reach.",
  phases: [
    {
      period: "2024 — Foundation & Core System Development",
      items: [
        "Completion of Ncore 2.0 core architecture and automated trading framework",
        "Development of Crypto Reserve Platform for secure digital asset management",
        "Formation of core technical and R&D teams via Nastech Global",
      ],
    },
    {
      period: "2025 — Product Stabilization & Strategy Design",
      items: [
        "Continuous upgrades to Ncore 2.0 (performance, security, algorithms)",
        "Initiation of Ncore X concept, core algorithm design, and strategy simulation",
        "Definition of three arbitrage strategy paths: DEX ↔ DEX / CEX ↔ CEX / DEX ↔ CEX",
      ],
      // Placement follows CONTENT-FREEZE.md 主列表 (line 90 sits after the 2025
      // phase). The appendix (line 115) says "2024 后" — discrepancy flagged.
      note: "Milestone — The recognition of market potential led to the official establishment of Naslab in 2025, focusing on scalable digital finance solutions and future global expansion.",
    },
    {
      period: "2025 Q1 – Q4 — Live Trading Expansion & Validation",
      items: [
        "Gradual expansion of Ncore 2.0 live trading scale ~$200K → ~$1M",
        "Security, system stability, and risk control enhancements",
        "Completion of Ncore X internal closed testing preparation",
      ],
    },
    {
      period: "2026 Q1 - Q4 — Scale Expansion & Market Readiness",
      items: [
        "Ncore 3.0 successfully implemented",
        "Ncore X - CEX Arbitrage launched",
        "~$5M → ~$50M trading scale",
        "Continuous optimization of execution speed, cost control, and risk management",
        "Estimated Ncore 3.0 users: 100,000",
      ],
      note: "Expected — Ncore X external availability subject to system stability, risk assessment, and regulatory conditions.",
    },
    {
      period: "2027 and Beyond — Ecosystem Expansion",
      items: [
        "Launch of Naslab Proprietary Exchange",
        "DeFi Project Incubation Platform (Launchpad)",
        "Trading Strategy & Bot Marketplace",
        "Introduction of Ncore Token (NCT)",
        "Projected Ecosystem Users: ~500,000+",
      ],
    },
  ] as readonly RoadmapPhase[],
} as const;

/* ------------------------------------------------------------------ */
/* S11 · 09 · CHANNEL OPEN — Contact                                   */
/* ------------------------------------------------------------------ */

export const S11_CONTACT = {
  kicker: "09 · CHANNEL OPEN — Contact",
  h2: "Get in Touch with Naslab",
  body: "Have a question or want to learn more about our products? Reach out to us and let's start a conversation about how Naslab can help you navigate the future of digital finance.",
  details: [
    { label: "EMAIL", value: "contact@naslabtec.com" },
    { label: "HEADQUARTERS", value: "Nastech Global · Asia-Pacific" },
    { label: "HOURS", value: "Mon–Fri · 09:00–18:00 UTC+8" },
  ],
  fields: [
    { index: "01", label: "NAME", type: "text" },
    { index: "02", label: "ORGANIZATION", type: "text" },
    { index: "03", label: "EMAIL", type: "email" },
    { index: "04", label: "PHONE NUMBER", type: "tel" },
    { index: "05", label: "MESSAGE", type: "textarea" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* S12 · Footer                                                        */
/* ------------------------------------------------------------------ */

export const S12_FOOTER = {
  wordmark: "NASLAB",
  blurb:
    "The marketing engine of Nastech Global. Empowering individuals and businesses to access next-generation digital finance solutions.",
  email: "contact@naslabtec.com",
  columns: [
    {
      title: "PRODUCTS",
      links: [
        { label: "Ncore 3.0", to: ROUTES.ncoreBasic },
        { label: "Ncore X", to: ROUTES.ncoreX },
        { label: "NCT Token", to: ROUTES.ncoreToken },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", to: ROUTES.about },
        { label: "Careers", to: ROUTES.careers },
        { label: "Collaboration", to: ROUTES.collaboration },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { label: "Contact Us", to: ROUTES.contact },
        { label: "Roadmap", to: ROUTES.roadmap },
        // No route + no content in CONTENT-FREEZE.md → rendered inert.
        { label: "Privacy Policy", to: null },
        { label: "Terms of Service", to: null },
      ],
    },
  ] as readonly {
    title: string;
    links: readonly { label: string; to: string | null }[];
  }[],
  legal: ["© 2026 NASLAB · ALL RIGHTS RESERVED.", "ENGINEERED IN THE DARK · SHIPPED IN THE OPEN"],
} as const;

/* ================================================================== */
/* 2026-07-17 · naslabtec.com 子页全文(P1 排查补齐,文案 1:1)         */
/* 来源:NASLABTEC-CAPTURE.md。权威顺序:内容以 naslabtec 为主。        */
/* ================================================================== */

/* ---------------------------- /about ------------------------------ */

export const ABOUT_PAGE = {
  title: "About Naslab",
  subtitle: "Marketing Innovative Digital Finance Solutions by Nastech Global",
  intro:
    "At Naslab, we specialize in marketing and promoting the cutting-edge digital finance solutions developed by Nastech Global. As the marketing arm of Nastech, our role is pivotal in introducing and expanding awareness of Nastech's innovative products, such as cryptocurrency reserves, staking programs, and automated trading tools. Our mission is to help individuals and businesses navigate the rapidly evolving digital economy by providing them with access to secure, scalable, and forward-thinking financial strategies.",
  founded: { label: "Founded", value: "2024" },
  story: {
    heading: "Our Story",
    paragraphs: [
      "Founded as a key partner of Nastech Global, Naslab focuses on delivering high-impact marketing strategies to drive the adoption of Nastech's products. We ensure that these advanced solutions reach a wider audience, creating awareness and supporting the growth of clients and users. Our marketing efforts are designed to highlight the unique value propositions of Nastech's offerings, positioning them as essential tools in the world of digital finance.",
      "With a deep commitment to showcasing Nastech's innovations, Naslab tailors its strategies to the diverse needs of businesses and individuals. We believe in equipping our clients with the tools they need to succeed by helping them access the latest advancements in the digital finance space. Whether it's maximizing investment potential, enhancing profitability, or leveraging automated trading, Naslab ensures that Nastech's products are positioned to meet the evolving needs of the market.",
      "Looking ahead, Naslab is committed to continuing its role as the bridge between Nastech Global's groundbreaking products and the global market. Our focus will remain on expanding our reach, ensuring that businesses and individuals are equipped with the best resources to thrive in the ever-changing digital finance landscape.",
    ],
  },
  mission: {
    heading: "Our Mission",
    body: "At Naslab, our mission is to empower businesses and individuals with the best-in-class digital finance solutions, promoting innovation and sustainable growth. As the marketing arm of Nastech Global, we focus on promoting cutting-edge products such as cryptocurrency reserves, staking programs, and automated trading tools. We are committed to providing secure, scalable, and forward-thinking strategies that help our clients navigate the rapidly evolving digital economy. By leveraging Nastech's groundbreaking solutions, we strive to optimize performance and create lasting value for both individuals and businesses.",
  },
  vision: {
    heading: "Our Vision",
    body: "We envision a future where digital finance enables businesses and individuals to unlock their full potential, driving smarter, more efficient, and secure operations. At Naslab, we continuously refine our marketing strategies to ensure that Nastech Global's innovative products are accessible and impactful. By combining our expertise in digital finance with forward-thinking marketing, we aim to inspire a new generation of clients to embrace these solutions, stay ahead of market trends, and capitalize on opportunities in the digital age. Together, we are shaping a future where innovation in digital finance drives long-term success and prosperity for all.",
  },
  leadership: {
    heading: "Meet Our Leadership",
    sub: "Two specialists, one company — corporate and international leadership under our Chief Executive Officer, technology under our Chief Technology Officer.",
    people: [
      {
        name: "Fabian Vossberg",
        role: "Chief Executive Officer",
        scope: "Corporate, legal and international operations",
        img: "/img/about-fabian-vossberg.jpg",
        video: undefined,
        videoPoster: undefined,
        quote:
          "\"Naslab has been built on real technology, and that remains its greatest asset. My responsibility is the structure around it — the legal preparation, the regional strategy, and the operating discipline a company needs in order to work credibly in many markets at once. The vision is set, and the ambition is larger than anything we have built so far.\"",
        bio: [
          "Fabian Vossberg was appointed Chief Executive Officer of Naslab in 2026, taking responsibility for corporate management, international operations, and global market expansion. For fifteen years he has taken companies past the point where one market is enough — across Europe and Southeast Asia. That is exactly where Naslab stands today.",
          "Most companies reach this stage with unproven technology. At Naslab the technology already works, and that is the hardest part. The remaining work is the structure around it — legal and regulatory preparation, regional strategy, and the discipline to operate credibly in many markets at once. That is the responsibility Vossberg carries as Chief Executive Officer.",
          "Three priorities define the current stage: strengthening Naslab's foundation in Asia, where Ncore 3.0 is now in official operation; preparing the company's framework for the Middle East and Europe; and giving partners and users clearer, more consistent support. Vossberg leads Naslab's corporate and international side alongside Peter Kovac, who leads technology.",
        ],
      },
      {
        name: "Peter Kovac",
        role: "Chief Technology Officer",
        scope: "Technology, product architecture and system innovation",
        img: "/img/about-peter-kovac.jpg",
        video: "/video/about-peter-kovac.mp4",
        videoPoster: "/video/about-peter-kovac-poster.jpg",
        quote:
          "\"Technology built the foundation of Naslab. Professional global management will help take that foundation much further. I brought in Fabian to lead the company, and turned my own focus to the part where I contribute most.\"",
        bio: [
          "Peter Kovac leads the technology behind Naslab. His work started with the part most companies find hardest — the technology itself: blockchain trading systems, system architecture, and product innovation. Everything Naslab brings to market today grew out of that engineering foundation.",
          "In 2026 Kovac moved into a dedicated technology leadership role as Chief Technology Officer, concentrating on technology development, product architecture, and system innovation across the company's trading infrastructure. He brought in Fabian Vossberg to lead the company and turned his own focus to the technology, where his contribution is greatest.",
          "Kovac now leads the technology that defines the company — the execution logic, market structure assessment, on-chain data interpretation and risk-aware filtering behind Ncore 3.0, now in official operation, and the next development direction represented by Ncore X. Technology with Kovac, corporate leadership with Fabian Vossberg. Two specialists, one company.",
        ],
      },
    ],
  },
  values: {
    heading: "Our Core Values",
    items: [
      { title: "Innovation", body: "Naslab markets innovative products from Nastech Global, including cryptocurrency reserves, staking programs, and automated trading tools, all of which require cutting-edge solutions and a forward-thinking approach." },
      { title: "Integrity", body: "As a marketing firm, Naslab needs to maintain the trust of its clients and stakeholders. Transparency and ethical business practices are key to promoting Nastech's products in a responsible and credible manner." },
      { title: "Security", body: "Given that Naslab is marketing digital finance solutions, especially involving cryptocurrency and trading, security is crucial in gaining client trust and ensuring the safe handling of sensitive data and transactions." },
      { title: "Sustainability", body: "Naslab is focused on long-term success, not just short-term marketing gains. Helping clients grow sustainably in the evolving digital finance space ties into the value of long-term stability." },
      { title: "Client-Centricity", body: "Naslab's mission is to help clients navigate the digital finance world. Providing personalized, impactful marketing solutions that align with client needs is critical for success in this space." },
      { title: "Collaboration", body: "Naslab works closely with Nastech Global, and collaboration with other partners and clients is essential to successfully market and expand awareness of Nastech's products." },
    ],
  },
} as const;

/* --------------------------- /strategy ---------------------------- */

export const STRATEGY_PAGE = {
  title: "Our Strategy",
  subtitle: "Empowering the Future of Digital Finance",
  intro: [
    "At Naslab, our strategy is rooted in a core belief: to connect businesses and individuals with the most innovative digital finance solutions available. We focus on strategically marketing Nastech Global's advanced products, including cryptocurrency reserves, staking programs, and automated trading tools. Our goal is to help clients maximize their potential by offering them cutting-edge solutions that enable growth in an ever-evolving financial landscape.",
    "Our approach combines market insight, technological innovation, and secure financial strategies, ensuring that we deliver impactful solutions today while remaining adaptable to future opportunities. Through careful collaboration and a deep understanding of emerging trends, we aim to provide clients with tools that not only address current challenges but also prepare them for the financial landscapes of tomorrow.",
  ],
  pillars: {
    heading: "Key Pillars of Our Strategy",
    items: [
      { title: "Holistic and Scalable Solutions", body: "Naslab focuses on delivering scalable marketing solutions that adapt with the dynamic digital finance market. Whether promoting cryptocurrency reserves, staking programs, or automated trading bots, our goal is to empower clients with the resources they need to enhance their financial strategies and achieve the best possible returns. As the digital finance landscape evolves, we ensure our marketing strategies evolve with it, tackling new challenges and capitalizing on emerging opportunities." },
      { title: "Tailored Experience for Every Participant", body: "Recognizing that each client has unique goals and needs, we personalize our marketing strategies to fit your individual financial journey. Whether you're a newcomer to digital finance or an experienced investor, our approach is designed to align with your financial objectives, risk tolerance, and preferences. This ensures that the solutions we promote for Naslab are the right fit for you at every stage of your financial path." },
    ],
  },
  focus1: {
    heading: "Strategic Focus",
    items: [
      { title: "Personalized Client Solutions", body: "We craft marketing strategies that cater to the distinct financial goals, risk tolerance, and aspirations of each client. Whether you're just beginning or already deeply engaged in digital finance, Naslab's solutions are tailored to meet your needs." },
      { title: "Scalable and Adaptive Marketing", body: "Our strategies are designed to grow with your financial journey. As market conditions shift, we adapt our approach to provide solutions that stay relevant, flexible, and aligned with your evolving needs." },
      { title: "Continuous Optimization", body: "We're committed to improving our marketing strategies through client feedback and emerging trends in the digital finance space. This ensures that the solutions we promote are not only up-to-date but also highly effective in achieving client goals." },
    ],
  },
  security: {
    heading: "Security-First Innovation",
    body: "Security is at the heart of everything we do at Naslab. All products marketed by Naslab, including those from Nastech, are backed by state-of-the-art security measures such as blockchain technology and encryption. We provide a secure environment for our clients to confidently engage with leading digital finance tools, ensuring their investments are protected and supporting long-term financial success.",
    chips: ["Blockchain Security", "Advanced Encryption", "Risk Management", "Protected Assets"],
  },
  growth: {
    heading: "Why We Focus on Strategic Growth and Partnership",
    body: "Naslab's commitment to strategic growth is rooted in a clear understanding of market needs. Just as Nastech's innovative products drive efficiency, our marketing approach focuses on bringing these solutions to the right audience through direct collaboration and long-term partnerships. We tailor every aspect of our marketing to ensure our clients are positioned for success in an ever-evolving digital finance ecosystem.",
    focusHeading: "Strategic Focus",
    items: [
      { title: "Collaborative Marketing with Clients", body: "We work directly with clients to refine marketing strategies, ensuring that Nastech products reach their ideal target audience effectively and efficiently." },
      { title: "Customization at the Core", body: "Every strategy is built with the client in mind, offering tailored marketing solutions that adapt to the unique needs and operational requirements of each business." },
      { title: "Building Long-Term Partnerships", body: "At Naslab, we focus on cultivating partnerships that support businesses as they scale. We're committed to helping our clients grow with emerging technologies and evolving market trends." },
    ],
  },
  innovation: {
    heading: "Innovation & Adaptability",
    blocks: [
      { title: "Future-Ready Solutions", body: "Naslab stays ahead of the curve by embracing continuous innovation. We invest in research and development to ensure that the marketing strategies we offer are aligned with the latest advancements in blockchain, AI, and cryptocurrency. This commitment to forward-thinking allows us to provide future-ready solutions that evolve alongside technological and market shifts." },
      { title: "Our Vision for Growth", body: "The expansion of Naslab's marketing efforts goes beyond promoting Nastech's initial offerings. As we continue to enhance our strategies, we aim to explore new technologies and marketing techniques, ensuring that our clients remain at the forefront of the digital finance space. With an eye on long-term scalability, Naslab is dedicated to helping businesses stay ahead in an ever-changing technological landscape." },
    ],
    focusHeading: "Strategic Focus",
    items: [
      { title: "Investing in Marketing Innovation", body: "We continuously enhance our marketing strategies with the latest tools and technologies to provide clients with cutting-edge digital finance solutions." },
      { title: "Adapting to Industry Changes", body: "As the digital finance market evolves, we refine our strategies to stay relevant and ensure that our clients continue to benefit from the most effective marketing approaches." },
      { title: "Ensuring Long-Term Growth", body: "Our solutions are built for long-term scalability, ensuring that our marketing strategies evolve with client needs, market shifts, and new technologies." },
    ],
  },
  whyChoose: {
    heading: "Why Choose Naslab?",
    items: [
      { title: "Intelligent Marketing Solutions", body: "At Naslab, we specialize in providing intelligent marketing strategies that evolve with the dynamic world of digital finance. Our expertise spans cryptocurrency reserves, staking programs, and automated trading tools." },
      { title: "Tailored Solutions for Impact", body: "We recognize that every client has unique needs and goals. That's why we offer personalized marketing strategies that seamlessly integrate with your existing financial approach." },
      { title: "Innovation that Keeps You Ahead", body: "Technology is constantly evolving, and so are we. At Naslab, we invest in the latest advancements, from blockchain technology to AI-driven tools, to future-proof our marketing strategies." },
    ],
  },
  visionAhead: {
    commitHeading: "Naslab's Commitment to Innovation",
    commitBody: "At Naslab, innovation is at the heart of everything we do. We are dedicated to continuously enhancing our marketing strategies and tools to ensure our clients stay ahead of the curve in the digital finance space.",
    visionHeading: "Naslab's Vision",
    visionSub: "Innovating Today for Tomorrow's Success",
    visionBody: "At Naslab, our vision is to empower businesses through innovative, future-ready marketing solutions. We are committed to creating strategies that not only address today's challenges but also lay the groundwork for tomorrow's opportunities. Our focus is on delivering results-driven solutions that integrate seamlessly with our clients' financial goals, enabling smarter decision-making, optimized growth, and long-term success in the digital finance space.",
    aheadHeading: "Looking Ahead",
    aheadSub: "A Future of Growth, Innovation, and Expansion",
    items: [
      { title: "Advancing Digital Finance Solutions", body: "At Naslab, we remain committed to advancing digital finance through continuous innovation. We are focused on leveraging cutting-edge technologies like blockchain, AI, and machine learning." },
      { title: "Expanding Our Market Reach", body: "Naslab is on track to expand its influence across global markets. By 2026, we plan to significantly broaden our footprint within the digital finance sector." },
      { title: "Building a Stronger Global Network", body: "As part of our vision for growth, Naslab is focusing on expanding its global presence through strong relationships with key industry leaders and partners." },
    ],
  },
} as const;

/* ------------------------ /roadmap 补充 ---------------------------- */

export const ROADMAP_EXTRA = {
  heroBody:
    "Naslab's roadmap reflects a long-term commitment to digital finance, crypto adoption, and advanced trading infrastructure—built with scalability, security, and real-world applicability at its core.",
  heroCta: "Explore Timeline",
  longTermVision: {
    heading: "Long-Term Vision",
    sub: "Building Future-Ready Digital Finance Infrastructure",
    lead: "Redefining Digital Finance",
    body: "Naslab aims to evolve into a comprehensive trading and strategy ecosystem—integrating automated trading, cross-platform arbitrage, and open strategy marketplaces to redefine how users interact with digital finance.",
    cards: [
      { title: "Automated Trading", body: "Advanced algorithms for efficient market execution" },
      { title: "Cross-Platform Arbitrage", body: "Seamless opportunities across DEX and CEX" },
      { title: "Strategy Marketplace", body: "Open ecosystem for trading strategies and bots" },
      { title: "Secure Infrastructure", body: "Enterprise-grade security and risk management" },
    ],
  },
} as const;

/* ------------------------- /ncore/basic --------------------------- */

export const BASIC_PAGE = {
  title: "Basic Understanding",
  subtitle: "Blockchain and On-Chain Trade Execution Fundamentals",
  lead: "Understanding the Foundation",
  leadBody:
    "Master the core concepts of blockchain execution, transaction ordering, and value extraction that form the backbone of Ncore 3.0's advanced trading strategies.",
  sections: [
    {
      heading: "Blockchain and On-Chain Trade Execution",
      paragraphs: [
        "Blockchain is not merely a ledger for recording transactions, but a value execution system that is highly sensitive to execution order.",
        "Asset exchange, state transitions, and final settlement outcomes are not determined by whether a transaction is submitted, but by its relative position within a block.",
        "Within this execution environment, rules are strictly enforced by protocol and outcomes are irreversible.",
        "However, before confirmation, transactions pass through an open, competitive, and highly adversarial ordering process.",
      ],
      img: "/img/ncore-blockchain-execution.jpg",
    },
    {
      heading: "Swap: A Request to Execute Against Shared State",
      paragraphs: [
        "In on-chain systems, a swap is not a simple asset exchange operation, but a request to modify globally shared state.",
        "Unlike traditional financial markets with relatively closed matching systems, on-chain swaps wait to be ordered and executed in a public environment.",
        "During this process, prices, liquidity conditions, and execution outcomes may change.",
        "As a result, submitting a transaction does not guarantee the expected execution outcome.",
      ],
      img: "/img/ncore-swap-state.jpg",
    },
    {
      heading: "Why Execution Order Changes Outcomes",
      paragraphs: [
        "Because blockchain execution is deterministic, the same set of transactions can lead to entirely different state outcomes depending on their order.",
        "When transaction contents are public and execution paths are predictable, transaction ordering itself becomes a resource that can be competed for and exploited.",
        "In swap scenarios, external transactions may be inserted before and after a user's trade, amplifying price impact and systematically transferring value— all within the bounds of protocol rules.",
        "This is neither a bug nor an anomaly, but the result of on-chain execution models interacting with economic incentives.",
      ],
      img: "/img/ncore-execution-order.jpg",
    },
    {
      heading: "Summary",
      paragraphs: [
        "This means that the critical variables of on-chain swaps do not reside solely within contract logic, but also in transaction visibility, ordering mechanisms, and execution path design.",
      ],
      img: "/img/ncore-summary.jpg",
    },
  ],
  takeaways: {
    heading: "Key Takeaways",
    sub: "The essential concepts that define blockchain execution dynamics",
    items: [
      { num: "01", title: "Execution Order Matters", body: "The position of a transaction within a block fundamentally determines its outcome, not just whether it was submitted." },
      { num: "02", title: "Public Environment", body: "On-chain transactions wait in a visible mempool, creating opportunities for strategic positioning and value extraction." },
      { num: "03", title: "Deterministic Results", body: "The same transactions in different orders produce different outcomes—a core principle of MEV strategies." },
    ],
  },
  nextChapter: {
    kicker: "NEXT CHAPTER",
    heading: "Ready to Learn More?",
    body: "Discover how Ncore 3.0 leverages these fundamentals to execute advanced MEV strategies.",
    cta: "Continue to Trading Logic",
  },
} as const;

/* ------------------------- /ncore/trading ------------------------- */

export const TRADING_PAGE = {
  title: "Trading Logic",
  subtitle: "Ncore 3.0 — DEX-Focused MEV Trading Platform",
  origins: {
    heading: "Origins of Ncore 3.0",
    body: "Developed by Nastech Global, Ncore 3.0 is built for the rapidly advancing decentralized exchange (DEX) landscape. With digital assets becoming increasingly significant, conventional trading technologies face growing limitations when dealing with:",
    bullets: [
      "Frequent and rapid fluctuations throughout DeFi markets",
      "Large-volume orders that shift within short periods",
      "Real-time execution environments with increasing complexity",
    ],
    closing: "To address these conditions, Ncore 3.0 was developed with a predictive trading architecture that can recognize potential opportunities ahead of major pending transactions or important market events.",
  },
  sandwich: {
    heading: "MEV and Sandwich Strategy",
    sub: "Front-Run / Back-Run Logic",
    intro: [
      "Before any DEX transaction is confirmed and written into a block, it remains temporarily within the mempool. This transaction process makes MEV (Maximal Extractable Value) possible, allowing additional value to be obtained through strategic optimization of transaction sequencing.",
      "At the center of Ncore 3.0 is the Sandwich Strategy, commonly described as front-run/back-run logic. It converts the mechanics of MEV into a systematic solution that can be applied as a ready-to-use product within DEX markets:",
    ],
    legs: [
      { title: "Front-Run(Pre-Transaction Execution)", bullets: ["Enter a strategic position ahead of the execution of a major pending order", "Utilize the expected price movement that the incoming transaction will create", "Prepare the position required for the following profit opportunity"] },
      { title: "Back-Run(Post-Transaction Execution)", bullets: ["Execute the follow-up action immediately after the targeted order is completed", "Use the resulting price difference to close the full profit cycle", "Pursue maximum systematic gains while keeping risk within controlled parameters"] },
    ],
    closing: "Combining these two execution stages allows Ncore 3.0 to complete the sandwich strategy ahead of the broader market response and secure advanced profit opportunities for users.",
  },
  coreFeatures: {
    heading: "Core Features of Ncore 3.0",
    items: [
      { title: "Mempool Monitoring", bullets: ["Maintain continuous visibility over transactions that have yet to be confirmed", "Detect substantial orders accurately and evaluate their likely effect on prices", "Take positions in advance to benefit from temporary price deviations"] },
      { title: "Real-Time Market Insights", bullets: ["Track live on-chain information generated across DEX markets", "Interpret transaction activity alongside ongoing changes in price direction", "Optimize back-run execution to secure the maximum available profit"] },
      { title: "Gas Optimization", bullets: ["Adjust Gas allocation dynamically to obtain priority during transaction execution", "Keep transaction expenses lower when blockchain networks become congested", "Maintain efficient execution performance while maximizing overall returns"] },
      { title: "Market Trend Forecasting", bullets: ["Use advanced algorithmic analysis to interpret order activity and evolving market behavior", "Recognize developing patterns in short-term volatility and market direction", "Carry out trading decisions before these movements are widely reflected in the market"] },
    ],
  },
  productized: {
    heading: "Productized Value & Customer Benefits",
    intro: "Ncore 3.0 turns technically sophisticated sandwich trading strategies into an accessible, ready-to-deploy product, enabling users to concentrate on generating profits instead of handling the underlying technical complexity.",
    points: [
      { title: "Proactive Trading", body: "Identify and capture DEX price movements earlier through MEV-powered Sandwich Strategy execution" },
      { title: "Systematic Execution", body: "Structured Front-run / Back-run cycles deliver repeatable profits through a controlled execution process" },
      { title: "Low-Cost & Efficient", body: "Optimized Gas allocation provides fast transaction execution while keeping costs economical" },
      { title: "User-Friendly", body: "All complex on-chain processes are handled automatically by the system on behalf of clients" },
    ],
  },
  useCase: {
    heading: "Real-World Use Case",
    intro: "In a high-frequency DEX environment:",
    steps: [
      "A substantial order is submitted and remains pending inside the mempool",
      "Ncore 3.0 enters a front-run position before that transaction is processed",
      "Once the targeted order completes, a back-run transaction closes the profit cycle",
      "The resulting gains are secured before the broader market can fully respond",
    ],
    closing: "Through this approach, customers can achieve predictable, systematic, and controllable profits even within highly volatile DEX market environments.",
  },
  devPath: {
    heading: "Development Path of Ncore 3.0",
    intro: "Ncore 3.0 brings together the experience Nastech Global has accumulated through years of automated trading development:",
    bullets: [
      "The technology began with tailored solutions created for premium clients",
      "As market structures grew more sophisticated, it developed into a predictive and systematic trading architecture",
      "Mempool surveillance, sandwich strategy execution, Gas optimization, and market forecasting were combined within a unified system",
      "The resulting infrastructure delivers high-frequency, low-latency trading capabilities to both individual and institutional users",
    ],
    resultHeading: "The Result",
    resultBody: "Ncore 3.0 extends far beyond the capabilities of a standard trading bot—it delivers a fully productized DEX MEV solution built to help clients preserve their competitive edge as markets continue to evolve rapidly.",
  },
  highlights: {
    heading: "Key Highlights",
    bullets: [
      "Continuous mempool surveillance for early identification of pending transactions",
      "MEV combined with Sandwich Strategy (Front-run / Back-run) to deliver systematic and efficient execution",
      "Predictive analysis designed to anticipate upcoming price movements",
      "Optimized Gas management together with low-latency execution for maximum returns",
      "A fully productized client solution that operates without manual trading intervention",
    ],
  },
  stayingAhead: {
    heading: "Staying Ahead",
    intro: "In a competitive, high-frequency DEX market:",
    items: [
      { title: "Timely Insights", body: "Maintain constant visibility over major pending orders appearing within the mempool" },
      { title: "Optimized Execution", body: "Establish positions through front-run execution and complete the cycle through back-run trades" },
      { title: "Smart Gas Management", body: "Maintain transaction priority while reducing execution costs to the minimum" },
    ],
    closing: [
      "Before the rest of the market has time to respond, clients have already completed the required trades and captured the available value, enabling them to remain consistently ahead.",
      "Ready to experience the complete potential of Ncore 3.0 and move toward the next generation of automated trading? Explore how this innovative technology can help you capture emerging opportunities, maintain an advantage over the market, and execute smarter, more profitable trades today.",
    ],
  },
  footNav: { prev: "Basic Understanding", next: "Continue to Features" },
} as const;

/* ------------------------- /ncore/features ------------------------ */

export const FEATURES_PAGE = {
  title: "Features",
  intro: [
    "Ncore 3.0 brings together a broad set of advanced capabilities designed to give cryptocurrency traders an edge in the rapidly moving digital asset market.",
    "Working as an integrated system, these features are intended to improve trading strategies, reduce risk exposure, and increase profitability while keeping the overall experience simple and accessible. The following are the key features that distinguish Ncore 3.0.",
  ],
  features: [
    { n: 1, title: "Advanced Front-Running Algorithms", future: false, how: "Ncore 3.0 constantly monitors the mempool to detect substantial pending orders before they are processed, giving the system an opportunity to respond ahead of broader market movement. When a significant transaction is approaching execution, Ncore 3.0 strategically places its own trade at the most favorable point before the large order affects market pricing.", why: "Large cryptocurrency transactions can trigger sharp price movements in highly volatile markets. By positioning ahead of these transactions, Ncore 3.0 enables traders to take advantage of price changes before those movements are fully absorbed by the market, increasing the opportunity for higher profits." },
    { n: 2, title: "Real-Time Market Monitoring", future: false, how: "Ncore 3.0 continuously gathers information from multiple sources, including decentralized exchanges and on-chain transaction activity, to follow changing market conditions. The incoming data is analyzed immediately, enabling Ncore 3.0 to respond as market movements occur and adjust its trading approach in line with the latest trends.", why: "Cryptocurrency prices can shift within very short periods, making an up-to-date view of market conditions essential. By reacting rapidly to new developments, Ncore 3.0 helps traders make better-informed decisions and maximize their chances of identifying profitable trades." },
    { n: 3, title: "Dynamic Gas Fee Optimization", future: false, how: "Ncore 3.0 assesses current blockchain congestion and calculates an appropriate Gas fee so its transactions can receive the priority required for timely execution. During periods of heavier network traffic, the system raises the Gas fee slightly to accelerate processing. When activity is lower, it reduces the fee to prevent unnecessary expenditure.", why: "Blockchain Gas costs can fluctuate significantly depending on network demand, and paying more than necessary directly reduces potential profits. Ncore 3.0 dynamically balances Gas expenditure with execution speed, preventing wasted resources while maintaining fast transaction processing." },
    { n: 4, title: "Cross-Platform Compatibility", future: true, how: "Ncore 3.0 is designed to extend beyond a single blockchain or exchange and can be configured for use across multiple ecosystems, including Ethereum, Binance Smart Chain, and other supported platforms. This flexibility enables traders to participate across different environments and respond to varying market conditions.", why: "Access to multiple platforms allows Ncore 3.0 users to spread trading activity across different blockchain networks rather than depending on one ecosystem alone. This diversification can reduce concentration on a single network, strengthen the resilience of trading strategies, and create additional opportunities for profit across different markets." },
    { n: 5, title: "Comprehensive Risk Management", future: false, how: "Ncore 3.0 enables users to establish predefined risk limits, including stop-loss settings that activate automatically once specific conditions are reached, such as a cryptocurrency falling below a selected price level. The system also provides live analytical data so users can monitor performance and evaluate how effectively their strategies are operating.", why: "Because cryptocurrency markets can experience significant volatility, protecting capital against substantial losses is essential. Ncore 3.0's risk-management capabilities help traders control their exposure and protect their investments, supporting a more confident and secure trading experience." },
    { n: 6, title: "User-Friendly Interface", future: false, how: "The interface is structured around a clear, organized dashboard where users can monitor trading activity, configure parameters, and review performance data as it updates. It also provides tools for building and adjusting trading strategies, controlling risk settings, and examining historical trade records.", why: "An intuitive interface makes complex cryptocurrency trading easier to manage for users with different levels of experience. From newcomers to experienced algorithmic traders, Ncore 3.0 provides a straightforward way to track activity and make necessary adjustments when required." },
    { n: 7, title: "Advanced Strategy Customization", future: true, how: "Ncore 3.0 allows users to tailor variables such as execution rules, trading sensitivity, and timing according to their individual trading preferences. Strategies can be fine-tuned to improve performance while ensuring that system behavior remains aligned with each user's objectives.", why: "Trading objectives and risk tolerance vary from one user to another. Ncore 3.0's strategy customization capability allows the system to support different approaches, ranging from more conservative methods centered on protection to more aggressive strategies aimed at achieving higher returns." },
    { n: 8, title: "Backtesting Capabilities", future: true, how: "Users can configure selected strategy parameters within Ncore 3.0 and evaluate them against historical market information to see how those strategies would have performed during previous trading periods. The system then produces reports showing the results that could have been achieved under those historical conditions.", why: "Backtesting allows users to evaluate the potential effectiveness of a strategy without putting actual capital at risk. The results can help traders improve their methods, better understand possible risks, and make more informed choices before applying a strategy to live markets." },
    { n: 9, title: "AI-Driven Predictive Analytics", future: true, how: "Ncore 3.0 will use advanced machine-learning technology to analyze both historical information and live market data. By identifying recurring patterns and emerging trends, the system will be able to anticipate potential future price movements and progressively adapt and optimize its trading strategies.", why: "AI-powered analysis will enable Ncore 3.0 to continuously refine its trading approach by learning from previous transactions and responding to changing market environments. This ongoing adaptation will support smarter trading decisions and more effective risk management." },
    { n: 10, title: "Secure and Transparent Operations", future: false, how: "Ncore 3.0 uses industry-standard encryption methods to protect sensitive information, including user data and transaction records. The system also maintains detailed records of trading activity and performance measurements, allowing users to review and verify its operations whenever needed.", why: "Security and transparency are fundamental requirements within cryptocurrency markets. Users need assurance that both their information and funds remain protected. By combining robust security protocols with clear operational records, Ncore 3.0 allows users to trade confidently while maintaining visibility over transaction activity and performance." },
    { n: 11, title: "24/7 Operational Efficiency", future: false, how: "Ncore 3.0 runs autonomously 24 hours a day, continuously examining blockchain networks and carrying out trades as market conditions develop. Even when users are not personally monitoring the market, the system remains active and prepared to capture opportunities as they appear.", why: "Cryptocurrency markets operate continuously and can move rapidly at any hour. Ncore 3.0's round-the-clock operation ensures that traders do not miss potential opportunities and that transactions can be executed promptly regardless of when market movements occur." },
  ],
  footNav: { prev: "Trading Logic", next: "Continue to Market Trends" },
} as const;

/* ------------------------- /ncore/trends -------------------------- */

export const TRENDS_PAGE = {
  title: "Market Trends",
  subtitle: "Market Trends Influencing Ncore 3.0",
  intro: "The cryptocurrency landscape is evolving rapidly, and Ncore 3.0 is engineered to stay ahead of the curve, capitalizing on key market trends that shape trading opportunities and strategies. Below are more expansive details on how these trends influence the use and capabilities of Ncore 3.0.",
  trends: [
    { n: 1, title: "The Rise of Decentralized Finance (DeFi)", impact: "DeFi platforms offer traders a decentralized and open market, which increases volatility and creates arbitrage opportunities between centralized exchanges (CEX) and decentralized exchanges (DEX). Ncore 3.0 is designed to leverage these discrepancies in real-time, enabling users to trade across both platforms efficiently.", advantage: "By interacting seamlessly with DeFi platforms and protocols, Ncore 3.0 ensures users can take advantage of arbitrage opportunities, optimizing their trades for maximum profitability. Whether it's cross-chain liquidity or price disparities, Ncore 3.0 helps users navigate the complexities of DeFi ecosystems, providing an edge over traditional trading bots that may struggle with decentralized environments." },
    { n: 2, title: "Increasing Institutional Participation", impact: "Institutional traders demand advanced trading solutions capable of handling higher volumes, mitigating risks, and ensuring compliance. As a result, these investors often require trading tools that not only offer speed but also enhance market prediction accuracy and enable comprehensive risk management.", advantage: "Ncore 3.0 provides a sophisticated trading environment that can handle large orders with minimal slippage. With features like real-time risk management, dynamic gas fee optimization, and advanced algorithmic strategies, Ncore 3.0 offers the precision and adaptability required by institutional traders. It provides a trusted platform for navigating the complexities of both centralized and decentralized markets with ease." },
    { n: 3, title: "Advancements in Blockchain Technology", impact: "As blockchain platforms evolve, new protocols and features emerge, leading to improvements in transaction speed, scalability, and cost. Traders need tools that can integrate with these emerging technologies to stay competitive.", advantage: "Ncore 3.0 is designed to adapt to new blockchain protocols and technologies. As Layer 2 solutions become more prevalent, for example, Ncore 3.0 will integrate seamlessly with these platforms to ensure faster transaction processing and lower fees. This flexibility allows users to take full advantage of the most cutting-edge blockchain developments without worrying about compatibility issues." },
    { n: 4, title: "Escalating Transaction Fees and Network Congestion", impact: "High fees and network congestion can make it difficult to execute trades quickly, resulting in missed opportunities or higher transaction costs. This can especially affect smaller traders who may not have the resources to pay premium fees.", advantage: "Ncore 3.0's dynamic gas fee optimization ensures timely trade execution even during periods of high network congestion. By strategically adjusting transaction fees and leveraging predictive analytics, Ncore 3.0 ensures that trades are executed quickly, efficiently, and cost-effectively, maximizing profitability in volatile environments." },
    { n: 5, title: "Regulatory Developments", impact: "The evolving regulatory landscape creates both opportunities and challenges for traders and investors. As regulators move towards clearer frameworks for crypto market participants, staying compliant has become increasingly complex. These regulations can bring uncertainty, especially when they are subject to rapid change, creating risks for non-compliance.", advantage: "In this ever-evolving regulatory environment, Ncore 3.0 provides the tools necessary to stay ahead of changes. It is built with transparency and security at its core, ensuring that users can confidently navigate regulatory shifts. Ncore 3.0's features, including detailed transaction logs and performance reports, allow for full transparency, providing users with a reliable way to demonstrate compliance when required. By adapting to new regulations seamlessly, Ncore 3.0 ensures that users can continue to trade efficiently while remaining compliant." },
    { n: 6, title: "Market Volatility", impact: "Volatility in the crypto space presents both substantial opportunities for profit and increased risks. Traders need tools that can swiftly identify price trends and execute trades at optimal times to maximize profits while managing potential losses.", advantage: "Ncore 3.0's advanced front-running algorithms and real-time market monitoring enable it to identify and capitalize on market fluctuations instantly. By staying ahead of market movements and adjusting strategies in real-time, Ncore 3.0 enhances traders' ability to take advantage of volatile conditions without getting caught in sudden market dips or spikes." },
    { n: 7, title: "The Emergence of Layer 2 Solutions", impact: "Layer 2 solutions are expected to play a major role in reducing transaction costs and improving scalability. For traders, this presents a unique opportunity to execute trades with lower fees and faster processing times.", advantage: "As Layer 2 technologies continue to gain traction, Ncore 3.0 is designed to integrate with these emerging platforms to provide users with faster and cheaper transaction execution. By adopting these technologies early, Ncore 3.0 ensures that its users are well-positioned to take full advantage of the benefits offered by Layer 2 solutions." },
    { n: 8, title: "Integration of Artificial Intelligence (AI) in Trading", impact: "AI-driven trading bots can adapt to market conditions in real-time, refining strategies based on continuous data analysis. This adaptability is crucial in the volatile crypto market, where rapid decision-making can significantly impact profitability.", advantage: "By integrating advanced AI algorithms, Ncore 3.0 enhances market analysis and trade execution. Its ability to process real-time data and adjust strategies dynamically allows users to maintain a competitive edge in fast-paced trading environments." },
    { n: 9, title: "Tokenization of Real-World Assets (RWA)", impact: "Tokenizing assets like real estate, art, or commodities opens new markets and investment opportunities, making it easier to trade fractionalized ownership and increase liquidity.", advantage: "Ncore 3.0's adaptability allows it to engage with various tokenized assets, providing users with diversified trading options and the ability to capitalize on emerging markets within the crypto space." },
    { n: 10, title: "Emergence of New Financial Products and Services", impact: "New financial instruments offer diverse investment opportunities and can influence market dynamics, providing traders with additional avenues for profit.", advantage: "Ncore 3.0's ability to adapt to various financial products ensures that users can leverage these new instruments effectively, incorporating them into their trading strategies to maximize returns." },
    // n:11「Funding, Mergers, and Acquisitions」含 2023 年过时数据,用户 2026-07-17 裁决删除
    { n: 11, title: "Integration of Blockchain Technology in Traditional Finance", impact: "Blockchain technology is embedding more deeply into banking and financial services, enabling faster transactions, increased transparency, and new capabilities.", advantage: "Ncore 3.0's design allows it to integrate seamlessly with various blockchain protocols, ensuring users can leverage the latest advancements in blockchain technology for efficient and secure trading." },
  ],
  conclusion: "Ncore 3.0 is positioned to leverage these dynamic market trends by offering a sophisticated, adaptable, and reliable solution for cryptocurrency traders. By continuously evolving to accommodate emerging technologies and market developments, Ncore 3.0 ensures that users remain competitive in the fast-paced and ever-changing crypto landscape. With its advanced features, predictive capabilities, and market adaptability, Ncore 3.0 is designed to maximize profitability while minimizing risk, even in the most volatile conditions.",
  footNav: { prev: "Features", next: "Ncore X" },
} as const;

/* ------------------------- /careers 子页 --------------------------- */

export const CAREERS_PAGE = {
  title: "Join Our Team at Naslab",
  intro: "At Naslab, we are always on the lookout for passionate, driven individuals who are eager to contribute to the development of innovative, technology-driven solutions that shape industries and transform businesses. We believe in building a strong network of talented professionals and if you're someone who thrives in a dynamic, forward-thinking environment and is excited about the future of technology, we'd love to hear from you.",
  why: {
    heading: "Why Naslab?",
    body: "At Naslab, we are dedicated to driving growth through innovation and strategic marketing. Our team is passionate about leveraging cutting-edge technology to connect brands with their audiences and create meaningful impact. From promoting our flagship products to helping our partners expand their reach, we take pride in our role as a catalyst for sustainable growth and long-term success. Every campaign we run is an opportunity to contribute to the advancement of the digital landscape.",
  },
  lookingFor: {
    heading: "Who We're Looking For",
    body: "We are always interested in connecting with talented professionals in the following roles:",
  },
  ready: {
    heading: "Ready to Join Us?",
    body: "Take the first step towards an exciting career at Naslab. We'd love to hear from you!",
    cta: "Contact Us",
  },
} as const;

/* ---------------------- /collaboration 子页 ------------------------ */

export const COLLAB_PAGE = {
  title: "Collaboration",
  subtitle: "Working Together with Naslab",
  intro: "At Naslab, we believe that long-term value is created through deep collaboration and complementary capabilities. We work with partners who share a commitment to execution quality, system reliability, and long-term thinking.",
  approach: {
    heading: "Our Approach",
    body: "Rather than pursuing transactional or short-term partnerships, we focus on collaborations that contribute to durable systems, meaningful innovation, and sustainable growth.",
  },
  focus: {
    heading: "Our Collaboration Focus",
    groups: [
      { title: "Technology & Product Collaboration", bullets: ["Partnering with engineering teams and infrastructure providers to build high-performance systems", "Collaborating on execution architecture, data intelligence, and system design", "Translating advanced technical capabilities into scalable, production-ready solutions"] },
      { title: "Market & Business Collaboration", bullets: ["Working with platforms and ecosystem partners on joint solutions", "Aligning on go-to-market strategy, compliance, and client delivery", "Building long-term, mutually beneficial business relationships"] },
      { title: "Research & Strategy Collaboration", bullets: ["Engaging in research around market structure, execution mechanics, and system incentives", "Converting research insights into actionable strategies and product capabilities", "Exploring emerging technologies and new market opportunities"] },
    ],
  },
  who: {
    heading: "Who We Collaborate With",
    intro: "We typically collaborate with:",
    bullets: [
      "Technology and infrastructure teams",
      "Trading platforms and liquidity-focused organizations",
      "Research institutions and specialized teams",
      "Ecosystem partners with a long-term, execution-driven perspective",
    ],
    closing: "We value professionalism, clarity of intent, and alignment in values.",
  },
  build: {
    heading: "Let's Build Together",
    body: "If you are looking for a partner focused on execution, technical rigor, and long-term system development, we welcome the opportunity to explore collaboration.",
    cta: "Contact Us",
  },
} as const;

/* ------------------------ /contact(naslabtec 版) ------------------ */

export const CONTACT_PAGE = {
  title: "Contact Us",
  body: "We're here to answer your questions and explore collaboration opportunities. Reach out to us anytime!",
  emailLabel: "Email Us",
  email: "contact@naslabtec.com",
  supportLabel: "Customer Support",
  /** naslabtec 实际表单:姓名拆两栏、无 ORGANIZATION、多必填 Title 下拉(CONFLICT 15,按「内容以 naslabtec 为主」采用) */
  fields: [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "title", label: "Title *", type: "select", options: ["Select a topic", "Careers", "Collaboration", "Product", "Strategy", "Others"] },
    { name: "message", label: "Message", type: "textarea" },
  ],
  submit: "Send Message",
} as const;
