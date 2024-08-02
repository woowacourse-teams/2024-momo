import getHeaders from './getHeaders';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOption {
  url: string;
  method: HTTPMethod;
  errorMessage?: string;
  body?: object;
  token?: string;
}

// TODO: TypeError: Failed to Fetch에 대한 에러 처리는 어떻게 할 예정인지.
export async function fetchClient<T>({ url, method, errorMessage, body }: FetchOption) {
  const headers = getHeaders();
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  // 현재 응답 결과로 받아오는 데이터가 모두 data로 감싸서 전달받는 형태이므로 아래와 같이 구현(@낙타)
  const data = await response.json();

  return data.data as T;
}
