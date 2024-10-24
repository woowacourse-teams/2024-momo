import { fetcher } from '../_common/fetcher';
import type { MeetingType } from './meetings';

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
  type: MeetingType;
  hostName: string;
  meetingName: string;
  availableAttendeeNames: string[];
  startDayOfWeek: string;
  endDayOfWeek: string;
}

export const postMeetingConfirm = async ({ uuid, requests }: PostMeetingConfirmRequest) => {
  const data = await fetcher.post({
    path: `/${uuid}/confirm`,
    body: requests,
    isAuthRequire: true,
  });

  return data;
};

export const getConfirmedMeetingInfo = async (uuid: string) => {
  const data = await fetcher.get<GetConfirmedMeetingInfoResponse>({ path: `/${uuid}/confirm` });

  return data;
};

export const deleteFixedMeeting = async (uuid: string) => {
  await fetcher.delete({ path: `/${uuid}/confirm`, isAuthRequire: true });
};
