import { setupWorker } from 'msw/browser';

import meetingHandlers from './meeting/handlers';

export const worker = setupWorker(...meetingHandlers);
