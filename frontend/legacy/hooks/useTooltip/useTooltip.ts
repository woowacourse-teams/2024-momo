import { useCallback, useState } from 'react';

interface TooltipState {
  isVisible: boolean;
  targetRect: DOMRect | null;
}

const useTooltip = () => {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    isVisible: false,
    targetRect: null,
  });

  const showTooltip = useCallback((targetRect: DOMRect) => {
    setTooltipState({
      isVisible: true,
      targetRect,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipState({ isVisible: false, targetRect: null });
  }, []);

  return { tooltipState, showTooltip, hideTooltip };
};

export default useTooltip;
