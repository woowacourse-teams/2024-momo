import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from './layouts/GlobalLayout';
import Join from './pages/MeetingTimePickPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          index: true,
          element: <Join />,
        },
      ],
    },
  ],
  {},
);

export default router;
