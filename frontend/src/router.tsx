import type { ComponentType } from 'react';
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import GlobalLayout from '@layouts/GlobalLayout';

import { TimePickerUpdateStateProvider } from '@contexts/TimePickerUpdateStateProvider';

import PageMoveLoading from '@components/_common/PageMoveLoading';

const AttendeeLoginPage = lazy(() => import('@pages/AttendeeLoginPage'));
const CreateMeetingPage = lazy(() => import('@pages/CreateMeetingPage'));
const FixedMeetingTicketPage = lazy(() => import('@pages/FixedMeetingTicketPage'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const MeetingConfirmPage = lazy(() => import('@pages/MeetingConfirmPage'));
const MeetingLinkSharePage = lazy(() => import('@pages/MeetingLinkSharePage'));
const MeetingRecommendPage = lazy(() => import('@pages/MeetingRecommendPage'));
const MeetingTimePickPage = lazy(() => import('@pages/MeetingTimePickPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

const SuspenseWrapper = (Component: ComponentType) => (
  <Suspense fallback={<PageMoveLoading />}>
    <Component />
  </Suspense>
);
const meetingRoutes: RouteObject[] = [
  {
    index: true,
    element: SuspenseWrapper(LandingPage),
  },
  {
    path: 'create',
    element: SuspenseWrapper(CreateMeetingPage),
  },
  {
    path: ':uuid',
    children: [
      {
        index: true,
        element: (
          <TimePickerUpdateStateProvider>
            {SuspenseWrapper(MeetingTimePickPage)}
          </TimePickerUpdateStateProvider>
        ),
      },
      {
        path: 'login',
        element: SuspenseWrapper(AttendeeLoginPage),
      },
      {
        path: 'recommend',
        element: SuspenseWrapper(MeetingRecommendPage),
      },
      {
        path: 'confirm',
        element: SuspenseWrapper(MeetingConfirmPage),
      },
      {
        path: 'complete',
        element: SuspenseWrapper(MeetingLinkSharePage),
      },
      {
        path: 'fixed-meeting-ticket',
        element: SuspenseWrapper(FixedMeetingTicketPage),
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
        element: SuspenseWrapper(NotFoundPage),
      },
      {
        index: true,
        element: SuspenseWrapper(LandingPage),
      },
      {
        path: 'meeting',
        children: meetingRoutes,
      },
    ],
  },
]);

export default router;
