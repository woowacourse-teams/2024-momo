import { useQuery } from '@tanstack/react-query';

import { getConfirmedMeetingInfo } from '@apis/meetingConfirm';

import { QUERY_KEY } from '@constants/queryKeys';

export const useGetConfirmedMeetingInfoQuery = (uuid: string) =>
  useQuery({
    queryKey: [QUERY_KEY.confirmedMeetingInfo],
    queryFn: () => getConfirmedMeetingInfo(uuid),
    retry: 1,
  });
