import type { DayOfWeekKR } from 'types/calendar';

export const formatAriaTab = (text: string, isSelected: boolean) => {
  return `${text} 참여자가 선택한 일정 확인하기. ${isSelected ? '선택됨' : ''}`;
};

export const formatAriaFullDate = (date: string, dayOfWeek: DayOfWeekKR, attendees?: string[]) => {
  if (!attendees) {
    return '';
  }

  const [year, month, day] = date.split('-');

  const fullDateText = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일.`;

  const totalAttendeeCount = attendees.length;

  if (totalAttendeeCount !== 0) {
    return `${fullDateText} 총 참여 인원은 ${totalAttendeeCount}명 입니다. 참여 인원은 ${attendees.join(', ')}입니다.`;
  }

  return `${fullDateText} 현재 참여 인원이 없습니다.`;
};
