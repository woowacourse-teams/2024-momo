import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface GetMeetingBaseResponse {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  isLocked: boolean;
  availableDates: string[];
  attendeeNames: string[];
}

export interface MeetingBase {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  isLocked: boolean;
  availableDates: string[];
  attendeeNames: string[];
}

export interface MeetingRequest {
  hostName: string;
  hostPassword: string;
  meetingName: string;
  meetingAvailableDates: string[];
  meetingStartTime: string;
  meetingEndTime: string;
}

interface PostMeetingResponse {
  uuid: string;
}

export interface MeetingInfo {
  uuid: string;
}

// uuid 기본값은 임시 설정된 uuid
export const getMeetingBase = async (uuid: string): Promise<MeetingBase> => {
  const url = `${BASE_URL}/${uuid}`;

  const data = await fetchClient<GetMeetingBaseResponse>({
    url,
    method: 'GET',
    errorMessage: '약속 정보를 조회하는 중 문제가 발생했어요 :(',
  });

  return {
    meetingName: data.meetingName,
    isLocked: data.isLocked,
    firstTime: data.firstTime,
    lastTime: data.lastTime,
    availableDates: data.availableDates,
    attendeeNames: data.attendeeNames,
  };
};

export const postMeeting = async (request: MeetingRequest): Promise<MeetingInfo> => {
  const data = await fetchClient<PostMeetingResponse>({
    url: BASE_URL,
    method: 'POST',
    body: request,
    errorMessage: '약속을 생성하는데 문제가 발생했어요 :(',
  });

  return {
    uuid: data.uuid,
  };
};
