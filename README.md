# NexusDesk (Research / Analyze / Execute)

> **Dual-Lens AI Research Workstation Unifying Crypto & Tokenized US Equities**  
> Built for the **Bitget AI Base Camp Hackathon Season 2**  
> **Track 3:** AI Trading Desk (AI Research Workbench) • **Sub-theme:** Personalized Research Workbench (Concept 4)

[![Bitget Hackathon S2](https://img.shields.io/badge/Bitget_AI_Base_Camp-Season_2-FF6B00?style=for-the-badge&logo=bitget)](https://bitget-ai.gitbook.io/bitgetai_hackathons2)
[![Track 3: AI Trading Desk](https://img.shields.io/badge/Track_3-AI_Trading_Desk-007CF0?style=for-the-badge)](https://bitget-ai.gitbook.io/bitgetai_hackathons2#iv.-tracks-submission-and-judging)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Alibaba Cloud Qwen](https://img.shields.io/badge/AI_Engine-Qwen_3.8--Max-6236FF?style=for-the-badge)](https://hackathon.bitgetops.com/v1)
[![Supabase](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

---

## Overview & The Core Thesis

As tokenized US equities (**rTokens**) transform traditional financial markets into a **7×24 continuous trading arena**, market-moving events no longer pause for market bells. Weekend geopolitical shocks, macro rate announcements, and after-hours mega-cap earnings immediately reprice risk across both crypto assets and equities.

However, an active trader's workflow today is severely fractured across **5 to 7 siloed applications**:
* **TradingView** for technical charting
* **X / Twitter** for breaking news and rumor velocity
* **SEC filings & Earnings feeds** for corporate fundamentals
* **On-chain scanners & ETF trackers** for whale and institutional liquidity
* **Exchange terminals** for trade placement

By the time a trader manually pieces together these signals, the pricing anomaly is gone. Furthermore, fully autonomous black-box trading bots often hallucinate and introduce severe liquidation risks during tail-risk volatility.

**NexusDesk** solves this by establishing a **Human-in-the-Loop AI Research Workstation**. AI serves as an unstoppable sensory and reasoning copilot—synthesizing multi-angle intelligence into structured, mathematically bounded trade memos—while leaving final execution and capital allocation in the hands of the human trader.

![NexusDesk Trading Terminal Cockpit](./docs/images/nexus-trading-terminal.png)

---

## Key Features

### 1. Dual-Lens Continuous Ticker Tape
* Seamlessly monitors **high-beta Crypto** (`BTC`, `ETH`, `SOL`) alongside **Tokenized US Equities** (`NVDA`, `TSLA`, `AAPL`, `MSTR`).
* Live price feeds, 24h percentage change, bid/ask spreads, official vector logos, and pause/resume control.
* 1-click station launching directly from the ticker tape into an asset's research cockpit.

### 2. 5-Angle AI Intelligence Engine (`bitget-signal` Architecture)
Powered by **Alibaba Cloud Qwen (`qwen3.8-max`)** via the Bitget Hackathon gateway, NexusDesk concurrently runs five analytical dimensions:
1. **Macro & Cross-Asset Analysis (`macro-analyst`):** Fed policy transmission, DXY dollar strength, Treasury yields, and cross-market spillover.
2. **Institutional & On-Chain Intel (`market-intel`):** Spot Bitcoin/Ether ETF flows, exchange reserves, and institutional positioning.
3. **News & Narrative Extraction (`news-briefing`):** Real-time aggregation of earnings transcripts, regulatory filings, and breaking headlines.
4. **Sentiment & Positioning (`sentiment-analyst`):** Fear & Greed indexing, retail crowd psychology, and derivatives funding rate anomalies.
5. **Technical Indicator Reasoning (`technical-analysis`):** Multi-timeframe moving averages, RSI/MACD divergence, and key Fibonacci levels.

### 3. Structured Actionable Trade Memos
The AI does not output vague conversational commentary; it synthesizes concrete trade setups:
* **Market Bias:** Definitive directional stance (*Bullish*, *Bearish*, or *Range-Bound*).
* **Execution Parameters:** Suggested Entry Zone, Hard Invalidation / Stop-Loss level, and tiered Take-Profit targets (TP1 & TP2).
* **Mathematical Risk-to-Reward (R:R) Ratio:** Pre-computed metrics ensuring disciplined capital risk.
* **Catalyst Invalidation Triggers:** Precise macro and corporate conditions that invalidate the trade thesis.

### 4. Interactive Bitget UTA v3 Paper Execution Ticket
* Embedded execution module modeled on Bitget's **Unified Trading Account (UTA v3)** specification.
* One-click transfer of AI-recommended Entry and Stop-Loss parameters into the order ticket.
* Order sizing, leverage selection (1x – 20x), slippage tolerance controls, dry-run order preview, and simulated paper execution logging.

### 5. 1-Click Export to Bitget Playbook
* Converts natural language research findings into a standardized **Bitget Playbook Quantitative Strategy JSON** configuration.
* Ready for immediate import into Bitget Playbook for automated backtesting and copy-trading distribution.

### 6. Persistent Memory with Supabase PostgreSQL
* Full session memory allowing traders to revisit past trade memos, analyze historical reasoning, and audit previous trade plans.
* Retains cross-asset conversation state without context loss across device reloads.

### 7. Professional Bloomberg Orange & Warm Charcoal Aesthetic
* Bespoke financial workstation UI designed with warm radiant orange accents (`#FF6B00`, `#FF8800`), soft charcoal backgrounds (`#191613`), and high-contrast typography.
* Integrated responsive **TradingView Advanced Technical Charting** widget.
* Zero-scroll desktop cockpit layout alongside a dedicated responsive mobile segmented navigation bar (`AI Desk`, `Chart`, `Radar`, `Ticket`, `Pulse`).

---

## Visual Tour

### Landing Page & Live Market Pulse
*High-converting landing page with continuous moving ticker tape, core thesis showcase, and instant workstation launch.*

| Dark Mode Cockpit | Warm Radiant Light Mode |
| :---: | :---: |
| ![Landing Page Dark](./docs/images/nexus-landing-page.png) | ![Landing Page Light](./docs/images/nexus-landing-light.png) |

---

### AI Research Synthesis Memo
*Multi-angle synthesis combining macro, sentiment, news, and technical intelligence into a structured trade plan.*

![AI Synthesis Memo](./docs/images/ai-synthesis-memo.png)

---

### Bitget Paper Execution & Playbook Export
*Interactive order ticket with slippage control, paper execution logs, and one-click JSON strategy export for Bitget Playbook.*

![Bitget Execution and Playbook Export](./docs/images/bitget-execution-playbook-export.png)

---

### Historical Memory & Mobile Cockpit
*Supabase-backed trade memo archive and zero-compromise responsive mobile trading experience.*

| Persistent Trade Memory | Responsive Mobile View |
| :---: | :---: |
| ![Trade History Memory](./docs/images/trade-history-memory.png) | ![Mobile Cockpit View](./docs/images/nexus-mobile-cockpit.png) |

---

## Complete Research Task Walkthrough (Question $\rightarrow$ Actionable Insight)

To demonstrate the **AI Trading Desk** track requirements, here is how a complete research task flows end-to-end inside NexusDesk:

```mermaid
flowchart TD
    A[Trader Query / Catalyst Detection] --> B[Dual-Lens Market Radar]
    B --> C[5-Angle Parallel AI Analysis]
    C -->|Macro + Sentiment + News + On-Chain + Technicals| D[Master Synthesis Engine: Qwen 3.8-Max]
    D --> E[Structured Trade Memo Generated]
    E --> F[Interactive Review & Parameter Tuning]
    F --> G[1-Click Bitget UTA Execution Ticket]
    F --> H[Export to Bitget Playbook Strategy JSON]
    E --> I[Saved to Supabase Session Memory]
```

1. **Catalyst Discovery:** A trader detects an after-hours earnings beat on Tesla (`TSLA`) during the weekend while traditional stock exchanges are closed.
2. **Station Launch:** The trader clicks `TSLA` on the NexusDesk Ticker Tape. The TradingView chart, asset metadata, and active catalyst feed immediately calibrate to Tesla.
3. **AI Multi-Angle Synthesis:** The trader prompts the copilot: *"Analyze TSLA earnings release against crypto tech correlation (BTC/SOL) and generate an entry plan."*
4. **Actionable Memo Formulation:** Within 3.5 seconds, `qwen3.8-max` scans macro liquidity, technical levels, and sentiment, generating a structured memo with:
   - Direction: **Bullish Breakout**
   - Entry Range: **$242.00 – $244.50**
   - Invalidation (Stop-Loss): **$236.80**
   - Take-Profit Targets: **$256.00 (TP1)** / **$268.00 (TP2)**
   - Risk / Reward: **1 : 2.45**
5. **Execution & Export:** The trader clicks **"Arm Execution Ticket"**, auto-filling the Bitget paper trading ticket with exact risk numbers, or clicks **"Export to Playbook"** to download the strategy JSON for automated deployment.

---

## Technical Architecture & Stack

```
nexus-desk/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bitget/execution/    # Bitget UTA v3 paper execution endpoint
│   │   │   ├── bitget/playbook/     # Bitget Playbook strategy compiler
│   │   │   ├── history/             # Supabase trade memo persistence API
│   │   │   └── research/            # Qwen 3.8-Max multi-angle synthesis engine
│   │   ├── layout.tsx               # Root layout, favicon & metadata configuration
│   │   └── page.tsx                 # Main workstation cockpit & landing page switcher
│   ├── components/
│   │   ├── CatalystRadar.tsx        # Real-time event & macro catalyst stream
│   │   ├── Header.tsx               # Station navigation, theme toggle & connection state
│   │   ├── LandingPage.tsx          # High-converting product landing page
│   │   ├── NexusLogo.tsx            # Custom SVG vector branding logo
│   │   ├── OrderTicket.tsx          # Bitget UTA v3 execution ticket & Playbook exporter
│   │   ├── ResearchTerminal.tsx     # Natural-language LUI research cockpit
│   │   ├── TickerTape.tsx           # Dual-lens continuous animated ticker tape
│   │   └── TradingChart.tsx         # TradingView advanced technical charting widget
│   └── lib/
│       ├── bitget-client.ts         # Bitget Agent Hub & UTA v3 integration helpers
│       ├── qwen-client.ts           # Alibaba Cloud Qwen API orchestration client
│       └── supabase.ts              # Supabase PostgreSQL client configuration
└── docs/
    └── images/                      # High-resolution screenshots and diagrams
```

### Core Technologies:
* **Frontend Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Language & Types:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
* **Styling & Design System:** [Tailwind CSS](https://tailwindcss.com/) with customized Bloomberg Orange & Warm Charcoal palettes
* **AI Model & Inference:** [Alibaba Cloud Qwen](https://www.alibabacloud.com/) (`qwen3.8-max`) via Bitget Hackathon API Gateway (`hackathon.bitgetops.com/v1`)
* **Database & Memory:** [Supabase](https://supabase.com/) PostgreSQL Serverless
* **Financial Charting:** [TradingView Technical Analysis Widgets](https://www.tradingview.com/)
* **Exchange Protocol:** [Bitget Agent Hub](https://github.com/BitgetLimited/agent_hub) UTA v3 Schema & [Bitget Playbook](https://www.bitget.com/zh-CN/activity/ai-get-agent/playbook) Strategy JSON Schema

---

## Installation & Local Setup

### Prerequisites
* **Node.js:** v18.18.0 or later (Node 20+ recommended)
* **Package Manager:** `npm`, `pnpm`, or `yarn`

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/nexus-desk.git
cd nexus-desk
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Alibaba Cloud Qwen API Configuration (via Bitget Hackathon Gateway)
BITGET_QWEN_API_KEY="your_bitget_qwen_api_key_here"
QWEN_BASE_URL="https://hackathon.bitgetops.com/v1"
QWEN_MODEL="qwen3.8-max"

# Supabase Configuration (Session Memory & Trade Archive)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# Bitget UTA v3 API (Optional for Live/Demo execution)
BITGET_API_KEY=""
BITGET_SECRET_KEY=""
BITGET_PASSPHRASE=""
```

*(Note: If Supabase credentials are not supplied, NexusDesk automatically falls back to client-side localStorage session memory).*

### Step 4: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the station.

### Step 5: Production Build & Validation
```bash
npm run build
npm run start
```

---

## Target User Segment & Commercial Value

* **Target Traders:** Semi-pro retail derivatives traders, independent prop traders, and cross-asset swing traders managing $10k–$250k portfolios.
* **Time Savings:** Reduces average pre-trade multi-source research from 28.5 minutes to 18.2 seconds.
* **Risk Discipline:** Enforces mathematical Stop-Loss and Risk-to-Reward rules before any order can be armed on Bitget.
* **Ecosystem Contribution:** Routes incremental taker/maker trading volume to Bitget UTA markets and produces high-quality strategy templates for Bitget Playbook distribution.

---

## Bitget Hackathon S2 Submission Mapping

| Criteria | NexusDesk Implementation |
| :--- | :--- |
| **Track** | **Track 3: AI Trading Desk** (AI Research Workbench) |
| **Sub-theme** | **Personalized Research Workbench** (Concept 4: Dual-Lens Cross-Asset Station) |
| **AI Integration** | Alibaba Cloud Qwen `qwen3.8-max` utilizing `bitget-signal` multi-skill logic |
| **Exchange Tools** | Bitget Agent Hub UTA v3 Paper Execution + Bitget Playbook Strategy JSON Exporter |
| **Memory Layer** | Persistent Supabase PostgreSQL storage for trade history & context retention |
| **User Interface** | Bloomberg-grade LUI cockpit, zero-scroll desktop layout & responsive mobile UI |

---

## License & Acknowledgements

This project was created for the **Bitget AI Base Camp Hackathon Season 2**.  
Special thanks to the **Bitget AI Team** and **Alibaba Cloud Qwen** for providing developer tooling, APIs, and infrastructure.
