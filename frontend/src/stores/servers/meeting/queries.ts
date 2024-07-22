import { useQuery } from '@tanstack/react-query';

import getMeeting from '@apis/getMeeting';

export const useGetMeetingQuery = () =>
  useQuery({
    queryKey: ['getMeeting'],
    queryFn: () => getMeeting(),
    retry: 1,
  });
