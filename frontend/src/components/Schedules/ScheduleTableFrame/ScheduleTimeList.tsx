import { generateTimeRange } from '@components/Schedules/Schedules.util';

import { s_timeColumn, s_timeText } from '../ScheduleTableFrame/ScheduleTableFrame.style';

interface ScheduleTimeListProps {
  firstTime: string;
  lastTime: string;
}

export default function ScheduleTimeList({ firstTime, lastTime }: ScheduleTimeListProps) {
  const timeRange = generateTimeRange(firstTime, lastTime);

  return (
    <div css={s_timeColumn}>
      {timeRange.map((time, index) => (
        <span css={s_timeText} key={index}>
          {time}
        </span>
      ))}
    </div>
  );
}
