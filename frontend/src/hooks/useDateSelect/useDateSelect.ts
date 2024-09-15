import { useState } from 'react';
import type { DateSelectMode } from 'types/calendar';

import { getFullDate } from '@utils/date';

import { getDatesInRange } from './useDateSelect.utils';

const useDateSelect = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dateSelectMode, setDateSelectMode] = useState<DateSelectMode>('single');
  const [rangeStartDate, setRangeStartDate] = useState<string | null>(null);
  const [rangeEndDate, setRangeEndDate] = useState<string | null>(null);

  const toggleDateSelectMode = (mode: DateSelectMode) => {
    if (mode === dateSelectMode) return;

    setDateSelectMode(mode);
    setSelectedDates([]);
    setRangeStartDate(null);
    setRangeEndDate(null);
  };

  const handleSelectedDateBySingleMode = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  const handleRangeStartDatePick = (date: string) => {
    setRangeStartDate(date);
    setRangeEndDate(null);
    setSelectedDates([date]);
  };

  const handleRangeEndDatePick = (date: string) => {
    if (!rangeStartDate || rangeStartDate === date) return;

    const start = new Date(rangeStartDate);
    const end = new Date(date);

    if (end < start) {
      setRangeStartDate(date);
      setSelectedDates([date]);
      return;
    } else {
      setRangeEndDate(date);
      const range = getDatesInRange(start, end);
      setSelectedDates(range);
    }
  };

  const handleSelectedDateByRangeMode = (date: string) => {
    if (isAllRangeSelected || !rangeStartDate) {
      handleRangeStartDatePick(date);
      return;
    }

    handleRangeEndDatePick(date);
  };

  const handleSelectedDates = (date: string) => {
    if (dateSelectMode === 'single') {
      handleSelectedDateBySingleMode(date);
      return;
    }

    handleSelectedDateByRangeMode(date);
  };

  const hasDate = (date: string) => {
    return selectedDates.includes(date);
  };
  const checkIsRangeStartDate = (date: Date) => getFullDate(date) === rangeStartDate;
  const checkIsRangeEndDate = (date: Date) => getFullDate(date) === rangeEndDate;
  const isAllRangeSelected = rangeStartDate !== null && rangeEndDate != null;

  return {
    selectedDates,
    dateSelectMode,
    toggleDateSelectMode,
    checkIsRangeStartDate,
    checkIsRangeEndDate,
    handleSelectedDates,
    hasDate,
    isAllRangeSelected,
  };
};

export default useDateSelect;
