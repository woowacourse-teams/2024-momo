import { useNavigate } from 'react-router-dom';

import { Button } from '@components/_common/Buttons/Button';

import SadMomo from '@assets/images/sadMomo.svg';

import { s_container } from './UnconfirmedMessage.styles';

interface UnconfirmedMessageProps {
  uuid: string;
}
function UnconfirmedMessage({ uuid }: UnconfirmedMessageProps) {
  const navigate = useNavigate();

  const handleMeetingPageNavigate = () => {
    navigate(`/meeting/${uuid}`);
  };

  return (
    <div css={s_container}>
      <SadMomo width="128" height="128" />
      <div>약속이 아직 확정되지 않았어요 :(</div>
      <Button variant="primary" size="full" onClick={() => handleMeetingPageNavigate()}>
        약속 조회하러 가기
      </Button>
    </div>
  );
}

export default UnconfirmedMessage;
