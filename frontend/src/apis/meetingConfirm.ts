import { fetchClient } from './_common/fetchClient';

export interface ConfirmDates {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface PostMeetingConfirmRequest {
  uuid: string;
  requests: ConfirmDates;
}

export const postMeetingConfirm = async ({ uuid, requests }: PostMeetingConfirmRequest) => {
  const data = await fetchClient({
    path: `/${uuid}/confirm`,
    method: 'POST',
    errorMessage: '약속 시간 확정을 요청하는데 실패했어요 :(',
    body: requests,
    isAuthRequire: true,
  });

  return data;
};
