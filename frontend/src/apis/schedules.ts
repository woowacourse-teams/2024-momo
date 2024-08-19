import type {
  MeetingAllSchedules,
  MeetingAllSchedulesItem,
  MeetingSingeScheduleItem,
  MeetingSingleSchedule,
} from 'types/schedule';

import { fetchClient } from './_common/fetchClient';

export const postSchedule = async ({
  uuid,
  requestData,
}: {
  uuid: string;
  requestData: MeetingSingeScheduleItem[];
}) => {
  const path = `/${uuid}/schedules`;

  await fetchClient({
    path,
    method: 'POST',
    errorMessage: '약속 참여 시간을 등록하는 중 문제가 발생했어요 :(',
    body: {
      dateTimes: requestData,
    },
    isAuthRequire: true,
  });
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
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
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
    errorMessage: '약속 참여자들의 시간 정보를 조회하는 중 문제가 발생했어요 :(',
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
    errorMessage: '내 시간 정보를 조회하는 중 문제가 발생했어요 :(',
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
