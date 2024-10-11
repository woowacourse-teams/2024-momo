import type {
  MeetingAllSchedules,
  MeetingAllSchedulesItem,
  MeetingSingeScheduleItem,
  MeetingSingleSchedule,
} from 'types/schedule';

import { ResponseError } from '@utils/responseError';

import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

export const postSchedule = async ({
  uuid,
  requestData,
}: {
  uuid: string;
  requestData: MeetingSingeScheduleItem[];
}) => {
  const response = await fetch(`${BASE_URL}/${uuid}/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateTimes: requestData,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ResponseError(data);
  }
};

export const createMeetingSchedulesRequestUrl = (uuid: string, attendeeName: string) => {
  const params = new URLSearchParams();

  params.append('attendeeName', attendeeName);

  return `/${uuid}/schedules?${params.toString()}`;
};

interface MeetingAllSchedulesResponse {
  schedules: MeetingAllSchedulesItem[];
}

const getMeetingAllSchedules = async (uuid: string): Promise<MeetingAllSchedules> => {
  const path = `/${uuid}/schedules`;

  const data = await fetchClient<MeetingAllSchedulesResponse>({
    path,
    method: 'GET',
  });

  return {
    schedules: data.schedules,
  };
};

interface MeetingSingleScheduleResponse {
  attendeeName: string;
  schedules: MeetingSingeScheduleItem[];
}

const getMeetingSingleSchedule = async ({
  attendeeName,
  uuid,
}: {
  attendeeName: string;
  uuid: string;
}): Promise<MeetingSingleSchedule> => {
  const path = createMeetingSchedulesRequestUrl(uuid, attendeeName);

  const data = await fetchClient<MeetingSingleScheduleResponse>({
    path,
    method: 'GET',
  });

  return {
    attendeeName: data.attendeeName,
    schedules: data.schedules,
  };
};

export const getMeetingMySchedule = async (uuid: string): Promise<MeetingSingleSchedule> => {
  const path = `/${uuid}/attendees/me/schedules`;

  const data = await fetchClient<MeetingSingleScheduleResponse>({
    path,
    method: 'GET',
    isAuthRequire: true,
  });

  return {
    attendeeName: data.attendeeName,
    schedules: data.schedules,
  };
};

export const handleGetMeetingSchedules = async ({
  uuid,
  attendeeName,
}: {
  attendeeName: string;
  uuid: string;
}) => {
  return attendeeName === ''
    ? await getMeetingAllSchedules(uuid)
    : await getMeetingSingleSchedule({ attendeeName, uuid });
};
