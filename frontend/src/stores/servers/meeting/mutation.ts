import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { postMeeting } from '@apis/meetings';

export const usePostMeetingMutation = () => {
  const [data, setData] = useState<string>('');

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      setData(responseData.uuid);
    },
  });
  return { mutation, uuid: data };
};
