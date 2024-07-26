interface AllAttendeeTimeSlot {
  date: string;
  time: string;
  attendeeNames: string[];
}

export interface MeetingAllSchedulesServerResponse {
  data: {
    attendeeName: string;
    schedules: AllAttendeeTimeSlot[];
  };
}

export interface MeetingAllSchedules {
  schedules: AllAttendeeTimeSlot[];
}

interface SingleAttendeeTimeSlot {
  date: string;
  times: string[];
}

export interface MeetingSingleScheduleServerResponse {
  data: {
    attendeeName: string;
    schedules: SingleAttendeeTimeSlot[];
  };
}

export interface MeetingSingleSchedule {
  attendeeName: string;
  schedules: SingleAttendeeTimeSlot[];
}
