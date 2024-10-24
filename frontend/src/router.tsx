import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';
import UuidLayout from '@layouts/UuidLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

const AttendeeLoginPage = lazy(() => import('@pages/AttendeeLoginPage'));
const CreateMeetingPage = lazy(() => import('@pages/CreateMeetingPage'));
const FixedMeetingTicketPage = lazy(() => import('@pages/FixedMeetingTicketPage'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const MeetingConfirmPage = lazy(() => import('@pages/MeetingConfirmPage'));
const MeetingLinkSharePage = lazy(() => import('@pages/MeetingLinkSharePage'));
const MeetingRecommendPage = lazy(() => import('@pages/MeetingRecommendPage'));
const MeetingRegisterPage = lazy(() => import('@pages/MeetingRegisterPage'));
const MeetingViewerPage = lazy(() => import('@pages/MeetingViewerPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const MeetingEntrancePage = lazy(() => import('@pages/MeetingEntrancePage'));

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
    element: <UuidLayout />,
    children: [
      {
        index: true,
        element: <MeetingEntrancePage />,
      },
      {
        path: 'login',
        element: <AttendeeLoginPage />,
      },
      {
        path: 'register',
        element: <MeetingRegisterPage />,
      },
      {
        path: 'viewer',
        element: (
          <TimePickerUpdateStateProvider>
            <MeetingViewerPage />
          </TimePickerUpdateStateProvider>
        ),
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
