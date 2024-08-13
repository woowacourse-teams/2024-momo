import { useParams } from 'react-router-dom';

import { useGetConfirmedMeetingInfoQuery } from '@stores/servers/confirm/queries';

export default function TicketInfo() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { data } = useGetConfirmedMeetingInfoQuery(uuid);

  if (!data) {
    return null;
  }

  const {
    meetingName,
    availableAttendeeNames,
    startDate,
    startTime,
    startDayOfWeek,
    endDate,
    endTime,
    endDayOfWeek,
  } = data;

  console.log(data);
  return (
    <div>
      <div>{meetingName}</div>

      <div>
        <div>날짜</div>
        <div>
          <span>
            {startDate}({startDayOfWeek})부터
          </span>
          <span>
            {endDate}({endDayOfWeek})까지
          </span>
        </div>
      </div>

      <div>
        <div>시간</div>
        <div>{`${startTime} ~ ${endTime}`}</div>
      </div>

      <div>
        <div>참여자 ({availableAttendeeNames.length}명)</div>
        {availableAttendeeNames.map((attendeeName) => (
          <div key={attendeeName}>{attendeeName}</div>
        ))}
      </div>
    </div>
  );
}
