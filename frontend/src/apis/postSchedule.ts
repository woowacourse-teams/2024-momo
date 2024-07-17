import { API_URL } from '@constants/api';

import { Schedules } from './getMeeting';

const postSchedule = async (requestData: Schedules[]) => {
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

  const data = await response.json();
  return data;
};

export default postSchedule;
