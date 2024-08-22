import { ResponseError } from '@utils/responseError';

import { BASE_URL } from '@constants/api';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOption {
  path: string;
  method: HTTPMethod;
  errorMessage?: string;
  body?: object;
  /**
   * @Yoonkyoungme
   * isAuthRequire: 인증이 필요한 API 요청인지를 나타내는 플래그
   * true로 설정하면 요청에 credentials: 'include'가 추가되어, 서버에서 설정한 인증 쿠키를 자동으로 포함시킨다.
   *
   * @default false
   */
  isAuthRequire?: boolean;
}

// TODO: TypeError: Failed to Fetch에 대한 에러 처리는 어떻게 할 예정인지.
const createFetchClient = (baseUrl: string) => {
  return async <T>({ path, method, body, isAuthRequire }: FetchOption): Promise<T> => {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
      credentials: isAuthRequire ? 'include' : 'omit',
    });

    if (response.status === 401) {
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    // 현재 응답 결과로 받아오는 데이터가 모두 data로 감싸서 전달받는 형태이므로 아래와 같이 구현(@낙타)
    const data = await response.json();

    if (!response.ok) {
      throw new ResponseError(data);
    }

    return data.data as T;
  };
};

export const fetchClient = createFetchClient(BASE_URL);
