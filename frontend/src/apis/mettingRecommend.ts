import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface GetMeetingRecommendRequest {
  uuid: string;
  recommendType: string;
  attendeeNames: string[] | undefined;
}

interface MeetingRecommend {
  startDate: string;
  startDayOfWeek: string;
  startTime: string;
  endDate: string;
  endDayOfWeek: string;
  endTime: string;
  attendeeNames: string[];
}

interface GetMeetingRecommendResponse {
  recommendSchedules: MeetingRecommend[];
}

export const getMeetingTimeRecommends = async ({
  uuid,
  recommendType,
  attendeeNames,
}: GetMeetingRecommendRequest): Promise<MeetingRecommend[]> => {
  if (!attendeeNames) return [];

  const url = `${BASE_URL}/${uuid}/recommended-schedules?recommendType=${recommendType}&attendeeNames=${attendeeNames.join(
    ',',
  )}`;

  const data = await fetchClient<GetMeetingRecommendResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 시간 추천을 가져오는데 실패했어요 :(',
  });

  return data.recommendSchedules;
};

type GetMeetingAttendeesResponse = string[];

type MeetingAttendees = string[];

export const getMeetingAttendees = async ({
  uuid,
}: {
  uuid: string;
}): Promise<MeetingAttendees> => {
  const url = `${BASE_URL}/${uuid}/attendees`;

  const data = await fetchClient<GetMeetingAttendeesResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 참여자들의 정보를 가져오는데 실패했어요 :(',
  });

  return data;
};
