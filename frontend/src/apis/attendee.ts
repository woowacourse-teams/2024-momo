import { fetchClient } from './_common/fetchClient';

interface AttendeeLoginResponse {
  data: string;
}

interface AttendeeLoginRequest {
  uuid: string;
  request: {
    name: string;
    password: string;
  };
}

export const postAttendeeLogin = async ({ uuid, request }: AttendeeLoginRequest) => {
  const data = await fetchClient<AttendeeLoginResponse>({
    path: `/${uuid}/login`,
    method: 'POST',
    errorMessage: '로그인하는 도중 문제가 발생했습니다 :( 다시 시도해 주세요.',
    body: request,
  });

  return {
    userName: data.data,
  };
};
