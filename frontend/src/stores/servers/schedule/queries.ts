import { useQuery } from '@tanstack/react-query';

import { getMeetingMySchedule, handleGetMeetingSchedules } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetSchedules = (uuid: string, selectedAttendee: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meetingSchedules, selectedAttendee],
    queryFn: () => handleGetMeetingSchedules({ uuid, attendeeName: selectedAttendee }),
    staleTime: 0,
  });

export const useGetMyScheduleQuery = (uuid: string, userName: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meetingMySchedule, { userName }],
    queryFn: () => getMeetingMySchedule(uuid),
    staleTime: 0,
  });
