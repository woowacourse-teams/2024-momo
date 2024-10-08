import { useContext } from 'react';

import { ToastContext } from '@contexts/ToastProvider';

const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('ToastContext를 사용할 수 없는 컴포넌트입니다.');
  }

  const { toasts, addToast } = toastContext;

  return { toasts, addToast };
};

export default useToast;
