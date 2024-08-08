import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getMeetingTimeRecommends } from '@apis/mettingRecommend';

import { QUERY_KEY } from '@constants/queryKeys';

type MeetingRecommendType = 'earliest' | 'longTerm';

const checkRecommendType = (type: string): type is MeetingRecommendType =>
  ['earliest', 'longTerm'].includes(type);

const useMeetingTimeRecommendFilter = (uuid: string, attendeeNames: string[]) => {
  const [recommendType, setRecommendType] = useState<MeetingRecommendType>('earliest');
  const [currentAttendeeNames, setCurrentAttendeeNames] = useState(attendeeNames);

  const { data: meetingTimeRecommends } = useQuery({
    queryKey: [QUERY_KEY.meetingTimeRecommends, { currentAttendeeNames, recommendType }],
    queryFn: () =>
      getMeetingTimeRecommends({ uuid, recommendType, attendeeNames: currentAttendeeNames }),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const isSelectedAllAttendee = currentAttendeeNames.length === attendeeNames.length;
  const checkSelectedAttendee = (attendeeName: string) =>
    currentAttendeeNames.includes(attendeeName);

  const handleChangeRecommendType = (type: string) => {
    if (!checkRecommendType(type) || recommendType === type) return;
    setRecommendType(type);
  };

  const toggleAttendee = (attendeeName: string) => {
    if (attendeeName === '전체' && isSelectedAllAttendee) return;
    if (attendeeName === '전체') {
      setCurrentAttendeeNames(attendeeNames);
      return;
    }

    setCurrentAttendeeNames((prev) => {
      return prev.includes(attendeeName)
        ? prev.filter((name) => name !== attendeeName)
        : [...prev, attendeeName];
    });
  };

  return {
    recommendType,
    handleChangeRecommendType,
    currentAttendeeNames,
    checkSelectedAttendee,
    isSelectedAllAttendee,
    toggleAttendee,
    meetingTimeRecommends,
  };
};

export default useMeetingTimeRecommendFilter;
