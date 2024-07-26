import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSchedule } from '@apis/postSchedule';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostScheduleMutation = (onSettledCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSchedule,
    // onMutate: async (newSchedules) => {
    //   await queryClient.cancelQueries({ queryKey: [QUERY_KEY.meeting, ''] });

    //   const prevSchedules = queryClient.getQueryData([QUERY_KEY.meeting, '']);

    //   return { prevSchedules };
    // },
    onSettled: () => {
      onSettledCallback();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting, ''] });
      ``;
    },
  });
};
