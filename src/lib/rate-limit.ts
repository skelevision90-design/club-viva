interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting IP addresses
const ipStore = new Map<string, RateLimitRecord>();

// Periodically clean up entries older than 30 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 1000 * 60 * 15;
let lastCleanup = Date.now();

function purgeExpiredRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  for (const [ip, record] of ipStore.entries()) {
    const recent = record.timestamps.filter((ts) => now - ts < windowMs);
    if (recent.length === 0) {
      ipStore.delete(ip);
    } else {
      ipStore.set(ip, { timestamps: recent });
    }
  }
}

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 600000 // 10 minutes default
): { success: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  purgeExpiredRecords(windowMs);

  const record = ipStore.get(ip) || { timestamps: [] };
  // Keep only timestamps within window
  const recentTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (recentTimestamps.length >= limit) {
    const oldestTimestamp = recentTimestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    return {
      success: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  recentTimestamps.push(now);
  ipStore.set(ip, { timestamps: recentTimestamps });

  return {
    success: true,
    remaining: limit - recentTimestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}
