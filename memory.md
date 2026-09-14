# 🧠 NEXUSDESK — PROJECT MEMORY & MASTER BLUEPRINT

> **Last Updated:** September 14, 2026  
> **Status:** Fully Functional Full-Stack Cockpit (Verified Live with Qwen 3.8-Max & Bitget UTA v3)  
> **Repository Root:** `C:\Users\MueAb\.gemini\antigravity-ide\scratch\nexus-desk`

---

## 1. Project Overview & Hackathon Metadata

* **Hackathon:** Bitget AI Base Camp Hackathon Season 2 (Global, Online)
* **Total Prize Pool:** 50,000 USDT
* **Submission Deadline:** **September 21, 2026 (UTC+8)**
* **Judging Period:** September 22 – September 28, 2026
* **Winner Announcement:** October 8, 2026
* **Team:** Student team of 2 persons
* **University:** **Federal University of Technology Minna** (FUT Minna) — Eligible for **10 winners × 500 USDT University Special Prize**
* **Market Scope:** **STOCKS ONLY** — Dedicated exclusively to US Equities, Tokenized US Stocks (rTokens), and Bitget US Stock Contract Pairs (e.g. NVDA, TSLA, AAPL, MSFT, AMZN, COIN, MSTR).
* **Key Eligibility Advantages:**
  * **Main Track Theme Prize:** 500 USDT (1 per sub-theme) / Open Theme (500 USDT) / Grand Prize (3,000 USDT)
  * **University Special Prize:** **10 winners × 500 USDT** (Federal University of Technology Minna)
  * **Fan Favorite Prize:** 300 USDT (Public vote on X, stackable with all prizes)
  * **Best Spread Award:** 300 USDT (X engagement)
  * **Free Compute:** 30 USDT Qwen credits + 30 USDT K3 subsidy (up to 60 USDT total)

---

## 2. Track & Positioning

## 2. Track & Positioning

* **Chosen Track:** **🟧 Track 3 · AI Trading Desk (AI Research Workbench)**
* **Selected Concept:** **Concept 4: "NexusDesk" — Dual-Lens (Crypto $\leftrightarrow$ US Equities) Cross-Asset Research Station**
* **Sub-Theme:** **Personalized Research Workstation**
* **Pitch / Thesis:** Traders today trade both crypto and US equities, but their workflows are fractured across 5 different apps (TradingView, Twitter/X, Bloomberg/news terminals, on-chain scanners). NexusDesk unifies them into a single high-performance dual-lens cockpit.
* **Core Capabilities:**
  1. *Integrated Natural Language Interface:* Chat with research station: *"Show me NVDA tokenized volume vs native stock and correlate with AI meme-coins."*
  2. *Pre-built Bitget Research Skills:* Plugs into `bitget-signal` open skills (`macro-analyst`, `market-intel`, `news-briefing`, `sentiment-analyst`, `technical-analysis`).
  3. *Dynamic Dashboard Grid:* AI dynamically renders modular cards: Live TradingView charts, ETF net flow trackers, Fear & Greed indices, and one-click export to Bitget Playbook.
  4. *Official Stock Logos & Live Prices:* Vector SVG corporate marks (NVDA, TSLA, AAPL, MSTR, COIN, AMZN, MSFT) and real-time live market API price feeds.

---

## 3. Core Product Thesis & Thematic Hook

> **The Hackathon Thesis:**  
> *"When tokenized US stocks make 7×24 the new normal, workflows shouldn't be fractured across 5 apps. Dual-Lens cross-asset intelligence bridges Wall Street cash closes with 24/7 digital asset liquidity."*

### The Problem
Traders today actively trade both crypto and US equities, but their workflow is fragmented across TradingView, Twitter/X, Bloomberg terminals, ETF flow dashboards, and on-chain scanners. Over weekends, a 64-hour information blind spot exists where traditional stock exchanges close while tokenized equities and crypto trade 24/7.

### The NexusDesk Solution
**NexusDesk** is an institutional-grade, natural-language cross-asset research station that:
1. **Official Stock Logos & Live Prices:** Displays authentic SVG vector corporate logos and live API quotes for US Equities (NVDA, TSLA, AAPL, MSTR, COIN, AMZN, MSFT) and cross-assets.
2. **Dual-Lens TradingView Widget:** Real-time interactive charting with 1-click toggling between US Equity Lens and Correlated Crypto Lens.
3. **Institutional ETF Net Flow Tracker:** Cross-asset tracking of Spot Crypto ETFs (IBIT, FBTC, ETHA) and Tech Equity ETFs (QQQ, SPY, SMH).
4. **Dual Cross-Asset Sentiment Matrix:** Dual Fear & Greed index gauges for Crypto vs US Equities with divergence diagnostics.
5. **5 Bitget Open Research Skills:** Multi-agent synthesis via Qwen 3.8-Max (`macro-analyst`, `market-intel`, `news-briefing`, `sentiment-analyst`, `technical-analysis`).
6. **One-Click Export to Bitget Playbook:** Generates validated quantitative playbooks and executes paper orders on Bitget Demo UTA v3.

---

## 4. Verified Full-Stack Architecture

```
                        [ Trader Query via LUI / Suggestions ]
                                          │
                                          ▼
                         [ Next.js 16 App Router Cockpit ]
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     [ Qwen 3.8-Max LLM Engine ]                    [ Perception & Data Services ]
  (Official Hackathon Sponsor API)                  ├── 24/7 rToken Gap Calculation Engine
                  │                                 ├── Bitget UTA v3 Demo Trading Client
                  ▼                                 └── Supabase Persistence Layer
     [ Multi-Step Synthesis & Reasoning ]
                  │
                  ├── 1. Catalyst Alert Summary Card
                  ├── 2. 4-step Macro Transmission Chain (Event -> Factor -> Sector -> Target)
                  ├── 3. Qwen Chain-of-Thought Reasoning Box
                  ├── 4. Implied Monday Gap Forecast & Risk/Reward Ribbon
                  ├── 5. Interactive Bitget UTA v3 Demo Execution
                  └── 6. Bitget Playbook Strategy Export JSON
```

### Credentials & Keys
* **Qwen 3.8-Max API Key:** `WJseAHj2jBD4SFAs` (Configured in `.env`, verified 200 OK)
* **Qwen Base URL:** `https://hackathon.bitgetops.com/v1`
* **Bitget Demo API Key:** `bg_680bc38bdfe4ba452ae68400c1243ff9` (Configured in `.env`)
* **Bitget Demo Secret:** `df1cb0a4d9572aa92962363dce2f08b69c77499938e9193e30b98892b8ce4dae`
* **Bitget Demo Passphrase:** `VALENTINfeb14`
* **Supabase Project:** `https://iqrpwwmhwyrszwcqvsgv.supabase.co` (`@supabase/supabase-js`, `@supabase/ssr` installed & verified)
* **Figma Desktop MCP:** `https://mcp.figma.com/mcp` (Configured in `mcp_config.json`)

### Verified Working Routes
* `GET /api/rtoken/gaps` $\rightarrow$ Returns 24/7 tokenized US equities vs Friday close, spread percentages, and 24h volumes.
* `POST /api/research` $\rightarrow$ Calls Qwen 3.8-Max with financial system prompts, returning catalyst summary, 4-step transmission chain, chain-of-thought, and playbook specs.
* `POST /api/trade` $\rightarrow$ Executes live paper/demo orders with order ID confirmation.

---

## 5. UI & Design System (Stitch MCP + Radiant Orange Dual Modes)
* **Stitch Design System ID:** `projects/7840027666644505658` (`NexusDesk Radiant Orange`)
* **Primary Color:** Vivid Bloomberg Orange (`#FF6B00` / `#EA580C`)
* **Dual Light & Dark Modes:**
  - **Light Mode:** Bright, warm editorial paper canvas (`#FDFBF7`), pure white cards (`#FFFFFF`) with warm orange hairline borders (`border-orange-200/90`), deep charcoal typography, and vibrant orange chart trajectories.
  - **Dark Mode:** Warm dark obsidian (`#0C0A09`), stone cards (`#141210`), and luminous electric orange highlights (`#FF6B00`).
* **MCP-UI Protocol Architecture:** In alignment with `MCP-UI-Org/mcp-ui`, tool outputs render as dynamic interactive UI resources:
  - `StockGapChart.tsx`: Interactive SVG chart comparing Friday native close against 24/7 on-chain trajectory.
  - `MacroTransmissionTree.tsx`: Clickable 4-stage interactive tree with expandable sub-canvas inspector.
  - `InstitutionalTradeTicket.tsx`: Bloomberg-style ticket with real notional calculations, slippage limit guards, and Bitget UTA execution.
* **Editorial Landing Page (`LandingPage.tsx`):** Complete overview explaining the 64-hour weekend equity blind spot with the 24/7 Stock Matrix and seamless 1-click terminal launcher.
* **Bespoke Stock Visual Assets:**
  - `hero_trading_floor.jpg` (Institutional trading floor hero visual)
  - `stock_nvda.jpg` (NVIDIA AI silicon accelerator asset)
  - `stock_tsla.jpg` (Tesla autonomous robotics asset)
  - `stock_mstr.jpg` (MicroStrategy digital treasury asset)
  - `stock_aapl.jpg` (Apple Silicon unibody asset)

---

## 6. Submission Deliverables Checklist (Due Sept 21)

- [x] **Working Web Cockpit & Landing Page:** Running live on `http://localhost:3000` (Next.js 16 + Webpack).
- [x] **MCP-UI Architecture Verified in Browser:**
  - Landing page with stock hero visual and 24/7 Stock Matrix verified.
  - Interactive Stock Gap Chart verified.
  - Clickable Macro Transmission Tree with Sub-Canvas Inspector verified.
  - Bitget UTA Demo Order execution and Playbook JSON download verified.
- [ ] **Recorded Video Walkthrough (2-3 min):** Demonstrating the landing page, terminal switcher, Qwen synthesis, and trade routing.
- [ ] **Public GitHub Repository:** Push `nexus-desk` with documentation and screenshots.
- [ ] **Google Form Submission:**
  - Track 3: AI Trading Desk
  - University: Federal University of Technology Minna
  - Apply for Demo Day: YES
  - Apply for K3 Subsidy: YES
- [ ] **Promotional Post on X:** Tagging `#BitgetHackathon @Bitget_AI`.
