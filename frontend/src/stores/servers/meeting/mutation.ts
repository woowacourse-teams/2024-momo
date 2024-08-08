import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { MeetingInfo } from '@apis/meetings';
import { postMeeting } from '@apis/meetings';

import { saveAuthState } from '@utils/auth';

export const usePostMeetingMutation = () => {
  const navigate = useNavigate();

  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    uuid: '',
    userName: '',
  });

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      const { uuid, userName } = responseData;
      console.log(uuid);
      setMeetingInfo(responseData);
      saveAuthState(uuid, { isLoggedIn: true, userName });
      navigate(`/meeting/${uuid}/complete`);
    },
  });

  return { mutation, meetingInfo };
};
