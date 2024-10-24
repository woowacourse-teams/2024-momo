import { useMutation } from '@tanstack/react-query';

import useRouter from '@hooks/useRouter/useRouter';

import { deleteFixedMeeting } from '@apis/meetings/confirms';

export const useCancelFixedMeetingMutation = (uuid: string) => {
  const { routeTo } = useRouter();

  return useMutation({
    mutationFn: () => deleteFixedMeeting(uuid),
    onSuccess: () => {
      routeTo(`/meeting/${uuid}`);
    },
  });
};
