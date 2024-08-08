import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import type { MeetingInfo } from '@apis/meetings';
import { postMeeting } from '@apis/meetings';

export const usePostMeetingMutation = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { setIsLoggedIn, setUserName } = authContext.actions;

  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>({
    uuid: '',
    userName: '',
  });

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      const { uuid, userName } = responseData;
      setMeetingInfo(responseData);
      setIsLoggedIn(true);
      setUserName(userName);

      navigate(`/meeting/${uuid}/complete`);
    },
  });

  return { mutation, meetingInfo };
};
