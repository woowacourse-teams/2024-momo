import { useQuery } from '@tanstack/react-query';

import { handleGetMeetingSchedules } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetSchedules = (uuid: string, selectedAttendee: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meetingSchedules, selectedAttendee],
    queryFn: () => handleGetMeetingSchedules({ uuid, attendeeName: selectedAttendee }),
    staleTime: 0,
  });
