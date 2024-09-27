import { useState } from 'react';

export default function useConfirmModal() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onToggleConfirmModal = () => {
    setIsConfirmModalOpen((prev) => !prev);
  };

  return { isConfirmModalOpen, onToggleConfirmModal };
}
