interface RateLimitState {
  timestamp: number;
  count: number;
}

const rateLimitStore = new Map<string, RateLimitState>();

export async function rateLimit(
  identifier: string,
  windowMs: number,
  maxRequests: number
) {
  const now = Date.now();
  const state = rateLimitStore.get(identifier) || { timestamp: now, count: 0 };

  // Reset if window has passed
  if (now - state.timestamp > windowMs) {
    state.timestamp = now;
    state.count = 0;
  }

  // Check if limit exceeded
  if (state.count >= maxRequests) {
    return { success: false, remaining: 0, reset: state.timestamp + windowMs };
  }

  // Update state
  state.count++;
  rateLimitStore.set(identifier, state);

  return {
    success: true,
    remaining: maxRequests - state.count,
    reset: state.timestamp + windowMs
  };
} 