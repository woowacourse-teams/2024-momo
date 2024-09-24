import type { ReactNode } from 'react';

import { Modal } from '..';
import type { ButtonPositionType } from '../Footer';
import type { ModalProps } from '../ModalContainer';
import { s_button, s_primary, s_secondary } from './ConfirmModal.styles';

interface ConfirmModalProps extends ModalProps {
  title: string;
  buttonPosition?: ButtonPositionType;
  onConfirm: () => void;
  content: ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  position,
  size,
  content,
  buttonPosition = 'row',
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position={position} size={size}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Main>{content}</Modal.Main>
      <Modal.Footer buttonPosition={buttonPosition}>
        <button onClick={onClose} css={[s_button, s_secondary]}>
          취소
        </button>
        <button onClick={onConfirm} css={[s_button, s_primary]}>
          확인
        </button>
      </Modal.Footer>
    </Modal>
  );
}
