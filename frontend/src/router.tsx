import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import Join from '@pages/MeetingTimePickPage';

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
              <Join />
            </TimePickerUpdateStateProvider>
          ),
        },
      ],
    },
  ],
  {},
);

export default router;
