import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import CreateMeetingPage from '@pages/CreateMeetingPage';
import MeetingTimePickPage from '@pages/MeetingTimePickPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          index: true,
          element: (
            <TimePickerUpdateStateProvider>
              <MeetingTimePickPage />
            </TimePickerUpdateStateProvider>
          ),
        },
        {
          path: 'create-meeting',
          element: <CreateMeetingPage />,
        },
      ],
    },
  ],
  {},
);

export default router;
