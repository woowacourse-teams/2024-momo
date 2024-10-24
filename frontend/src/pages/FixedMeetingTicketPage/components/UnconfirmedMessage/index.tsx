import { Button } from '@components/_common/Buttons/Button';

import useRouter from '@hooks/useRouter/useRouter';

import QuestionMomoCharacter from '@assets/images/questionMomoCharacter.svg';

import { s_container } from './UnconfirmedMessage.styles';

interface UnconfirmedMessageProps {
  uuid: string;
}
function UnconfirmedMessage({ uuid }: UnconfirmedMessageProps) {
  const { routeTo } = useRouter();

  return (
    <div css={s_container}>
      <QuestionMomoCharacter width="128" height="128" />
      <div>약속이 아직 확정되지 않았어요 :(</div>
      <Button variant="primary" size="full" onClick={() => routeTo(`/meeting/${uuid}`)}>
        약속 조회하러 가기
      </Button>
    </div>
  );
}

export default UnconfirmedMessage;
