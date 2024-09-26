import { formatFullDate } from '@utils/date';

import type { MeetingTicketProps } from '../index';
import {
  s_attendeeNameTag,
  s_attendeeNamesContainer,
  s_container,
  s_meetingName,
  s_ticketInfoContainer,
  s_ticketInfoTitle,
} from './TicketInfo.styles';

export default function TicketInfo({ data }: MeetingTicketProps) {
  const {
    meetingName,
    availableAttendeeNames,
    startDate,
    startTime,
    startDayOfWeek,
    endDate,
    endTime,
    endDayOfWeek,
    type,
  } = data;

  const formattedStartFullDate = formatFullDate({ fullDate: startDate, dayOfWeek: startDayOfWeek });
  const formattedEndFullDate = formatFullDate({ fullDate: endDate, dayOfWeek: endDayOfWeek });

  const dateDisplay =
    startDate === endDate
      ? formattedStartFullDate
      : `${formattedStartFullDate} ~ ${formattedEndFullDate}`;

  return (
    <div css={s_container}>
      <div css={s_meetingName}>{meetingName}</div>

      <div css={s_ticketInfoContainer}>
        <div css={s_ticketInfoTitle}>날짜</div>
        <div>{dateDisplay}</div>
      </div>

      {type === 'DATETIME' && (
        <div css={s_ticketInfoContainer}>
          <div css={s_ticketInfoTitle}>시간</div>
          <div>
            {startTime} ~ {endTime}
          </div>
        </div>
      )}

      <div css={s_ticketInfoContainer}>
        <div css={s_ticketInfoTitle}>참여자 ({availableAttendeeNames.length}명)</div>
        <div css={s_attendeeNamesContainer}>
          {availableAttendeeNames.map((attendeeName) => (
            <div css={s_attendeeNameTag} key={attendeeName}>
              {attendeeName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
