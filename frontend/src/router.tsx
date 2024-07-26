import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import CreateMeetingPage from '@pages/CreateMeetingPage';
import MeetingLinkSharePage from '@pages/MeetingLinkSharePage';
import MeetingTimePickPage from '@pages/MeetingTimePickPage';

// TODO: 추후 라우팅 경로 다시 한 번 수정해야 함(@낙타)
const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
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
            path: 'create',
            element: <CreateMeetingPage />,
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
