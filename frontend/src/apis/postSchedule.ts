import { API_URL } from '@constants/api';

import { fetchClient } from './fetchClient';
import type { Schedules } from './getMeetingFrame';

export const postSchedule = async ({
  uuid,
  requestData,
}: {
  uuid: string;
  requestData: Schedules[];
}) => {
  const url = `${API_URL}/api/v1/schedule/${uuid}`;
  const attendeeName = localStorage.getItem('meetingAttendee');

  await fetchClient({
    url,
    method: 'POST',
    errorMessage: '약속 참여 시간을 등록하는 중 문제가 발생했어요 :(',
    body: {
      attendeeName,
      schedules: requestData,
    },
  });
};
