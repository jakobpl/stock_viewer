const statsBox = document.getElementById('stats-box');
let fps = 0, frameCount = 0, lastTime = performance.now();
let renderCount = 0;
let networkActivity = 0; // Placeholder

function updateStats() {
    const now = performance.now();
    frameCount++;

    if (now - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = now;
    }

    statsBox.innerHTML = `
        FPS: ${fps}<br>
        Renders: ${renderCount}<br>
        Network: ${networkActivity} reqs
    `;

    requestAnimationFrame(updateStats);
}

export function initializePerformanceMonitor() {
    if (statsBox) {
        requestAnimationFrame(updateStats);
    }
}

export function incrementRenderCount() {
    renderCount++;
}

export function incrementNetworkActivity() {
    networkActivity++;
} 