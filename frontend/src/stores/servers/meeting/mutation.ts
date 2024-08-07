import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import type { MeetingInfo } from '@apis/meetings';
import { postMeeting } from '@apis/meetings';

import { saveAuthState } from '@utils/auth';

export const usePostMeetingMutation = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    uuid: '',
    userName: '',
  });

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      setMeetingInfo(responseData);
      saveAuthState(responseData.uuid, { isLoggedIn: true, userName: responseData.userName });
    },
  });
  return { mutation, meetingInfo };
};
