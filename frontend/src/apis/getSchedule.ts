import { API_URL } from '@constants/api';

const getSchedule = async () => {
  const url = `${API_URL}/api/v1/schedule}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export default getSchedule;
