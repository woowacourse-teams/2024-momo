import { useQuery } from '@tanstack/react-query';

import { getMeetingTimeRecommends } from '@apis/meetingRecommend';
import { getMeetingBase } from '@apis/meetings';
import { getMeetingMySchedule } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetMeetingQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meeting],
    queryFn: () => getMeetingBase(uuid),
    retry: 1,
  });

interface UseGetMeetingRecommendsQueryArgs {
  uuid: string;
  currentAttendeeNames: string[];
  recommendType: string;
}

export const useGetMeetingRecommendsQuery = ({
  uuid,
  currentAttendeeNames,
  recommendType,
}: UseGetMeetingRecommendsQueryArgs) =>
  useQuery({
    queryKey: [QUERY_KEY.meetingTimeRecommends, { currentAttendeeNames, recommendType }],
    queryFn: () =>
      getMeetingTimeRecommends({ uuid, recommendType, attendeeNames: currentAttendeeNames }),
    retry: 0,
    refetchOnWindowFocus: false,
  });

export const useGetMyScheduleQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meetingMySchedule],
    queryFn: () => getMeetingMySchedule(uuid),
    staleTime: 0,
  });
