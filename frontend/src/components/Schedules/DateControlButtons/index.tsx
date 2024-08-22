import { s_datesControlButton, s_datesControlButtonContainer } from './DateControlButtons.styles';

interface DateControlButtons {
  decreaseDatePage: () => void;
  increaseDatePage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export default function DateControlButtons({
  decreaseDatePage,
  increaseDatePage,
  isFirstPage,
  isLastPage,
}: DateControlButtons) {
  return (
    <div css={s_datesControlButtonContainer}>
      <button css={s_datesControlButton} onClick={() => decreaseDatePage()} disabled={isFirstPage}>
        {'<'}
      </button>
      <button css={s_datesControlButton} onClick={() => increaseDatePage()} disabled={isLastPage}>
        {'>'}
      </button>
    </div>
  );
}
