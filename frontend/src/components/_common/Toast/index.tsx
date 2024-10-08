import Check from '@assets/images/attendeeCheck.svg';
import Exclamation from '@assets/images/exclamation.svg';

import theme from '@styles/theme';

import {
  s_iconBackgroundColor,
  s_iconContainer,
  s_toastContainer,
  s_toastText,
} from './Toast.styles';
import type { ToastType } from './Toast.type';

interface ToastProps {
  isOpen: boolean;
  type: ToastType;
  message: string;
}

const iconMap: Record<ToastType, React.FC<React.SVGProps<SVGSVGElement>> | null> = {
  default: null,
  success: Check,
  warning: Exclamation,
};

// 토스트 컴포넌트는 UI를 보여주는 책임만 가질 수 있도록 최대한 책임을 분리하고 스토리북을 활용한 UI 테스트를 쉽게할 수 있도록 한다.(@해리)
export default function Toast({ isOpen, type = 'default', message }: ToastProps) {
  const ToastIcon = iconMap[type];

  return (
    <div css={s_toastContainer(isOpen)}>
      {type !== 'default' && (
        <div css={[s_iconContainer, s_iconBackgroundColor(type)]}>
          {ToastIcon && <ToastIcon width={16} height={16} stroke={theme.colors.white} />}
        </div>
      )}
      <p css={s_toastText}>{message}</p>
    </div>
  );
}
