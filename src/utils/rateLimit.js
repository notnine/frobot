/**
 * Simple rate limiter using localStorage for tracking token usage
 */

const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_TOKENS_PER_HOUR = 8000;
const TOKENS_PER_MESSAGE_ESTIMATE = 160;

// Estimate tokens using 4 chars per token approximation
const estimateTokens = text => text ? Math.ceil(text.length / 4) : 0;

export const RateLimiter = {
  // Get current usage from localStorage
  getUsage() {
    try {
      const savedUsage = localStorage.getItem('frobot_usage');
      return savedUsage ? JSON.parse(savedUsage) : { tokens: 0, messages: 0, timestamp: Date.now() };
    } catch (error) {
      console.error('Error reading rate limit data:', error);
      return { tokens: 0, messages: 0, timestamp: Date.now() };
    }
  },

  // Record token usage from a conversation
  incrementWithTokens(messageText, responseText) {
    try {
      const usage = this.getUsage();
      const now = Date.now();
      const resetTimePassed = now - usage.timestamp > ONE_HOUR_MS;
      
      const messageTokens = estimateTokens(messageText);
      const responseTokens = estimateTokens(responseText);
      const totalTokens = messageTokens + responseTokens;

      const newUsage = {
        tokens: resetTimePassed ? totalTokens : usage.tokens + totalTokens,
        messages: resetTimePassed ? 1 : usage.messages + 1,
        timestamp: resetTimePassed ? now : usage.timestamp
      };
      
      localStorage.setItem('frobot_usage', JSON.stringify(newUsage));
      console.log(`Tokens remaining: ${MAX_TOKENS_PER_HOUR - newUsage.tokens}/${MAX_TOKENS_PER_HOUR}`);
      return newUsage.tokens;
    } catch (error) {
      console.error('Error updating rate limit data:', error);
      return 0;
    }
  },
  
  // Backward compatibility
  increment(messageText = "") {
    return this.incrementWithTokens(messageText, "");
  },

  // Check if rate limit is exceeded
  isLimited() {
    const usage = this.getUsage();
    return Date.now() - usage.timestamp <= ONE_HOUR_MS && usage.tokens >= MAX_TOKENS_PER_HOUR;
  },
  
  // Check if next message would exceed limit
  wouldExceedLimit(messageText) {
    if (this.isLimited()) return true;
    
    const usage = this.getUsage();
    const estimatedTotal = estimateTokens(messageText) + TOKENS_PER_MESSAGE_ESTIMATE;
    
    return usage.tokens + estimatedTotal > MAX_TOKENS_PER_HOUR;
  },

  // Get token usage statistics
  getStats() {
    const usage = this.getUsage();
    const now = Date.now();
    
    // Reset stats if it's been more than an hour
    if (now - usage.timestamp > ONE_HOUR_MS) {
      return {
        tokensUsed: 0,
        tokensRemaining: MAX_TOKENS_PER_HOUR,
        isLimited: false,
        percentUsed: 0,
        minutesUntilReset: 60
      };
    }
    
    const tokensRemaining = Math.max(0, MAX_TOKENS_PER_HOUR - usage.tokens);
    const percentUsed = Math.min(100, Math.round((usage.tokens / MAX_TOKENS_PER_HOUR) * 100));
    const minutesUntilReset = Math.ceil((usage.timestamp + ONE_HOUR_MS - now) / (60 * 1000));
    
    return {
      tokensUsed: usage.tokens,
      tokensRemaining,
      isLimited: usage.tokens >= MAX_TOKENS_PER_HOUR,
      percentUsed,
      minutesUntilReset
    };
  },
  
  // Helper method to expose token estimation
  estimateTokens
}; 