export function getMarketProgress() {
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