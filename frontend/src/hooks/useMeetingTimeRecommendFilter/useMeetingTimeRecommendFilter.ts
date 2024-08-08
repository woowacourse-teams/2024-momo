import { useState } from 'react';

import type { MeetingRecommend } from '@apis/mettingRecommend';

import { useGetMeetingRecommendsQuery } from '@stores/servers/meeting/queries';

type MeetingRecommendType = 'earliest' | 'longTerm';

const checkRecommendType = (type: string): type is MeetingRecommendType =>
  ['earliest', 'longTerm'].includes(type);

interface UseMeetingTimeRecommendFilterReturn {
  recommendType: MeetingRecommendType;
  handleChangeRecommendType: (type: string) => void;
  currentAttendeeNames: string[];
  checkSelectedAttendee: (attendeeName: string) => boolean;
  isSelectedAllAttendee: boolean;
  toggleAttendee: (attendeeName: string) => void;
  meetingTimeRecommends: MeetingRecommend[] | undefined;
}

type UseMeetingTimeRecommendFilterHook = (
  uuid: string,
  attendeeNames: string[],
) => UseMeetingTimeRecommendFilterReturn;

/**
 * useMeetingTimeRecommendFilter 훅은 약속 시간 추천과 관련된 필터링 로직을 관리합니다.
 *
 * @param {string} uuid - 약속의 고유 ID
 * @param {string[]} attendeeNames - 약속에 참여하는 사람들의 이름 배열
 * @returns {UseMeetingTimeRecommendFilterReturn} 약속 시간 추천 필터링 상태와 함수들을 반환합니다.
 *
 * * 아래는 useMeetingTimeRecommendFilter 훅 반환 타입에 대한 간단한 설명입니다. :)
 * @property {MeetingRecommendType} recommendType - 현재 선택된 추천 타입
 * @property {(type: string) => void} handleChangeRecommendType - 추천 타입을 변경하는 함수
 * @property {string[]} currentAttendeeNames - 현재 선택된 참여자 이름 배열
 * @property {(attendeeName: string) => boolean} checkSelectedAttendee - 특정 참여자가 선택되었는지 확인하는 함수
 * @property {boolean} isSelectedAllAttendee - 전체 참여자가 선택되었는지 여부
 * @property {(attendeeName: string) => void} toggleAttendee - 특정 참여자의 선택 상태를 토글하는 함수
 * @property {MeetingRecommend[] | undefined} meetingTimeRecommends - 약속 시간 추천 데이터
 */

const useMeetingTimeRecommendFilter: UseMeetingTimeRecommendFilterHook = (uuid, attendeeNames) => {
  const [recommendType, setRecommendType] = useState<MeetingRecommendType>('earliest');
  const [currentAttendeeNames, setCurrentAttendeeNames] = useState(attendeeNames);
  const { data: meetingTimeRecommends } = useGetMeetingRecommendsQuery({
    uuid,
    recommendType,
    currentAttendeeNames,
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
