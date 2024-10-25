import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

import { AuthContext } from '@contexts/AuthProvider';
import { UuidContext } from '@contexts/UuidProvider';

import useRouter from '@hooks/useRouter/useRouter';

import { postUserLogin, postUserLogout } from '@apis/users';

export const usePostLoginMutation = () => {
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);
  const authContext = useContext(AuthContext);

  return useMutation({
    mutationFn: postUserLogin,
    onSuccess: (responseData) => {
      const { userName } = responseData;

      const { setIsLoggedIn, setUserName } = authContext.actions;

      setIsLoggedIn(true);
      setUserName(userName);
      routeTo(`/meeting/${uuid}/register`);
    },
  });
};

export const usePostLogoutMutation = () => {
  const authContext = useContext(AuthContext);
  const { setIsLoggedIn, setUserName } = authContext.actions;

  return useMutation({
    mutationFn: postUserLogout,
    onSuccess: () => {
      setIsLoggedIn(false);
      setUserName('');

      alert('로그아웃 되었습니다 :)');
    },
  });
};
