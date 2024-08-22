import SadMomo from '@assets/images/sadMomo.svg';

import { s_container } from './UnconfirmedMessage.styles';

function UnconfirmedMessage() {
  return (
    <div css={s_container}>
      <SadMomo width="128" height="128" />
      <div>약속이 아직 확정되지 않았어요 :(</div>
    </div>
  );
}

export default UnconfirmedMessage;
