document.addEventListener('DOMContentLoaded', () => {
    const categories = {
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
    };

    let sparklineIdCounter = 0;

    function getMarketProgress() {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const hourPart = parts.find(p => p.type === 'hour');
        const minutePart = parts.find(p => p.type === 'minute');

        if (!hourPart || !minutePart) {
            console.error("Could not determine time in America/New_York timezone.");
            return 1;
        }

        const hour = parseInt(hourPart.value);
        const minute = parseInt(minutePart.value);

        const nowInMinutes = hour * 60 + minute;
        const marketOpenInMinutes = 9 * 60 + 30;
        const marketCloseInMinutes = 16 * 60;
        const marketDuration = marketCloseInMinutes - marketOpenInMinutes;

        if (nowInMinutes <= marketOpenInMinutes) return 0;
        if (nowInMinutes >= marketCloseInMinutes) return 1;

        const minutesSinceOpen = nowInMinutes - marketOpenInMinutes;
        return minutesSinceOpen / marketDuration;
    }

    function createSparkline(data, color, progress) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        const width = 80;
        const height = 30;
        svg.setAttribute("class", "sparkline-graph");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        if (progress <= 0 || data.length < 2) {
            return svg;
        }

        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        
        const path = document.createElementNS(svgNS, "path");
        let d = "M";
        data.forEach((d_point, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = range === 0 ? height / 2 : height - (((d_point - min) / range) * (height - 4)) - 2;
            d += `${x.toFixed(2)},${y.toFixed(2)} `;
        });

        path.setAttribute("d", d.trim());
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", "1.5");

        const clipId = `sparkline-clip-${sparklineIdCounter++}`;
        const defs = document.createElementNS(svgNS, "defs");
        const clipPath = document.createElementNS(svgNS, "clipPath");
        clipPath.setAttribute("id", clipId);

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", "0");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", width * progress);
        rect.setAttribute("height", height);

        clipPath.appendChild(rect);
        defs.appendChild(clipPath);
        svg.appendChild(defs);

        path.setAttribute("clip-path", `url(#${clipId})`);
        
        svg.appendChild(path);
        return svg;
    }

    const appContainer = document.getElementById('app-container');

    function renderCards() {
        const progress = getMarketProgress();
        sparklineIdCounter = 0;
        appContainer.innerHTML = ''; // Clear previous content
        for (const category in categories) {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';

            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categoryCard.appendChild(categoryTitle);

            categories[category].forEach(tickerSymbol => {
                // Mock data for demonstration
                const price = (Math.random() * 1000).toFixed(2);
                const changePercent = (Math.random() * 10 - 5).toFixed(2);
                const changeType = changePercent >= 0 ? 'positive' : 'negative';
                const change = `${changePercent >= 0 ? '+' : ''}${changePercent}%`;
                const sparklineData = Array.from({ length: 20 }, () => Math.random() * 100);
                const sparklineColor = changeType === 'positive' ? '#34c759' : '#ff3b30';

                const stockItem = document.createElement('div');
                stockItem.className = 'stock-item';

                const stockInfo = document.createElement('div');
                stockInfo.className = 'stock-info';

                const ticker = document.createElement('div');
                ticker.className = 'ticker';
                ticker.textContent = tickerSymbol;

                const name = document.createElement('div');
                name.className = 'name';
                name.textContent = 'Loading...'; // Placeholder for name

                stockInfo.appendChild(ticker);
                stockInfo.appendChild(name);

                const graph = document.createElement('div');
                graph.className = 'graph';
                const sparkline = createSparkline(sparklineData, sparklineColor, progress);
                graph.appendChild(sparkline);
                
                const priceInfo = document.createElement('div');
                priceInfo.className = 'price-info';

                const priceEl = document.createElement('div');
                priceEl.className = 'price';
                priceEl.textContent = `$${price}`;

                const changeEl = document.createElement('div');
                changeEl.className = `change ${changeType}`;
                changeEl.textContent = change;

                priceInfo.appendChild(priceEl);
                priceInfo.appendChild(changeEl);

                stockItem.appendChild(stockInfo);
                stockItem.appendChild(graph);
                stockItem.appendChild(priceInfo);

                categoryCard.appendChild(stockItem);
            });

            appContainer.appendChild(categoryCard);
        }
    }

    renderCards();
    setInterval(renderCards, 60 * 1000);
}); 