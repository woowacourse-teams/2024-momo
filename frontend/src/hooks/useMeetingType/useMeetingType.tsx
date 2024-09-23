import { useState } from 'react';

import type { MeetingType } from '@apis/meetings';

export default function useMeetingType() {
  const [isChecked, setIsChecked] = useState(false);

  const meetingType: MeetingType = isChecked ? 'daysOnly' : 'dateTime';

  const handleToggleIsChecked = () => {
    setIsChecked((prev) => !prev);
  };

  return { meetingType, isChecked, handleToggleIsChecked };
}
