export const INPUT_FIELD_PATTERN = {
  meetingName: /^.{1,10}$/, // 1~10자 사이의 모든 문자
  nickname: /^.{1,5}$/, // 1~5자 사이의 모든 문자,
  password: /^\d{4}$/, // 4자리 숫자
};

export const FIELD_DESCRIPTIONS = {
  meetingName: '약속 이름은 1~10자 사이로 입력해 주세요.',
  nickname: '닉네임은 1~5자 사이로 입력해 주세요.',
  password: '비밀번호는 4자리 숫자로 입력해 주세요.',
};
