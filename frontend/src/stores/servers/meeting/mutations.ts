import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { AuthContext } from '@contexts/AuthProvider';

import useRouter from '@hooks/useRouter/useRouter';

import { lockMeeting, postMeeting, unlockMeeting } from '@apis/meetings/meetings';

import { QUERY_KEY } from '@constants/queryKeys';

export const usePostMeetingMutation = () => {
  const { routeWithState } = useRouter();

  const authContext = useContext(AuthContext);
  const { setIsLoggedIn, setUserName } = authContext.actions;

  const mutation = useMutation({
    mutationFn: postMeeting,
    onSuccess: (responseData) => {
      const { uuid, userName } = responseData;

      setIsLoggedIn(true);
      setUserName(userName);

      routeWithState(`/meeting/${uuid}/complete`, { meetingInfo: responseData });
    },
  });

  return { mutation };
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
