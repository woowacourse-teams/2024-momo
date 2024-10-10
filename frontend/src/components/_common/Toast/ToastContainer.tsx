import { useEffect, useState } from 'react';

import Toast from '.';
import type { ToastType } from './Toast.type';

interface ToastContainerProps {
  duration?: number;
  type: ToastType;
  message: string;
}

const TOAST_ANIMATION_DURATION_TIME = 500;

export default function ToastContainer({ type, message, duration = 3000 }: ToastContainerProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsOpen(false);
    }, duration - TOAST_ANIMATION_DURATION_TIME);

    return () => {
      clearTimeout(animationTimer);
    };
  }, [duration]);

  return <Toast isOpen={isOpen} type={type} message={message} />;
}
