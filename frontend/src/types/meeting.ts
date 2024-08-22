export interface MeetingDateTime {
  firstTime: string;
  lastTime: string;
  availableDates: string[];
}

export interface MeetingBase extends MeetingDateTime {
  meetingName: string;
  hostName: string;
  attendeeNames: string[];
  isLocked: boolean;
}

export interface PostMeetingResult extends MeetingDateTime {
  uuid: string;
  userName: string;
  meetingName: string;
}
