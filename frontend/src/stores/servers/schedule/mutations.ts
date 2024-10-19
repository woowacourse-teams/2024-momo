import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import type { Mode } from 'types/schedule';

import { TimePickerUpdateStateContext } from '@contexts/TimePickerUpdateStateProvider';

import useRouter from '@hooks/useRouter/useRouter';
import useUuid from '@hooks/useUuid/useUuid';

import type { PostScheduleRequest } from '@apis/schedules';
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

// mode에 따라 mutation을 호출하는 함수
export const usePostScheduleByMode = (mode: Mode) => {
  const { routeTo } = useRouter();
  const { uuid } = useUuid();

  const { handleToggleIsTimePickerUpdate } = useContext(TimePickerUpdateStateContext);

  const { mutate: postScheduleMutateForEdit, isPending: isEditModePending } =
    usePostScheduleMutation(() => handleToggleIsTimePickerUpdate());

  const { mutate: postScheduleMutateForRegistration, isPending: isRegisterModePending } =
    usePostScheduleMutation(() => routeTo(`/meeting/${uuid}/viewer`));

  const submitSchedule = (scheduleRequestData: PostScheduleRequest) => {
    if (mode === 'register') {
      postScheduleMutateForRegistration(scheduleRequestData);
    } else {
      postScheduleMutateForEdit(scheduleRequestData);
    }
  };

  return { submitSchedule, isEditModePending, isRegisterModePending };
};
