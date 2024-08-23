import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@constants/api';

import earliestAllAttendeeSchedules from './data/earliestAllAttendeeSchedules.json';
import earliestPartialAttendeeSchedules from './data/earliestPartialAttendeeSchedules.json';
import longTermAllAttendeeSchedules from './data/longTermAllAttendeeSchedules.json';
import longTermPartialAttendeeSchedules from './data/longTermPartialAttendeeSchedules.json';
import meetingAttendees from './data/meetingAttendees.json';

const recommendHandlers = [
  http.get(`${BASE_URL}/:uuid/attendees`, () => {
    return HttpResponse.json(meetingAttendees, { status: 200 });
  }),

  http.get(`${BASE_URL}/:uuid/recommended-schedules`, ({ request }) => {
    const url = new URL(request.url);
    const recommendType = url.searchParams.get('recommendType');
    const attendeeNames = url.searchParams.get('attendeeNames')?.split(',');

    const isAllAttendees = attendeeNames?.length === 8; // 전체 참여자 수가 8명이라고 가정

    if (isAllAttendees && recommendType === 'earliest') {
      return HttpResponse.json(earliestAllAttendeeSchedules, { status: 200 });
    }
    if (isAllAttendees && recommendType === 'longTerm') {
      return HttpResponse.json(longTermAllAttendeeSchedules, { status: 200 });
    }

    if (!isAllAttendees && recommendType === 'earliest') {
      return HttpResponse.json(earliestPartialAttendeeSchedules, { status: 200 });
    }
    if (!isAllAttendees && recommendType === 'longTerm') {
      return HttpResponse.json(longTermPartialAttendeeSchedules, { status: 200 });
    }
  }),
];

export default recommendHandlers;
