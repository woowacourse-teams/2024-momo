import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PostMeetingResult } from 'types/meeting';

import { AuthContext } from '@contexts/AuthProvider';

import { lockMeeting, postMeeting, unlockMeeting } from '@apis/meetings/meetings';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostMeetingMutation = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { setIsLoggedIn, setUserName } = authContext.actions;

  const [meetingInfo, setMeetingInfo] = useState<PostMeetingResult>({
    uuid: '',
    userName: '',
    meetingName: '',
    firstTime: '',
    lastTime: '',
    availableDates: [],
  });

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      const { uuid, userName } = responseData;

      setMeetingInfo(responseData);
      setIsLoggedIn(true);
      setUserName(userName);

      navigate(`/meeting/${uuid}/complete`, { state: { meetingInfo: responseData } });
    },
  });

  return { mutation, meetingInfo };
};

export const useLockMeetingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lockMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting] });
    },
  });
};

export const useUnlockMeetingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlockMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meeting] });
    },
  });
};
