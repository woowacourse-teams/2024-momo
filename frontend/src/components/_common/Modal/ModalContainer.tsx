import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { s_backdrop, s_container, s_content, s_position, s_size } from './Modal.style';

export type ModalPositionType = 'center' | 'bottom';
export type ModalSizeType = 'small' | 'almostFull' | 'full';

export interface ModalProps {
  position: ModalPositionType;
  isOpen: boolean;
  onClose: () => void;
  size: ModalSizeType;
}

export default function ModalContainer({
  isOpen,
  onClose,
  size,
  position,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return createPortal(
    <div css={[s_container, s_position(position)]}>
      <div role="banner" css={s_backdrop} onClick={onClose}></div>
      <div css={[s_content, s_size(size)]}>{children}</div>
    </div>,
    document.body,
  );
}
