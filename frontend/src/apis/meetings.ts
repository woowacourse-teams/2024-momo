import type { MeetingBase, PostMeetingResult } from 'types/meeting';

import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface MeetingBaseResponse {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  isLocked: boolean;
  hostName: string;
  availableDates: string[];
  attendeeNames: string[];
}

export const getMeetingBase = async (uuid: string): Promise<MeetingBase> => {
  const path = `/${uuid}`;

  const data = await fetchClient<MeetingBaseResponse>({
    path,
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
    hostName: data.hostName,
  };
};

interface PostMeetingRequest {
  hostName: string;
  hostPassword: string;
  meetingName: string;
  availableMeetingDates: string[];
  meetingStartTime: string;
  meetingEndTime: string;
}

interface PostMeetingResponse {
  uuid: string;
  hostName: string;
}

export const postMeeting = async (request: PostMeetingRequest): Promise<PostMeetingResult> => {
  const data = await fetchClient<PostMeetingResponse>({
    path: '',
    method: 'POST',
    body: request,
    errorMessage: '약속을 생성하는데 문제가 발생했어요 :(',
    isAuthRequire: true,
  });

  return {
    uuid: data.uuid,
    userName: data.hostName,
  };
};

export const lockMeeting = async (uuid: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${uuid}/lock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('약속을 잠그는 중 에러가 발생했습니다.');
  }
};

export const unlockMeeting = async (uuid: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${uuid}/unlock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('잠긴 약속을 해제하는 중 에러가 발생했습니다.');
  }
};
