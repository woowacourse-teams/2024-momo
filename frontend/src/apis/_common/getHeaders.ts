import { getCookie } from '@utils/cookies';

import { COOKIE_KEYS } from '@constants/cookies';

export default function getHeaders(): HeadersInit {
  const headers = { 'Content-type': 'application/json' };
  const token = getCookie(COOKIE_KEYS.token);

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers;
}
