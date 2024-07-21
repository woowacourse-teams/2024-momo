import { tableTexture } from '@components/TimePicker/TimePicker.styles';

import { styledTd } from './TimeSlot.styles';

interface TimeSlotProps {
  isSelected: boolean;
  isUpdate: boolean;
}

export default function TimeSlot({ isSelected, isUpdate }: TimeSlotProps) {
  return <td css={[tableTexture, styledTd(isSelected, isUpdate)]} />;
}
