export default function groupDates(fullDates: string[]) {
  const groupedDates: Record<number, number[]> = {};

  fullDates.forEach((fullDate) => {
    const [, month, date] = fullDate.split('-').map(Number);

    if (!groupedDates[month]) groupedDates[month] = [date];
    else groupedDates[month].push(date);
  });

  return groupedDates;
}
