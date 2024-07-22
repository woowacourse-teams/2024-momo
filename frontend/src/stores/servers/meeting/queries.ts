import { useQuery } from '@tanstack/react-query';

import getMeeting from '@apis/getMeeting';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetMeetingQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY.meeting],
    queryFn: () => getMeeting(),
    retry: 1,
  });
