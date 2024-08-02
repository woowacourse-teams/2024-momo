import { useQuery } from '@tanstack/react-query';

import { getMeetingBase } from '@apis/meetings';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetMeetingQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.meeting],
    queryFn: () => getMeetingBase(uuid),
    retry: 1,
  });
