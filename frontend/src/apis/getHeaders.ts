import { getCookie } from '@utils/cookies';

export default function getHeaders(): Record<string, string> {
  const headers = { 'Content-type': 'application/json' };
  const token = getCookie('token');

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers;
}
