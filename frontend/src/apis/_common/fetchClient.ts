import getHeaders from './getHeaders';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOption {
  url: string;
  method: HTTPMethod;
  errorMessage?: string;
  body?: object;
  /**
   * @Yoonkyoungme
   * isAuthRequire: 인증이 필요한 API 요청인지를 나타내는 플래그
   * true로 설정하면 요청에 credentials: 'include'가 추가되어,
   * 서버에서 설정한 인증 쿠키(예: JWT)를 자동으로 포함시킨다.
   *
   * @default false
   */
  isAuthRequire?: boolean;
}

// TODO: TypeError: Failed to Fetch에 대한 에러 처리는 어떻게 할 예정인지.
export async function fetchClient<T>({
  url,
  method,
  errorMessage,
  body,
  isAuthRequire = false,
}: FetchOption) {
  const headers = getHeaders();
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
    credentials: isAuthRequire ? 'include' : 'omit',
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  // 현재 응답 결과로 받아오는 데이터가 모두 data로 감싸서 전달받는 형태이므로 아래와 같이 구현(@낙타)
  const data = await response.json();

  return data.data as T;
}
