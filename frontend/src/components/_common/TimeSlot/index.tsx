import { tdStyle } from './TimeSlot.styles';

interface TimeSlotProps {
  isSelected: boolean;
  isUpdate: boolean;
}

export default function TimeSlot({ isSelected, isUpdate }: TimeSlotProps) {
  return <td css={tdStyle(isSelected, isUpdate)} />;
}
