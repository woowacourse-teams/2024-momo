import { useQuery } from '@tanstack/react-query';

import getMeetingFrame from '@apis/getMeetingFrame';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetMeetingQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meeting],
    queryFn: () => getMeetingFrame(uuid),
    retry: 1,
  });
