import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deleteFixedMeeting } from '@apis/meetings/confirms';

export const useCancelFixedMeetingMutation = (uuid: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteFixedMeeting(uuid),
    onSuccess: () => {
      navigate(`/meeting/${uuid}`);
    },
  });
};
