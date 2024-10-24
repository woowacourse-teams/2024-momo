export interface MeetingAllSchedulesItem {
  date: string;
  time: string;
  attendeeNames: string[];
}

export interface MeetingAllSchedules {
  schedules: MeetingAllSchedulesItem[];
}

export interface MeetingSingeScheduleItem {
  date: string;
  times: string[];
}

export interface MeetingSingleSchedule {
  attendeeName: string;
  schedules: MeetingSingeScheduleItem[];
}

export type Mode = 'register' | 'edit';
