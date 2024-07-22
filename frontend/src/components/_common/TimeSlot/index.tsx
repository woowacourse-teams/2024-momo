import { styledTd } from './TimeSlot.styles';

interface TimeSlotProps {
  isSelected: boolean;
  isUpdate: boolean;
}

export default function TimeSlot({ isSelected, isUpdate }: TimeSlotProps) {
  return <td css={styledTd(isSelected, isUpdate)} />;
}
