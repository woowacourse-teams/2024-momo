export const INPUT_FIELD_PATTERN = {
  meetingName: /^.{1,10}$/, // 1~10자 사이의 모든 문자
  nickname: /^.{1,5}$/, // 1~5자 사이의 모든 문자,
  password: /^\d{4}$/, // 4자리 숫자
};

export const INPUT_RULES = {
  minimumLength: 1,
};

export const FIELD_DESCRIPTIONS = {
  meetingName: '약속 이름은 1~10자 사이로 입력해 주세요.',
  nickname: '1~5자 사이로 입력해 주세요.',
  password: '4자리 숫자로 입력해 주세요.',
  date: '날짜를 하나씩 클릭해 여러 날짜를 선택하거나\n시작일과 종료일을 클릭해 사이의 모든 날짜를 선택해 보세요',
};

export const FIELD_TITLES = {
  meetingName: '약속 정보 입력',
  meetingHostInfo: '약속 주최자 정보 입력',
  meetingDateTime: '약속 후보 날짜 선택',
  meetingTimeRange: '약속 시간 범위 선택',
  attendeeLogin: '내 정보 입력',
};

export const FIELD_LABELS = {
  meetingName: '약속 이름',
  nickname: '닉네임',
  password: '비밀번호',
  onlyDate: '날짜만 선택할래요',
};

export const FIELD_PLACEHOLDERS = {
  meetingName: '10자 이내의 약속 이름 입력',
  nickname: '5자 이내의 약속 이름 입력',
  password: '4자리 숫자 입력',
};

export const FIELD_ERROR_MESSAGES = {
  meetingName: '약속 이름은 1~10자 사이로 입력해 주세요.',
  nickname: '닉네임은 1~5자 사이로 입력해 주세요.',
  password: '비밀번호는 4자리 숫자로 입력해 주세요.',
};
