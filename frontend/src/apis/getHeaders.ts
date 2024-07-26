export default function getHeaders(): Record<string, string> {
  const headers = { 'Content-type': 'application/json' };
  const token = localStorage.getItem('momoToken');

  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers;
}
