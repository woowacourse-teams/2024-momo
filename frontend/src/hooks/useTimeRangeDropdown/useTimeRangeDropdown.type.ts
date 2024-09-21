import type { Option } from '@components/_common/Dropdown';

export interface UseTimeRangeDropdownResult {
  startTime: {
    value: string;
    options: Option[];
  };
  endTime: {
    value: string;
    options: Option[];
  };
  handleStartTimeChange: (time: string) => void;
  handleEndTimeChange: (time: string) => void;
}
