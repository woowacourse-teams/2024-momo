import { setupWorker } from 'msw/browser';

import meetingHandlers from './meeting/meetingHandlers';
import recommendHandlers from './meeting/recommendHandlers';

export const worker = setupWorker(...meetingHandlers, ...recommendHandlers);
