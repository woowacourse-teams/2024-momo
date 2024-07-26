import { API_URL } from '@constants/api';

interface PostAttendeeLoginRequest {
  uuid: string;
  request: {
    name: string;
    password: string;
  };
}

interface PostAttendeeLoginResponse {
  data: {
    token: string;
  };
}

const postAttendeeLogin = async (
  props: PostAttendeeLoginRequest,
): Promise<PostAttendeeLoginResponse> => {
  const { uuid, request } = props;
  const url = `${API_URL}/api/v1/login/${uuid}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export default postAttendeeLogin;
