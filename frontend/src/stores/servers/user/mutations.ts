import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import { postUserLogin, postUserLogout } from '@apis/users';

export const usePostLoginMutation = () => {
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const authContext = useContext(AuthContext);

  return useMutation({
    mutationFn: postUserLogin,
    onSuccess: (responseData) => {
      const { userName } = responseData;

      const { setIsLoggedIn, setUserName } = authContext.actions;

      setIsLoggedIn(true);
      setUserName(userName);
      navigate(`/meeting/${uuid}`);
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
