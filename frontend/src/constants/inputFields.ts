export const INPUT_FIELD_RULES = {
  meetingName: {
    minLength: 1,
    maxLength: 10,
  },
  nickname: {
    minLength: 1,
    maxLength: 5,
  },
  password: {
    minLength: 1,
    maxLength: 10,
    pattern: /^[a-zA-Z0-9!@#$%]+$/,
  },
};

export const FIELD_DESCRIPTIONS = {
  meetingName: '약속 이름은 1~10자 사이로 입력해 주세요.',
  nickname: '닉네임을 1~5자 사이로 입력해 주세요.',
  password:
    '비밀번호를 1~10자 사이로 입력해 주세요.\n사용 가능한 문자는 알파벳, 숫자, 특수문자(!@#$%)입니다.',
};
