import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

import type { ToastType } from '@components/_common/Toast/Toast.type';
import ToastList from '@components/_common/Toast/ToastList/ToastList';

interface ToastState {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastState[];
  addToast: ({ type, message, duration }: Omit<ToastState, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const checkAlreadyRenderedToast = (toastMessage: string) => {
    return toasts.find(({ message }) => message === toastMessage);
  };

  const removeToast = (toastId: number) => {
    setToasts((prevToasts) => prevToasts.filter(({ id }) => id !== toastId));
  };

  const addToast = ({ type, message, duration }: Omit<ToastState, 'id'>) => {
    if (checkAlreadyRenderedToast(message)) return;

    const toastId = Date.now();
    const newToastState = {
      id: toastId,
      type,
      message,
      duration,
    };

    setToasts((prevToasts) => [...prevToasts, newToastState]);
    setTimeout(() => {
      removeToast(toastId);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      <ToastList />
      {children}
    </ToastContext.Provider>
  );
}
