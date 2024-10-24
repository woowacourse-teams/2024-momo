import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import useErrorState from '@hooks/useErrorState/useErrorState';
import useToast from '@hooks/useToast/useToast';

export default function ErrorToastNotifier({ children }: PropsWithChildren) {
  const error = useErrorState();
  const { addToast } = useToast();

  const addToastCallbackRef = useRef<
    (({ type, message, duration }: Parameters<typeof addToast>[0]) => void) | null
  >(null);
  addToastCallbackRef.current = addToast;

  useEffect(() => {
    if (!error || !addToastCallbackRef.current) return;

    addToastCallbackRef.current({ type: 'warning', message: error.message, duration: 3000 });
  }, [error]);

  return children;
}
