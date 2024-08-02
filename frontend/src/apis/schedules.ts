import { getCookie } from '@utils/cookies';

import { BASE_URL } from '@constants/api';
import { COOKIE_KEYS } from '@constants/cookies';

import { fetchClient } from './_common/fetchClient';

interface SingleAttendeeTimeSlot {
  date: string;
  times: string[];
}

interface AllAttendeeTimeSlot {
  date: string;
  time: string;
  attendeeNames: string[];
}

interface MeetingAllSchedulesResponse {
  schedules: AllAttendeeTimeSlot[];
}

export interface MeetingAllSchedules {
  schedules: AllAttendeeTimeSlot[];
}

interface MeetingSingleScheduleResponse {
  attendeeName: string;
  schedules: SingleAttendeeTimeSlot[];
}

export interface MeetingSingleSchedule {
  attendeeName: string;
  schedules: SingleAttendeeTimeSlot[];
}

export const postSchedule = async ({
  uuid,
  requestData,
}: {
  uuid: string;
  requestData: SingleAttendeeTimeSlot[];
}) => {
  const url = `${BASE_URL}/${uuid}/schedules`;
  const attendeeName = getCookie(COOKIE_KEYS.attendeeName);

  await fetchClient({
    url,
    method: 'POST',
    errorMessage: '약속 참여 시간을 등록하는 중 문제가 발생했어요 :(',
    body: {
      attendeeName,
      dateTimes: requestData,
    },
  });
};

export const createMeetingSchedulesRequestUrl = (uuid: string, attendeeName: string) => {
  const params = new URLSearchParams();

  params.append('attendeeName', attendeeName);

  return `${BASE_URL}/${uuid}/schedules?${params.toString()}`;
};

const getMeetingAllSchedules = async (uuid: string): Promise<MeetingAllSchedules> => {
  const url = `${BASE_URL}/${uuid}/schedules`;

  const data = await fetchClient<MeetingAllSchedulesResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  return {
    schedules: data.schedules,
  };
};

const getMeetingSingleSchedule = async ({
  attendeeName,
  uuid,
}: {
  attendeeName: string;
  uuid: string;
}): Promise<MeetingSingleSchedule> => {
  const url = createMeetingSchedulesRequestUrl(uuid, attendeeName);

  const data = await fetchClient<MeetingSingleScheduleResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  return {
    attendeeName: data.attendeeName,
    schedules: data.schedules,
  };
};

export const getMeetingMySchedule = async (uuid: string): Promise<MeetingSingleSchedule> => {
  const url = `${BASE_URL}/${uuid}/attendees/me/schedules`;

  const data = await fetchClient<MeetingSingleScheduleResponse>({
    url,
    method: 'GET',
    errorMessage: '내 시간 정보를 조회하는 중 문제가 발생했어요 :(',
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
