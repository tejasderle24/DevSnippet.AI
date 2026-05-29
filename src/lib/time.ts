export function getTimeAgo(isoDate: string): string {
  const now = Date.now();
  const input = new Date(isoDate).getTime();
  const diffMs = Math.max(0, now - input);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  return `${Math.floor(diffMs / day)}d ago`;
}

