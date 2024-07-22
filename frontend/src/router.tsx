import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { UpdateStateProvider } from '@contexts/updateStateProvider';

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
            <UpdateStateProvider>
              <Join />
            </UpdateStateProvider>
          ),
        },
      ],
    },
  ],
  {},
);

export default router;
