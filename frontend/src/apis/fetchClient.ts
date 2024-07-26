import getHeaders from './getHeaders';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOption {
  url: string;
  method: HTTPMethod;
  errorMessage?: string;
  body?: object;
  token?: string;
}

export async function fetchClient<T>({ url, method, errorMessage, body }: FetchOption) {
  try {
    const headers = getHeaders();
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    // * 네트워크 off 환경에서 네트워크 요청을 보내면, 해당 catch문에서 에러를 잡게 됩니다.
    // * off 환경이라 서버에 요청이 가지 않기 때문이죠 :) (@해리)
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
