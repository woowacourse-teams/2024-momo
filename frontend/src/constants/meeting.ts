export const CREATE_MEETING_STEPS = {
  meetingName: '약속이름',
  meetingHostInfo: '약속주최자정보',
  meetingDateTime: '약속날짜시간정보',
} as const;

export const meetingStepValues = Object.values(CREATE_MEETING_STEPS);
