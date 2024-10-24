import type { PropsWithChildren } from 'react';
import React from 'react';

import { Modal } from '..';
import { s_button, s_primary, s_secondary } from '../ConfirmModal/ConfirmModal.styles';
import type { ButtonPositionType } from '../Footer';
import type { ModalProps } from '../ModalContainer';

interface ConfirmModalProps extends ModalProps {
  title: string;
  buttonPosition?: ButtonPositionType;
  onConfirm: () => void;
  onSecondButtonClick: () => void;
}

export default function MeetingLockConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  onSecondButtonClick,
  title,
  position,
  size,
  children,
  buttonPosition = 'row',
}: PropsWithChildren<ConfirmModalProps>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position={position} size={size}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Main>{children}</Modal.Main>
      <Modal.Footer buttonPosition={buttonPosition}>
        <button onClick={onConfirm} css={[s_button, s_primary]}>
          약속을 잠그고 확정하러 갈게요
        </button>
        <button onClick={onSecondButtonClick} css={[s_button, s_secondary]}>
          조회만 하러 갈게요
        </button>
      </Modal.Footer>
    </Modal>
  );
}
