export const generateAriaLabelForTab = (text: string, isSelected: boolean) => {
  return `${text} 참여자가 선택한 일정 확인하기. ${isSelected ? '선택됨' : ''}`;
};
