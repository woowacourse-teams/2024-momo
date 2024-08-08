import { useQuery } from '@tanstack/react-query';

import { getMeetingBase } from '@apis/meetings';
import { getMeetingTimeRecommends } from '@apis/mettingRecommend';

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
