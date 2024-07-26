import { useQuery } from '@tanstack/react-query';

import getMeeting from '@apis/meetings';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetMeetingQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meeting],
    queryFn: () => getMeeting(uuid),
    retry: 1,
  });
