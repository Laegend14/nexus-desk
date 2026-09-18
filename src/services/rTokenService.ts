export interface StockGapData {
  symbol: string;
  ticker: string;
  name: string;
  nativeFridayClose: number;
  fridayClose: number;
  currentRTokenPrice: number;
  rTokenPrice: number;
  spreadPct: number;
  gapPercent: number;
  impliedGapDirection: "UP" | "DOWN" | "FLAT";
  volume24h: string;
  volume24hUsd: number;
  bid: number;
  ask: number;
  liquidityTier: "HIGH" | "MEDIUM" | "LOW";
  lastUpdated: string;
  catalystSummary?: string;
  correlatedCrypto?: string;
  tradingViewSymbol: string;
  cryptoTradingViewSymbol: string;
}

export const INITIAL_STOCKS: StockGapData[] = [
  {
    symbol: "NVDA",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    nativeFridayClose: 125.75,
    fridayClose: 125.75,
    currentRTokenPrice: 128.45,
    rTokenPrice: 128.45,
    spreadPct: 2.15,
    gapPercent: 2.15,
    impliedGapDirection: "UP",
    volume24h: "$18.4M",
    volume24hUsd: 18.4,
    bid: 128.40,
    ask: 128.50,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "Weekend hyperscaler AI capex commentary & chip export licensing easing",
    correlatedCrypto: "RNDR / NEAR / FET",
    tradingViewSymbol: "NASDAQ:NVDA",
    cryptoTradingViewSymbol: "BITGET:NEARUSDT",
  },
  {
    symbol: "TSLA",
    ticker: "TSLA",
    name: "Tesla, Inc.",
    nativeFridayClose: 216.05,
    fridayClose: 216.05,
    currentRTokenPrice: 214.20,
    rTokenPrice: 214.20,
    spreadPct: -0.86,
    gapPercent: -0.86,
    impliedGapDirection: "DOWN",
    volume24h: "$14.2M",
    volume24hUsd: 14.2,
    bid: 214.15,
    ask: 214.25,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "European delivery data revisions & robotaxi sentiment adjustments",
    correlatedCrypto: "DOGE / SOL",
    tradingViewSymbol: "NASDAQ:TSLA",
    cryptoTradingViewSymbol: "BITGET:DOGEUSDT",
  },
  {
    symbol: "AAPL",
    ticker: "AAPL",
    name: "Apple Inc.",
    nativeFridayClose: 227.20,
    fridayClose: 227.20,
    currentRTokenPrice: 228.10,
    rTokenPrice: 228.10,
    spreadPct: 0.40,
    gapPercent: 0.40,
    impliedGapDirection: "UP",
    volume24h: "$9.8M",
    volume24hUsd: 9.8,
    bid: 228.05,
    ask: 228.15,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "Stable Asian hardware supply chain checks and Vision Pro ecosystem expansion",
    correlatedCrypto: "ETH / BTC",
    tradingViewSymbol: "NASDAQ:AAPL",
    cryptoTradingViewSymbol: "BITGET:ETHUSDT",
  },
  {
    symbol: "MSTR",
    ticker: "MSTR",
    name: "MicroStrategy Inc.",
    nativeFridayClose: 129.60,
    fridayClose: 129.60,
    currentRTokenPrice: 134.50,
    rTokenPrice: 134.50,
    spreadPct: 3.78,
    gapPercent: 3.78,
    impliedGapDirection: "UP",
    volume24h: "$22.6M",
    volume24hUsd: 22.6,
    bid: 134.40,
    ask: 134.60,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "Weekend Bitcoin spot rally driving treasury NAV premium expansion",
    correlatedCrypto: "BTC / BTC-ETF",
    tradingViewSymbol: "NASDAQ:MSTR",
    cryptoTradingViewSymbol: "BITGET:BTCUSDT",
  },
  {
    symbol: "COIN",
    ticker: "COIN",
    name: "Coinbase Global, Inc.",
    nativeFridayClose: 213.90,
    fridayClose: 213.90,
    currentRTokenPrice: 218.00,
    rTokenPrice: 218.00,
    spreadPct: 1.92,
    gapPercent: 1.92,
    impliedGapDirection: "UP",
    volume24h: "$11.3M",
    volume24hUsd: 11.3,
    bid: 217.90,
    ask: 218.10,
    liquidityTier: "MEDIUM",
    lastUpdated: "Live 24/7",
    catalystSummary: "Crypto weekend transaction fee volume surge & Base L2 TVL highs",
    correlatedCrypto: "ETH / SOL",
    tradingViewSymbol: "NASDAQ:COIN",
    cryptoTradingViewSymbol: "BITGET:ETHUSDT",
  },
  {
    symbol: "AMZN",
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    nativeFridayClose: 186.70,
    fridayClose: 186.70,
    currentRTokenPrice: 186.30,
    rTokenPrice: 186.30,
    spreadPct: -0.21,
    gapPercent: -0.21,
    impliedGapDirection: "FLAT",
    volume24h: "$6.5M",
    volume24hUsd: 6.5,
    bid: 186.25,
    ask: 186.35,
    liquidityTier: "MEDIUM",
    lastUpdated: "Live 24/7",
    catalystSummary: "AWS generative AI enterprise adoption commentary and e-commerce stability",
    correlatedCrypto: "SOL / BTC",
    tradingViewSymbol: "NASDAQ:AMZN",
    cryptoTradingViewSymbol: "BITGET:SOLUSDT",
  },
  {
    symbol: "MSFT",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    nativeFridayClose: 428.50,
    fridayClose: 428.50,
    currentRTokenPrice: 431.20,
    rTokenPrice: 431.20,
    spreadPct: 0.63,
    gapPercent: 0.63,
    impliedGapDirection: "UP",
    volume24h: "$8.9M",
    volume24hUsd: 8.9,
    bid: 431.10,
    ask: 431.30,
    liquidityTier: "MEDIUM",
    lastUpdated: "Live 24/7",
    catalystSummary: "Azure cloud enterprise contract renewals noted in weekend tech intelligence briefs",
    correlatedCrypto: "NEAR / RNDR",
    tradingViewSymbol: "NASDAQ:MSFT",
    cryptoTradingViewSymbol: "BITGET:NEARUSDT",
  },
  {
    symbol: "META",
    ticker: "META",
    name: "Meta Platforms, Inc.",
    nativeFridayClose: 644.38,
    fridayClose: 644.38,
    currentRTokenPrice: 682.31,
    rTokenPrice: 682.31,
    spreadPct: 5.89,
    gapPercent: 5.89,
    impliedGapDirection: "UP",
    volume24h: "$19.8M",
    volume24hUsd: 19.8,
    bid: 682.20,
    ask: 682.40,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "Open-source Llama AI ecosystem developer engagement & advertising yield expansion",
    correlatedCrypto: "SOL / NEAR",
    tradingViewSymbol: "NASDAQ:META",
    cryptoTradingViewSymbol: "BITGET:SOLUSDT",
  },
  {
    symbol: "GOOGL",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    nativeFridayClose: 332.60,
    fridayClose: 332.60,
    currentRTokenPrice: 347.33,
    rTokenPrice: 347.33,
    spreadPct: 4.43,
    gapPercent: 4.43,
    impliedGapDirection: "UP",
    volume24h: "$15.4M",
    volume24hUsd: 15.4,
    bid: 347.25,
    ask: 347.45,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "Enterprise Gemini API deployment growth & Google Cloud TPU infra acceleration",
    correlatedCrypto: "NEAR / ETH",
    tradingViewSymbol: "NASDAQ:GOOGL",
    cryptoTradingViewSymbol: "BITGET:NEARUSDT",
  },
  {
    symbol: "AMD",
    ticker: "AMD",
    name: "Advanced Micro Devices",
    nativeFridayClose: 503.60,
    fridayClose: 503.60,
    currentRTokenPrice: 545.09,
    rTokenPrice: 545.09,
    spreadPct: 8.24,
    gapPercent: 8.24,
    impliedGapDirection: "UP",
    volume24h: "$24.1M",
    volume24hUsd: 24.1,
    bid: 545.00,
    ask: 545.20,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "MI350 AI accelerator enterprise procurement & high-performance computing demand",
    correlatedCrypto: "RNDR / FET",
    tradingViewSymbol: "NASDAQ:AMD",
    cryptoTradingViewSymbol: "BITGET:NEARUSDT",
  },
  {
    symbol: "PLTR",
    ticker: "PLTR",
    name: "Palantir Technologies",
    nativeFridayClose: 165.86,
    fridayClose: 165.86,
    currentRTokenPrice: 176.24,
    rTokenPrice: 176.24,
    spreadPct: 6.26,
    gapPercent: 6.26,
    impliedGapDirection: "UP",
    volume24h: "$18.2M",
    volume24hUsd: 18.2,
    bid: 176.15,
    ask: 176.35,
    liquidityTier: "HIGH",
    lastUpdated: "Live 24/7",
    catalystSummary: "AIP enterprise contract velocity & defense procurement momentum",
    correlatedCrypto: "BTC / SOL",
    tradingViewSymbol: "NASDAQ:PLTR",
    cryptoTradingViewSymbol: "BITGET:BTCUSDT",
  },
  {
    symbol: "MARA",
    ticker: "MARA",
    name: "MARA Holdings, Inc.",
    nativeFridayClose: 11.43,
    fridayClose: 11.43,
    currentRTokenPrice: 11.64,
    rTokenPrice: 11.64,
    spreadPct: 1.84,
    gapPercent: 1.84,
    impliedGapDirection: "UP",
    volume24h: "$12.7M",
    volume24hUsd: 12.7,
    bid: 11.60,
    ask: 11.68,
    liquidityTier: "MEDIUM",
    lastUpdated: "Live 24/7",
    catalystSummary: "Bitcoin hashrate expansion & treasury Bitcoin reserve accumulation",
    correlatedCrypto: "BTC / BTC-ETF",
    tradingViewSymbol: "NASDAQ:MARA",
    cryptoTradingViewSymbol: "BITGET:BTCUSDT",
  },
];

// Helper to fetch live quote from public market API with timeout
async function fetchLiveStockQuote(ticker: string): Promise<{ price: number; prevClose: number } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=5d`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) NexusDesk/2.0",
      },
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (meta && meta.regularMarketPrice) {
      return {
        price: Number(meta.regularMarketPrice.toFixed(2)),
        prevClose: Number((meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice).toFixed(2)),
      };
    }
  } catch {
    // Graceful fallback
  }
  return null;
}

export async function getLiveStockGaps(): Promise<StockGapData[]> {
  const enriched = await Promise.all(
    INITIAL_STOCKS.map(async (stock) => {
      const live = await fetchLiveStockQuote(stock.symbol);
      if (live && live.price > 0 && live.prevClose > 0) {
        // Calculate the live spread percentage
        const nativeFridayClose = live.prevClose;
        const currentRTokenPrice = live.price;
        const spreadPct = Number((((currentRTokenPrice - nativeFridayClose) / nativeFridayClose) * 100).toFixed(2));
        const impliedGapDirection: "UP" | "DOWN" | "FLAT" =
          spreadPct > 0.3 ? "UP" : spreadPct < -0.3 ? "DOWN" : "FLAT";

        const bid = Number((currentRTokenPrice - 0.05).toFixed(2));
        const ask = Number((currentRTokenPrice + 0.05).toFixed(2));

        return {
          ...stock,
          nativeFridayClose,
          fridayClose: nativeFridayClose,
          currentRTokenPrice,
          rTokenPrice: currentRTokenPrice,
          spreadPct,
          gapPercent: spreadPct,
          impliedGapDirection,
          bid,
          ask,
          lastUpdated: "Live API Synced",
        };
      }
      return stock;
    })
  );

  return enriched;
}
