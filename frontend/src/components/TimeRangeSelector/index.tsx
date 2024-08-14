import Dropdown from '@components/_common/Dropdown';

import type useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { s_dropdownContainer } from './TimeRangeSelector.styles';

export default function TimeRangeSelector({
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
}: ReturnType<typeof useTimeRangeDropdown>) {
  return (
    <div css={s_dropdownContainer}>
      <Dropdown
        value={startTime.value}
        onChange={(e) => handleStartTimeChange(e.target.value)}
        options={startTime.options}
      />
      ~
      <Dropdown
        value={endTime.value}
        onChange={(e) => handleEndTimeChange(e.target.value)}
        options={endTime.options}
      />
    </div>
  );
}
