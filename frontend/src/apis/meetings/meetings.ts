import type { PostMeetingResult } from 'types/meeting';

import { ResponseError } from '@utils/responseError';

import { BASE_URL } from '@constants/api';

import { fetchClient } from '../_common/fetchClient';

export type MeetingType = 'DAYSONLY' | 'DATETIME';

interface MeetingBaseResponse {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  isLocked: boolean;
  hostName: string;
  availableDates: string[];
  attendeeNames: string[];
  type: MeetingType;
}

export interface MeetingBase {
  meetingName: string;
  firstTime: string;
  lastTime: string;
  isLocked: boolean;
  hostName: string;
  availableDates: string[];
  attendeeNames: string[];
  type: MeetingType;
}

export interface MeetingRequest {
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
  meetingName: string;
  earliestTime: string;
  lastTime: string;
  availableDates: string[];
}

export const getMeetingBase = async (uuid: string): Promise<MeetingBase> => {
  const path = `/${uuid}`;

  const data = await fetchClient<MeetingBaseResponse>({
    path,
    method: 'GET',
  });

  return {
    meetingName: data.meetingName,
    isLocked: data.isLocked,
    firstTime: data.firstTime,
    lastTime: data.lastTime,
    availableDates: data.availableDates,
    attendeeNames: data.attendeeNames,
    hostName: data.hostName,
    type: data.type,
  };
};

export interface PostMeetingRequest {
  hostName: string;
  hostPassword: string;
  meetingName: string;
  availableMeetingDates: string[];
  meetingStartTime: string;
  type: MeetingType;
  meetingEndTime: string;
}

interface PostMeetingResponse {
  uuid: string;
  hostName: string;
  meetingName: string;
  earliestTime: string;
  lastTime: string;
  availableDates: string[];
  type: MeetingType;
}

export const postMeeting = async (request: PostMeetingRequest): Promise<PostMeetingResult> => {
  const data = await fetchClient<PostMeetingResponse>({
    path: '',
    method: 'POST',
    body: request,
    isAuthRequire: true,
  });

  return {
    uuid: data.uuid,
    userName: data.hostName,
    meetingName: data.meetingName,
    firstTime: data.earliestTime,
    lastTime: data.lastTime,
    availableDates: data.availableDates,
  };
};

export const lockMeeting = async (uuid: string) => {
  const response = await fetch(`${BASE_URL}/${uuid}/lock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ResponseError(data);
  }
};

export const unlockMeeting = async (uuid: string) => {
  const response = await fetch(`${BASE_URL}/${uuid}/unlock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ResponseError(data);
  }
};
