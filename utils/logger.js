// utils/logger.js
export const logger = (message, level = 'info', extra = '') => {
    const levels = {
        success: '\x1b[32m%s\x1b[0m',  // Green
        error: '\x1b[31m%s\x1b[0m',    // Red
        info: '\x1b[34m%s\x1b[0m'      // Blue
    };
    console.log(levels[level] || levels.info, message, extra);
};
