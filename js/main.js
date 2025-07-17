import { initializeApp } from './ui.js';
import { initializePerformanceMonitor } from './performance.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializePerformanceMonitor();
}); 