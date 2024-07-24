import { API_URL } from '@constants/api';

export interface Schedules {
  date: string;
  times: string[];
}

export interface GetMeetingResponse {
  meetingName: string;
  startTime: string;
  endTime: string;
  availableDates: string[];
  schedules: Schedules[];
}

// uuid 기본값은 임시 설정된 uuid
const getMeeting = async (uuid = '550e8400'): Promise<GetMeetingResponse> => {
  const url = `${API_URL}/api/v1/meeting/${uuid}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.data;
};

export default getMeeting;
