import { fetchClient } from './_common/fetchClient';
import type { MeetingType } from './meetings';

interface GetMeetingRecommendRequest {
  uuid: string;
  recommendType: string;
  attendeeNames: string[];
}

export interface MeetingRecommend {
  startDate: string;
  startDayOfWeek: string;
  startTime: string;
  endDate: string;
  endDayOfWeek: string;
  endTime: string;
  attendeeNames: string[];
  rank: string;
}

export interface GetMeetingRecommendResponse {
  type: MeetingType;
  recommendedSchedules: MeetingRecommend[];
}

export const getMeetingTimeRecommends = async ({
  uuid,
  recommendType,
  attendeeNames,
}: GetMeetingRecommendRequest): Promise<GetMeetingRecommendResponse> => {
  const urlParams = new URLSearchParams();

  urlParams.append('recommendType', recommendType);
  if (attendeeNames) urlParams.append('attendeeNames', attendeeNames.join(','));

  const path = `/${uuid}/recommended-schedules?${urlParams.toString()}`;

  const data = await fetchClient<GetMeetingRecommendResponse>({
    path,
    method: 'GET',
  });

  return data;
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
  });

  return data;
};
