import { fetchClient } from './_common/fetchClient';

export interface ConfirmDates {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface PostMeetingConfirmRequest {
  uuid: string;

  requests: ConfirmDates;
}

export interface GetConfirmedMeetingInfoResponse extends ConfirmDates {
  meetingName: string;
  availableAttendeeNames: string[];
  startDayOfWeek: string;
  endDayOfWeek: string;
}

export const postMeetingConfirm = async ({ uuid, requests }: PostMeetingConfirmRequest) => {
  const data = await fetchClient({
    path: `/${uuid}/confirm`,
    method: 'POST',
    body: requests,
    isAuthRequire: true,
  });

  return data;
};

export const getConfirmedMeetingInfo = async (uuid: string) => {
  const data = await fetchClient<Promise<GetConfirmedMeetingInfoResponse>>({
    path: `/${uuid}/confirm`,
    method: 'GET',
  });

  return data;
};
