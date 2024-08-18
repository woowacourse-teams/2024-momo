const TOTAL_MONTH = 12;

export default function groupDates(fullDates: string[]) {
  const groupedDates: number[][] = Array.from({ length: TOTAL_MONTH }, (): number[] => []);

  fullDates.forEach((fullDate) => {
    const [, month, date] = fullDate.split('-').map(Number);

    groupedDates[month].push(date);
  });

  return groupedDates;
}
