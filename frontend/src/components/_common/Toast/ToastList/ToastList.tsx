import { createPortal } from 'react-dom';

import useToast from '@hooks/useToast/useToast';

import ToastContainer from '../ToastContainer';
import { s_toastListContainer } from './ToastList.styles';

export default function ToastList() {
  const { toasts } = useToast();

  return createPortal(
    <div css={s_toastListContainer}>
      {toasts &&
        toasts.map(({ id, type, message, duration }) => (
          <ToastContainer key={id} type={type} message={message} duration={duration} />
        ))}
    </div>,
    document.body,
  );
}
