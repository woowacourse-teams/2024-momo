import { useMutation } from '@tanstack/react-query';

import { postSchedule } from '@apis/schedule';

export const usePostScheduleMutation = () =>
  useMutation({
    mutationFn: postSchedule,
  });
