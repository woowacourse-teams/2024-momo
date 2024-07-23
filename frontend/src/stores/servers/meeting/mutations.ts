import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GetMeetingResponse } from '@apis/getMeeting';
import { postSchedule } from '@apis/schedule';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostScheduleMutation = (onSettledCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSchedule,
    onMutate: async (newSchedules) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.meeting] });

      const prevSchedules = queryClient.getQueryData([QUERY_KEY.meeting]);

      queryClient.setQueryData([QUERY_KEY.meeting], (prevData: GetMeetingResponse) => {
        const nextMeetingSchedules = {
          ...prevData,
          schedules: newSchedules,
        };

        return nextMeetingSchedules;
      });

      return { prevSchedules };
    },
    onSettled: () => {
      onSettledCallback();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting] });
    },
  });
};
