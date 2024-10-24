import { BASE_URL } from '@constants/api';

import { fetcher } from './_common/fetcher';

interface UserLoginRequest {
  uuid: string;
  request: {
    attendeeName: string;
    password: string;
  };
}

export const postUserLogin = async ({ uuid, request }: UserLoginRequest) => {
  const data = await fetcher.postWithResponse<string>({
    path: `/${uuid}/login`,
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
  await fetcher.post({ path: `${BASE_URL}/${uuid}/logout`, isAuthRequire: true });
};
