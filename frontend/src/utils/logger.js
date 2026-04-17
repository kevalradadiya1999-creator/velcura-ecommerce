const isDev = import.meta.env.DEV;
export const logger = {
  log: (...args) => isDev && console.log('[Velcura]', ...args),
  warn: (...args) => isDev && console.warn('[Velcura]', ...args),
  error: (...args) => {
    isDev && console.error('[Velcura]', ...args);
    // In production, you could send to an error tracking service here
  }
};
