import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface UserLoginRequest {
  uuid: string;
  request: {
    name: string;
    password: string;
  };
}

export const postUserLogin = async ({ uuid, request }: UserLoginRequest) => {
  const data = await fetchClient<string>({
    path: `/${uuid}/login`,
    method: 'POST',
    errorMessage: '로그인하는 도중 문제가 발생했습니다 :( 다시 시도해 주세요.',
    body: request,
    isAuthRequire: true,
  });

  return {
    userName: data,
  };
};

