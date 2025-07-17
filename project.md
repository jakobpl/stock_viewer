//currrent timestamp by running Date.now() = 1752758295076
Market Glance Web InterfaceGoalBuild a simple web page showing current prices and daily changes for stocks/ETFs grouped by categories. Update on load and with a refresh button.Data SourceUse Finnhub API for quotes. Sign up for free key at https://finnhub.io/. Endpoint: https://finnhub.io/docs/api/quote. Fetch for each ticker (free tier: 60 calls/min).Categories and Tickers ```{
  "Broad Market ETFs": [
    "SPY",
    "QQQ",
    "DIA"
  ],
  "Tech": [
    "AAPL",
    "AMZN",
    "GOOGL",
    "META",
    "TSLA",
    "NVDA",
    "MSFT"
  ],
  "CPU/Semiconductors": [
    "AMD",
    "INTC",
    "AVGO",
    "MU",
    "NVDA"
  ],
  "Financials": [
    "JPM",
    "BRK.B",
    "BAC",
    "ZION"
  ],
  "Healthcare": [
    "LLY",
    "UNH",
    "JNJ",
    "URGN"
  ],
  "Consumer Discretionary": [
    "HD",
    "WMT"
  ],
  "Consumer Staples": [
    "PG",
    "KO"
  ],
  "Energy/Oil": [
    "XOM",
    "CVX",
    "NEE"
  ],
  "Industrials": [
    "GE"
  ],
  "Utilities": [
    "DUK"
  ],
  "Materials": [
    "FCX"
  ],
  "Precious Metals": [
    "GLD",
    "SLV",
    "NEM"
  ],
  "Crypto-Related": [
    "MSTR",
    "COIN",
    "BITO"
  ],
  "Military Industrial Complex": [
    "LMT",
    "RTX",
    "NOC",
    "AXON",
    "BA"
  ],
  "Coffee/Agriculture": [
    "SBUX",
    "JO",
    "DBA",
    "KHC"
  ],
  "Real Estate": [
    "VNQ",
    "O"
  ],
  "Communication Services": [
    "VZ",
    "NFLX"
  ],
  "Small-Cap Stocks": [
    "IWM"
  ],
  "Bonds/Interest Rates": [
    "TLT"
  ],
  "Other (MicroStrategy Preferred Stocks)": [
    "STRK",
    "STRF",
    "STRD"
  ],
  "Oil ETF (Optional)": [
    "USO"
  ]
}```


UI is inspired by apples minimal yet elegant design using #1d1d1f as the dark primary and ghostwhite as the text / accent color

the app should have a container, that spans 100vh and 100vw

in tat app we will have neatly distributed / organized card elements featuring white rounded boarders, rounded edges, overflow set to none

inside of those card elements, we will have the individual stock elements

When you create files or make major edits, add a timestamp. this way you can track progress and see whats being done

