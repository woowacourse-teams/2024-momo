import { ResponseError } from '@utils/responseError';

import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface UserLoginRequest {
  uuid: string;
  request: {
    attendeeName: string;
    password: string;
  };
}

export const postUserLogin = async ({ uuid, request }: UserLoginRequest) => {
  const data = await fetchClient<string>({
    path: `/${uuid}/login`,
    method: 'POST',
    body: request,
    isAuthRequire: true,
  });

  return {
    userName: data,
  };
};

/**
 * 응답 데이터가 비어 있으므로 fetchClient 함수 사용 불가하여 fetch 함수를 직접 사용
 * TODO: 응답 데이터가 없을 때도 대응 가능한 fetchClient 함수를 만들어야 함
 */
export const postUserLogout = async (uuid: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${uuid}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();

      throw new ResponseError(data);
    }
  } catch (error) {
    console.error('로그아웃 중 문제가 발생했습니다:', error);
    throw error;
  }
};
