import { API_URL } from '@constants/api';

import { fetchClient } from './fetchClient';

export interface Schedules {
  date: string;
  times: string[];
}

interface MeetingFrameSeverResponse {
  data: {
    meetingName: string;
    firstTime: string;
    lastTime: string;
    availableDates: string[];
    attendeeNames: string[];
  };
}

interface MeetingFrame {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  availableDates: string[];
  attendees: string[];
}

const getMeetingFrame = async (uuid: string): Promise<MeetingFrame | undefined> => {
  const url = `${API_URL}/api/v1/meeting/${uuid}`;

  const response = await fetchClient<MeetingFrameSeverResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  if (response) {
    const { meetingName, firstTime, lastTime, availableDates } = response.data;

    return {
      meetingName,
      firstTime,
      lastTime,
      availableDates,
      attendees: response.data.attendeeNames,
    };
  }
};

export default getMeetingFrame;
