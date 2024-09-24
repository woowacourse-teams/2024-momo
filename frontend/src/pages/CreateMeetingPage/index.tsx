import { css } from '@emotion/react';
import type { DateInfo } from 'types/calendar';

import RangeDate from '@components/MeetingCalendar/Date/RangeDate';
import SingleDate from '@components/MeetingCalendar/Date/SingleDate';
import MeetingCalendarHeader from '@components/MeetingCalendar/Header';
import MeetingCalendarWeekdays from '@components/MeetingCalendar/Weekdays';
import TimeRangeSelector from '@components/TimeRangeSelector';
import { Button } from '@components/_common/Buttons/Button';
import Calendar from '@components/_common/Calendar';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';
import ConfirmModal from '@components/_common/Modal/ConfirmModal';

import useConfirmModal from '@hooks/useConfirmModal/useConfirmModal';
import useDateSelect from '@hooks/useDateSelect/useDateSelect';
import useInput from '@hooks/useInput/useInput';
import useMeetingType from '@hooks/useMeetingType/useMeetingType';
import { INITIAL_END_TIME, INITIAL_START_TIME } from '@hooks/useTimeRangeDropdown/constants';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { usePostMeetingMutation } from '@stores/servers/meeting/mutation';

import groupDates from '@utils/groupDates';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_PATTERN } from '@constants/inputFields';

import {
  s_availableDateDescription,
  s_availableDatesContainer,
  s_confirmContainer,
  s_description,
  s_descriptionContainer,
  s_formContainer,
} from './CreateMeetingPage.styles';

export default function CreateMeetingPage() {
  const { isConfirmModalOpen, onToggleConfirmModal } = useConfirmModal();

  const { mutation: postMeetingMutation } = usePostMeetingMutation();

  const {
    value: meetingName,
    onValueChange: handleMeetingNameChange,
    errorMessage: meetingNameErrorMessage,
  } = useInput({
    pattern: INPUT_FIELD_PATTERN.meetingName,
    errorMessage: FIELD_DESCRIPTIONS.meetingName,
  });

  const {
    value: hostName,
    onValueChange: handleHostNameChange,
    errorMessage: hostNameErrorMessage,
  } = useInput({
    pattern: INPUT_FIELD_PATTERN.nickname,
    errorMessage: FIELD_DESCRIPTIONS.nickname,
  });

  const {
    value: hostPassword,
    onValueChange: handleHostPasswordChange,
    errorMessage: hostPasswordError,
  } = useInput({
    pattern: INPUT_FIELD_PATTERN.password,
    errorMessage: FIELD_DESCRIPTIONS.password,
  });

  const {
    selectedDates,
    handleSelectedDates,
    hasDate,
    dateSelectMode,
    checkIsRangeStartDate,
    checkIsRangeEndDate,
    isAllRangeSelected,
    toggleDateSelectMode,
  } = useDateSelect();

  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = useTimeRangeDropdown();
  const { meetingType, isChecked, handleToggleIsChecked } = useMeetingType();

  const isFormValid = () => {
    const errorMessages = [meetingNameErrorMessage, hostNameErrorMessage, hostPasswordError];
    const hasErrors = errorMessages.some((errorMessage) => errorMessage !== null);

    if (hasErrors) {
      return false;
    }

    const requiredFields = [meetingName, hostName, hostPassword];
    const areRequiredFieldsFilled = requiredFields.every((field) => field !== '');
    const areDatesSelected = selectedDates.length > 0;
    const isAllFieldsFilled = areRequiredFieldsFilled && areDatesSelected;

    return isAllFieldsFilled;
  };

  const handleMeetingCreateButtonClick = () => {
    postMeetingMutation.mutate({
      hostName: hostName,
      hostPassword: hostPassword,
      meetingName: meetingName,
      availableMeetingDates: selectedDates,
      meetingStartTime: isChecked ? '00:00' : startTime.value,
      // 시간상 24시는 존재하지 않기 때문에 백엔드에서 오류가 발생. 따라서 오전 12:00으로 표현하지만, 서버에 00:00으로 전송(@낙타)
      meetingEndTime: isChecked
        ? '00:00'
        : endTime.value === INITIAL_END_TIME
          ? INITIAL_START_TIME
          : endTime.value,
      type: meetingType,
    });
  };

  const renderDate = (dateInfo: DateInfo, today: Date) => {
    return dateSelectMode === 'single' ? (
      <SingleDate
        key={dateInfo.key}
        dateInfo={dateInfo}
        today={today}
        hasDate={hasDate}
        onDateClick={handleSelectedDates}
      />
    ) : (
      <RangeDate
        key={dateInfo.key}
        dateInfo={dateInfo}
        today={today}
        hasDate={hasDate}
        onDateClick={handleSelectedDates}
        isRangeStart={checkIsRangeStartDate(dateInfo.value)}
        isRangeEnd={checkIsRangeEndDate(dateInfo.value)}
        isAllRangeSelected={isAllRangeSelected}
      />
    );
  };

  return (
    <div>
      {/* 추후 form 태그로 수정 예정 (@Largopie) */}
      <div css={s_formContainer}>
        <Field>
          <Field.Label id="약속이름" labelText="약속 이름" />
          <Field.Description description={FIELD_DESCRIPTIONS.meetingName} />
          <Input
            id="약속이름"
            value={meetingName}
            onChange={handleMeetingNameChange}
            autoComplete="off"
          />
          <Field.ErrorMessage errorMessage={meetingNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="닉네임" labelText="닉네임" />
          <Field.Description description={FIELD_DESCRIPTIONS.nickname} />
          <Input id="닉네임" value={hostName} onChange={handleHostNameChange} />
          <Field.ErrorMessage errorMessage={hostNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="비밀번호" labelText="비밀번호" />
          <Field.Description description={FIELD_DESCRIPTIONS.password} />
          <Input
            type="number"
            id="비밀번호"
            inputMode="numeric"
            pattern="[0-9]*"
            value={hostPassword}
            onChange={handleHostPasswordChange}
          />
          <Field.ErrorMessage errorMessage={hostPasswordError} />
        </Field>

        <Field>
          <Field.Label id="날짜선택" labelText="약속 날짜 선택" />
          <Calendar>
            <Calendar.Header
              render={({
                currentYear,
                currentMonth,
                moveToNextMonth,
                moveToPrevMonth,
                isCurrentMonth,
              }) => (
                <MeetingCalendarHeader
                  currentYear={currentYear}
                  currentMonth={currentMonth}
                  moveToNextMonth={moveToNextMonth}
                  moveToPrevMonth={moveToPrevMonth}
                  isCurrentMonth={isCurrentMonth}
                  dateSelectMode={dateSelectMode}
                  toggleDateSelectMode={toggleDateSelectMode}
                />
              )}
            />
            <Calendar.WeekDays
              render={(weekdays) => <MeetingCalendarWeekdays weekdays={weekdays} />}
            />
            <Calendar.Body renderDate={renderDate} />
          </Calendar>
        </Field>

        {/* 공통 컴포넌트가 merge 되면 수정 예정 */}
        <div
          css={css`
            display: flex;
            gap: 0.2rem;
          `}
        >
          <input
            onChange={handleToggleIsChecked}
            id="meetingType"
            type="checkbox"
            checked={isChecked}
          />
          <label htmlFor="meetingType">날짜만 선택할래요</label>
        </div>

        {!isChecked && (
          <Field>
            <Field.Label id="약속시간범위선택" labelText="약속 시간 범위 선택" />
            <TimeRangeSelector
              startTime={startTime}
              endTime={endTime}
              handleStartTimeChange={handleStartTimeChange}
              handleEndTimeChange={handleEndTimeChange}
            />
          </Field>
        )}

        <div css={s_confirmContainer}>
          <Button
            variant="primary"
            size="m"
            onClick={onToggleConfirmModal}
            disabled={!isFormValid()}
          >
            약속 생성하기
          </Button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={onToggleConfirmModal}
        position="center"
        size="small"
        title="입력하신 약속 정보를 확인해주세요."
        onConfirm={handleMeetingCreateButtonClick}
      >
        <div css={s_descriptionContainer}>
          <p css={s_description}>
            <strong>약속명</strong>
            {meetingName}
          </p>
          <p css={s_description}>
            <strong>주최자</strong>
            {hostName}
          </p>
          {!isChecked && (
            <p css={s_description}>
              <strong>약속 시간</strong>
              {startTime.value} ~ {endTime.value}
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
                  <span>{dates.join(', ')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
}
