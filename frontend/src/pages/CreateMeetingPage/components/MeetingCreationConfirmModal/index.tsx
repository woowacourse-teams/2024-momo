import ConfirmModal from '@components/_common/Modal/ConfirmModal';

import groupDates from '@utils/groupDates';

import {
  s_availableDateDescription,
  s_availableDatesContainer,
  s_description,
  s_descriptionContainer,
} from './MeetingCreationConfirmModal.styles';

interface MeetingCreationConfirmModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  onModalConfirmButtonClick: () => void;
  meetingName: string;
  hostName: string;
  selectedDates: string[];
  startTime: string;
  endTime: string;
  isOnlyDaysOptionChecked: boolean;
}

export default function MeetingCreationConfirmModal({
  isModalOpen,
  onModalClose,
  onModalConfirmButtonClick,
  meetingName,
  hostName,
  selectedDates,
  startTime,
  endTime,
  isOnlyDaysOptionChecked,
}: MeetingCreationConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isModalOpen}
      onClose={onModalClose}
      onConfirm={onModalConfirmButtonClick}
      position="center"
      size="small"
      title="입력하신 약속 정보를 확인해주세요."
    >
      <div css={s_descriptionContainer}>
        <p css={s_description}>
          <strong>약속명</strong> {meetingName}
        </p>
        <p css={s_description}>
          <strong>주최자</strong> {hostName}
        </p>
        {!isOnlyDaysOptionChecked && (
          <p css={s_description}>
            <strong>약속 시간</strong> {startTime} ~ {endTime}
          </p>
        )}
        <div css={s_availableDateDescription}>
          <strong>가능 날짜</strong>
          {groupDates(selectedDates).map(([monthYear, dates]) => {
            const [year, month] = monthYear.split('-');
            return (
              <div css={s_availableDatesContainer} key={monthYear}>
                <h3>
                  {year}년 {month}월
                </h3>
                <p>{dates.join(', ')}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ConfirmModal>
  );
}
