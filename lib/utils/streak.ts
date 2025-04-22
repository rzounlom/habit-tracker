export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  // Sort dates from most recent to oldest
  const sorted = dates
    .map((d) => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  const today = new Date().setHours(0, 0, 0, 0);
  let streak = 0;

  for (let i = 0; i < sorted.length; i++) {
    const expectedDate = today - i * 86400000; // 1 day in ms
    if (sorted[i] === expectedDate) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
