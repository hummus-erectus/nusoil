export const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = seconds / secondsInUnit;
    if (interval >= 1) {
      const rounded = Math.floor(interval);
      return `${rounded} ${unit}${rounded !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};
