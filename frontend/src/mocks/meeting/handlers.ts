import { HttpResponse, http } from 'msw';

import { API_URL } from '@constants/api';

import meetingAllSchedules from './data/meetingAllSchedules.json';
import meetingTableFrame from './data/meetingTableFrame.json';
import oneAttendeeSchedules from './data/oneAttendeeSchedule.json';

const meetingHandlers = [
  http.get(`${API_URL}/api/v1/meeting/550e8400`, () => {
    return HttpResponse.json(meetingTableFrame, { status: 200 });
  }),

  http.get(`${API_URL}/api/v1/meeting/*/schedules`, ({ request }) => {
    const url = new URL(request.url);
    const attendeeName = url.searchParams.get('attendeeName') || 'all';

    if (attendeeName === 'all') {
      return HttpResponse.json(meetingAllSchedules, { status: 200 });
    }
    return HttpResponse.json(oneAttendeeSchedules, { status: 200 });
  }),
];

export default meetingHandlers;
