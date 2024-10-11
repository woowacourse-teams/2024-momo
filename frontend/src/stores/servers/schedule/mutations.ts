import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSchedule } from '@apis/schedules';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostScheduleMutation = (callback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSchedule,

    onSuccess: () => {
      callback?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingMySchedule] });
    },
  });
};
