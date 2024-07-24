import { s_td } from './TimeSlot.styles';

interface TimeSlotProps {
  isSelected: boolean;
  isUpdate: boolean;
}

export default function TimeSlot({ isSelected, isUpdate }: TimeSlotProps) {
  return <td css={s_td(isSelected, isUpdate)} />;
}
