import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import AttendeeLoginPage from '@pages/AttendeeLoginPage';
import CreateMeetingPage from '@pages/CreateMeetingPage';
import FixedMeetingTicketPage from '@pages/FixedMeetingTicketPage';
import LandingPage from '@pages/LandingPage';
import MeetingConfirmPage from '@pages/MeetingConfirmPage';
import MeetingLinkSharePage from '@pages/MeetingLinkSharePage';
import MeetingRecommendPage from '@pages/MeetingRecommendPage';
import MeetingTimePickPage from '@pages/MeetingTimePickPage';
import NotFoundPage from '@pages/NotFoundPage';

const meetingRoutes: RouteObject[] = [
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: 'create',
    element: <CreateMeetingPage />,
  },
  {
    path: ':uuid',
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
        path: 'login',
        element: <AttendeeLoginPage />,
      },
      {
        path: 'recommend',
        element: <MeetingRecommendPage />,
      },
      {
        path: 'confirm',
        element: <MeetingConfirmPage />,
      },
      {
        path: 'complete',
        element: <MeetingLinkSharePage />,
      },
      {
        path: 'fixed-meeting-ticket',
        element: <FixedMeetingTicketPage />,
      },
    ],
  },
];

// * 속성으로 설정한 페이지 외 나머지 페이지는 NotFoundPage로 이동하도록 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'meeting',
        children: meetingRoutes,
      },
    ],
  },
]);

export default router;
