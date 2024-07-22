import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSchedule } from '@apis/schedule';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting] });
    },
  });
};
