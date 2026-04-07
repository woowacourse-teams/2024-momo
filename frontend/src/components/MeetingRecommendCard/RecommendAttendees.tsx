import { s_attendeeInfo } from './RecommendSchedule/RecommendSchedule.style';

interface RecommendAttendeesProps {
  totalAttendees: string[];
  recommendAttendees: string[];
}

export default function RecommendAttendees({
  totalAttendees,
  recommendAttendees,
}: RecommendAttendeesProps) {
  return (
    <span
      css={s_attendeeInfo}
    >{`${totalAttendees.length}명 중 ${recommendAttendees.length}명`}</span>
  );
}
