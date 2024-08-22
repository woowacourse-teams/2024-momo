import Text from '@components/_common/Text';

import Information from '@assets/images/information.svg';

import { s_percentage, s_percentageContainer, s_pinkProgressiveBar } from '../Schedules.styles';
import { s_infoTextContainer, s_scheduleOverviewContainer } from './ScheduleOverview.styles';

interface ScheduleOverviewProps {
  selectedAttendee: string;
}

export default function ScheduleOverview({ selectedAttendee }: ScheduleOverviewProps) {
  return (
    <div css={s_scheduleOverviewContainer}>
      {selectedAttendee === '' ? (
        <Text typo="bodyMedium">
          <Text.Accent text="전체 " />
          약속 참여자들의 일정을 확인하고 있어요
        </Text>
      ) : (
        <Text typo="bodyMedium">
          <Text.Accent text={selectedAttendee} />
          님의 일정을 확인하고 있어요
        </Text>
      )}
      <div css={s_infoTextContainer}>
        <Information width="12" height="12" />
        <Text variant="caption" typo="captionLight">
          {selectedAttendee === ''
            ? '시간을 클릭하여 참여할 수 있는 참여자들을 확인해 보세요'
            : '나의 약속 참여 시간과 비교해 보세요'}
        </Text>
      </div>
      <section>
        <div css={s_pinkProgressiveBar}></div>
        <div css={s_percentageContainer}>
          <p css={s_percentage}>0%</p>
          <p css={s_percentage}>100%</p>
        </div>
      </section>
    </div>
  );
}
