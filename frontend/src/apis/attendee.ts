import { BASE_URL } from '@constants/api';

import { fetchClient } from './_common/fetchClient';

interface PostAttendeeLoginRequest {
  uuid: string;
  request: {
    name: string;
    password: string;
  };
}

interface PostAttendeeLoginResponse {
  token: string;
}

interface AttendeeLogin {
  token: string;
}

const postAttendeeLogin = async (props: PostAttendeeLoginRequest): Promise<AttendeeLogin> => {
  const { uuid, request } = props;
  const url = `${BASE_URL}/${uuid}/login`;

  const data = await fetchClient<PostAttendeeLoginResponse>({
    url,
    method: 'POST',
    errorMessage: '로그인 정보를 요청하는 중 문제가 발생했어요 :(',
    body: request,
  });

  return {
    token: data?.token,
  };
};

export default postAttendeeLogin;
