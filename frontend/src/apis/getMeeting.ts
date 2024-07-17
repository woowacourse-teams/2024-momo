import { API_URL } from '../constants/api';

export interface Schedules {
  date: string;
  times: string[];
}

export interface getMeetingResponse {
  meetingName: string;
  startTime: string;
  endTime: string;
  availableDates: string[];
  schedules: Schedules[];
}

const getMeeting = async (uuid = '550e8400') => {
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

  return data.data as getMeetingResponse;
};

export default getMeeting;
