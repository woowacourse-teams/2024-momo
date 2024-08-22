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
export const getMeetingTimeRecommends = async ({
  uuid,
  recommendType,
  attendeeNames,
}: GetMeetingRecommendRequest): Promise<MeetingRecommend[]> => {
  if (!attendeeNames) return [];

  const path = `/${uuid}/recommended-schedules?recommendType=${recommendType}&attendeeNames=${attendeeNames.join(
    ',',
  )}`;

  const data = await fetchClient<MeetingRecommend[]>({
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
