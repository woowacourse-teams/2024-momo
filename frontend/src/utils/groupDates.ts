export default function groupDates(fullDates: string[]) {
  const sortedFullDates = fullDates.sort(
    (prevDate, nextDate) => new Date(prevDate).getTime() - new Date(nextDate).getTime(),
  );
  const groupedDates = new Map<string, number[]>();

  sortedFullDates.forEach((fullDate) => {
    const [year, month, date] = fullDate.split('-').map(Number);
    const key = `${year}-${String(month).padStart(2, '0')}`;

    if (!groupedDates.has(key)) groupedDates.set(key, [date]);
    else groupedDates.get(key)!.push(date);
  });

  return Array.from(groupedDates.entries());
}
