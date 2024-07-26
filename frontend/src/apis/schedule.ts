import { API_URL } from '@constants/api';

import type { Schedules } from './meetings';

export const postSchedule = async (requestData: Schedules[]) => {
  const url = `${API_URL}/api/v1/schedule`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      meetingId: 1,
      guestName: 'daon',
      dateTimes: requestData,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

// 현재 쓰지 않는 API (schedule 수정 시 사용하는 API)
export const getSchedule = async () => {
  const url = `${API_URL}/api/v1/schedule}`;

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
  return data;
};
