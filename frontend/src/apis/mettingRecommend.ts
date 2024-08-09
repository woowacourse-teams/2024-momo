import { fetchClient } from './_common/fetchClient';

interface GetMeetingRecommendRequest {
  uuid: string;
  recommendType: string;
  attendeeNames: string[] | undefined;
}

export interface MeetingRecommend {
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

  const path = `/${uuid}/recommended-schedules?recommendType=${recommendType}&attendeeNames=${attendeeNames.join(
    ',',
  )}`;

  const data = await fetchClient<GetMeetingRecommendResponse>({
    path,
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
  const path = `/${uuid}/attendees`;

  const data = await fetchClient<GetMeetingAttendeesResponse>({
    path,
    method: 'GET',
    errorMessage: '약속 참여자들의 정보를 가져오는데 실패했어요 :(',
  });

  return data;
};
