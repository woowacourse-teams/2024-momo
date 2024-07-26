import type {
  MeetingAllSchedules,
  MeetingAllSchedulesServerResponse,
  MeetingSingleSchedule,
  MeetingSingleScheduleServerResponse,
} from 'types/meeting';

import { API_URL } from '@constants/api';

import { fetchClient } from './fetchClient';

export const createMeetingSchedulesRequestUrl = (uuid: string, attendeeName: string) => {
  const params = new URLSearchParams();

  params.append('attendeeName', attendeeName);

  return `${API_URL}/api/v1/meeting/${uuid}/schedules?${params.toString()}`;
};

const getMeetingAllSchedules = async (uuid: string): Promise<MeetingAllSchedules | undefined> => {
  const url = `${API_URL}/api/v1/meeting/${uuid}/schedules`;

  const response = await fetchClient<MeetingAllSchedulesServerResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  if (response) {
    return {
      schedules: response.data.schedules,
    };
  }
};

const getMeetingSingleSchedule = async ({
  attendeeName,
  uuid,
}: {
  attendeeName: string;
  uuid: string;
}): Promise<MeetingSingleSchedule | undefined> => {
  const url = createMeetingSchedulesRequestUrl(uuid, attendeeName);

  const response = await fetchClient<MeetingSingleScheduleServerResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  if (response) {
    const { attendeeName, schedules } = response.data;
    return {
      attendeeName,
      schedules,
    };
  }
};

export const getMeetingMySchedule = async (
  uuid: string,
): Promise<MeetingSingleSchedule | undefined> => {
  const url = `${API_URL}/api/v1/meeting/${uuid}/my-schedule`;

  const response = await fetchClient<MeetingSingleScheduleServerResponse>({
    url,
    method: 'GET',
    errorMessage: '내 시간 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  if (response) {
    const { attendeeName, schedules } = response.data;
    return {
      attendeeName,
      schedules,
    };
  }
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
