# Market Glance Web Interface

## Goal
Build a simple, elegant web page showing current prices and daily changes for stocks/ETFs grouped by categories. The interface is inspired by Apple's minimalist design, featuring a dark theme and clean typography. The dashboard will eventually fetch and display real-time data.

## Current Features
- **Categorized Display**: Stocks and ETFs are grouped into expandable category cards.
- **Dynamic Layout**: A responsive CSS Grid layout with a masonry-style effect that organizes cards to fill available space efficiently.
- **Live Price-Action Graph**: A sparkline graph for each stock, which visually represents the trading day's progress from 9:30 AM to 4:00 PM EST.
- **Visual Feedback**: Interactive hover effects on stock items to improve user experience.
- **Mock Data**: Currently uses randomly generated data for prices, changes, and graphs.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (no external libraries)
- **API (Future)**: Finnhub API for real-time stock quotes.

## Next Steps & Future Enhancements
1.  **Integrate Finnhub API**:
    -   Replace mock data with live data from the Finnhub API.
    -   Implement API calls to fetch quotes for all tickers.
    -   Handle API rate limits (60 calls/minute on the free tier).
2.  **Add a Refresh Button**:
    -   Allow users to manually refresh the data.
3.  **Improve Error Handling**:
    -   Display friendly messages if the API fails or data can't be loaded.
4.  **Add Company Names**:
    -   Fetch and display the full company name below the ticker symbol.
5.  **Configuration**:
    -   Allow users to customize the list of tickers and categories.

## Categories and Tickers
```json
{
  "Broad Market ETFs": ["SPY", "QQQ", "DIA"],
  "Small-Cap Stocks": ["IWM"],
  "Bonds/Interest Rates": ["TLT"],
  "Tech": ["AAPL", "AMZN", "GOOGL", "META", "TSLA", "NVDA", "MSFT"],
  "CPU/Semiconductors": ["AMD", "INTC", "AVGO", "MU", "NVDA"],
  "Communication Services": ["VZ", "NFLX"],
  "Financials": ["JPM", "BRK.B", "BAC", "ZION"],
  "Healthcare": ["LLY", "UNH", "JNJ", "URGN"],
  "Consumer Discretionary": ["HD", "WMT"],
  "Consumer Staples": ["PG", "KO"],
  "Industrials": ["GE"],
  "Energy/Oil": ["XOM", "CVX", "NEE"],
  "Materials": ["FCX"],
  "Real Estate": ["VNQ", "O"],
  "Utilities": ["DUK"],
  "Military Industrial Complex": ["LMT", "RTX", "NOC", "AXON", "BA"],
  "Precious Metals": ["GLD", "SLV", "NEM"],
  "Crypto-Related": ["MSTR", "COIN", "BITO"],
  "Coffee/Agriculture": ["SBUX", "JO", "DBA", "KHC"],
  "Oil ETF (Optional)": ["USO"],
  "Other (MicroStrategy Preferred Stocks)": ["STRK", "STRF", "STRD"]
}
```

