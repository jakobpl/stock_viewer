import { categories } from './constants.js';
import { getMarketProgress } from './utils.js';
import { incrementRenderCount } from './performance.js';

let sparklineIdCounter = 0;

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

function createStockItem(tickerSymbol, progress) {
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

    stockItem.addEventListener('click', () => openModal(tickerSymbol));

    return stockItem;
}

const modal = document.getElementById('stock-modal');
const modalStockDetails = document.getElementById('modal-stock-details');
const closeButton = document.querySelector('.close-button');

function openModal(tickerSymbol) {
    const stockData = {
        ticker: 'OKLO',
        name: 'Oklo Inc.',
        exchange: 'NYSE',
        currency: 'USD',
        atClose: { price: 67.17, change: '+4.35%', changeType: 'positive' },
        afterHours: { price: 66.76, change: '-0.61%', changeType: 'negative' },
        stats: {
            open: '65.81', high: '67.93', low: '64.59',
            vol: '20.19M', pe: '-', mktCap: '9.900B',
            '52wH': '73.55', '52wL': '5.35', avgVol: '19.74M',
            yield: '—', beta: '0.60', eps: '-0.47'
        }
    };

    modalStockDetails.innerHTML = `
        <div class="modal-header">
            <div class="modal-stock-info">
                <div class="ticker">${stockData.ticker}</div>
                <div class="name">${stockData.name}</div>
                <div class="exchange">${stockData.exchange} · ${stockData.currency}</div>
            </div>
            <div class="modal-price-stats">
                <div class="price-stat">
                    <span class="price">${stockData.atClose.price}</span>
                    <span class="change ${stockData.atClose.changeType}">${stockData.atClose.change}</span>
                    <div class="label">At Close</div>
                </div>
                <div class="price-stat">
                    <span class="price">${stockData.afterHours.price}</span>
                    <span class="change ${stockData.afterHours.changeType}">${stockData.afterHours.change}</span>
                    <div class="label">After Hours</div>
                </div>
            </div>
        </div>
        <div class="modal-chart-controls">
            <button class="active">1D</button>
            <button>1W</button>
            <button>1M</button>
            <button>3M</button>
            <button>6M</button>
            <button>YTD</button>
            <button>1Y</button>
            <button>2Y</button>
            <button>5Y</button>
            <button>10Y</button>
            <button>ALL</button>
        </div>
        <div class="modal-chart-area">
            Chart Placeholder
        </div>
        <div class="modal-footer-stats">
            <div class="stat-column">
                <div class="stat"><span class="label">Open</span><span class="value">${stockData.stats.open}</span></div>
                <div class="stat"><span class="label">High</span><span class="value">${stockData.stats.high}</span></div>
                <div class="stat"><span class="label">Low</span><span class="value">${stockData.stats.low}</span></div>
            </div>
            <div class="stat-column">
                <div class="stat"><span class="label">Vol</span><span class="value">${stockData.stats.vol}</span></div>
                <div class="stat"><span class="label">P/E</span><span class="value">${stockData.stats.pe}</span></div>
                <div class="stat"><span class="label">Mkt Cap</span><span class="value">${stockData.stats.mktCap}</span></div>
            </div>
            <div class="stat-column">
                <div class="stat"><span class="label">52W H</span><span class="value">${stockData.stats['52wH']}</span></div>
                <div class="stat"><span class="label">52W L</span><span class="value">${stockData.stats['52wL']}</span></div>
                <div class="stat"><span class="label">Avg Vol</span><span class="value">${stockData.stats.avgVol}</span></div>
            </div>
            <div class="stat-column">
                <div class="stat"><span class="label">Yield</span><span class="value">${stockData.stats.yield}</span></div>
                <div class="stat"><span class="label">Beta</span><span class="value">${stockData.stats.beta}</span></div>
                <div class="stat"><span class="label">EPS</span><span class="value">${stockData.stats.eps}</span></div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

const appContainer = document.getElementById('app-container');
const cardWidth = 320;
const gap = 20;

function positionCards() {
    const containerWidth = appContainer.offsetWidth;
    const numColumns = Math.floor((containerWidth + gap) / (cardWidth + gap));
    const columns = Array(numColumns).fill(0).map(() => gap);

    const cardContainers = document.querySelectorAll('.category-card-container');

    cardContainers.forEach(container => {
        const card = container.querySelector('.category-card');
        const cardHeight = card.offsetHeight;
        
        const minColIndex = columns.indexOf(Math.min(...columns));
        
        container.style.top = `${columns[minColIndex]}px`;
        container.style.left = `${minColIndex * (cardWidth + gap)}px`;

        columns[minColIndex] += cardHeight + gap;
    });

    appContainer.style.height = `${Math.max(...columns)}px`;
}

function renderCards() {
    incrementRenderCount();
    const progress = getMarketProgress();
    sparklineIdCounter = 0;
    appContainer.innerHTML = ''; // Clear previous content
    
    const cardPromises = Object.keys(categories).map(category => {
        const categoryCardContainer = document.createElement('div');
        categoryCardContainer.className = 'category-card-container';
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';

        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryCard.appendChild(categoryTitle);

        categories[category].forEach(tickerSymbol => {
            const stockItem = createStockItem(tickerSymbol, progress);
            categoryCard.appendChild(stockItem);
        });
        
        categoryCardContainer.appendChild(categoryCard);
        appContainer.appendChild(categoryCardContainer);
        
        return new Promise(resolve => {
            // Ensure images and other content are loaded before positioning
            requestAnimationFrame(() => resolve());
        });
    });

    Promise.all(cardPromises).then(() => {
        positionCards();
    });
}

export function initializeApp() {
    renderCards();
    setInterval(renderCards, 60 * 1000);

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(positionCards, 100);
    });

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
} 