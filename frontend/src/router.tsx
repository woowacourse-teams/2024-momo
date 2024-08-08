import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import AttendeeLoginPage from '@pages/AttendeeLoginPage/AttendeeLoginPage';
import CreateMeetingPage from '@pages/CreateMeetingPage';
import MeetingConfirmPage from '@pages/MeetingConfirmPage';
import MeetingLinkSharePage from '@pages/MeetingLinkSharePage';
import MeetingRecommendPage from '@pages/MeetingRecommendPage';
import MeetingTimePickPage from '@pages/MeetingTimePickPage';

// TODO: 추후 라우팅 경로 다시 한 번 수정해야 함(@낙타)
const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <CreateMeetingPage />,
      },
      {
        path: 'meeting',
        children: [
          {
            path: ':uuid',
            element: (
              <TimePickerUpdateStateProvider>
                <MeetingTimePickPage />
              </TimePickerUpdateStateProvider>
            ),
          },
          {
            path: ':uuid/login',
            element: <AttendeeLoginPage />,
          },
          {
            path: ':uuid/recommend',
            element: <MeetingRecommendPage />,
          },
          {
            path: ':uuid/confirm',
            element: <MeetingConfirmPage />,
          },
          {
            path: 'complete',
            element: <MeetingLinkSharePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
