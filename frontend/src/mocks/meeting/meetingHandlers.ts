import { HttpResponse, http } from 'msw';

import type { PostMeetingRequest } from '@apis/meetings/meetings';

import { BASE_URL } from '@constants/api';

import meetingAllSchedules from './data/meetingAllSchedules.json';
import meetingSingleSchedule from './data/meetingSingleSchedule.json';
import meetingTableFrame from './data/meetingTableFrame.json';
import mySchedule from './data/mySchedule.json';

const meetingHandlers = [
  http.get(`${BASE_URL}/:uuid`, () => {
    // meetingTableFrame에서 type을 "DATETIME"으로 설정하면 시간 선택 표가 나오고, "DAYSONLY"로 설정하면 달력이 나옵니다.
    return HttpResponse.json(meetingTableFrame, { status: 200 });
  }),

  http.get(`${BASE_URL}/:uuid/schedules`, ({ request }) => {
    const url = new URL(request.url);
    const attendeeName = url.searchParams.get('attendeeName') || 'all';

    if (attendeeName === 'all') {
      return HttpResponse.json(meetingAllSchedules, { status: 200 });
    }
    return HttpResponse.json(meetingSingleSchedule, { status: 200 });
  }),

  http.get(`${BASE_URL}/:uuid/attendees/me/schedules`, () => {
    return HttpResponse.json(mySchedule, { status: 200 });
  }),

  // 요청한 type에 따라서 response 또한 같은 type이 설정되어야 하기 때문에 이와 같이 설정함(@낙타)
  http.post(`${BASE_URL}`, async ({ request }) => {
    const req = (await request.json()) as PostMeetingRequest;

    return HttpResponse.json(
      {
        data: {
          uuid: 'rAnDoMUuID12',
          meetingName: 'abc',
          hostName: '1234',
          availableDates: ['2024-09-25', '2024-09-26'],
          earliestTime: '00:00',
          lastTime: '00:00',
          type: req.type,
        },
      },
      { status: 200 },
    );
  }),
];

export default meetingHandlers;
