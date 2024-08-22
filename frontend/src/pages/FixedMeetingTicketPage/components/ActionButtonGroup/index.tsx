import { useParams } from 'react-router-dom';
import type { GetConfirmedMeetingInfoResponse } from '@apis/meetingConfirm';

import { useCancelFixedMeetingMutation } from '@stores/servers/confirm/mutations';

import CancelIcon from '@assets/images/cancel.svg';
import KakaoIcon from '@assets/images/kakao.svg';

import {
  s_buttonText,
  s_cancelCircleButton,
  s_container,
  s_kakaoCircleButton,
} from './ActionButtonGroup.styles';

function ActionButtonGroup() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;
interface ActionButtonGroupProps {
  uuid: string;
  data: GetConfirmedMeetingInfoResponse;
}

function ActionButtonGroup({ uuid, data }: ActionButtonGroupProps) {

  const { mutate: cancelFixedMeeting } = useCancelFixedMeetingMutation(uuid);

  const handleCancelFixedMeetingButton = () => {
    const answer = confirm('약속 확정을 취소하시겠습니까?');

    if (answer) {
      cancelFixedMeeting();
    }
  };

  return (
    <div css={s_container}>
      <button css={s_kakaoCircleButton} onClick={() => handleCancelFixedMeetingButton()}>
        <KakaoIcon width="48" height="48" />
      </button>

      <button css={s_cancelCircleButton} onClick={() => handleCancelFixedMeetingButton()}>
        <CancelIcon width="16" height="16" />
        <div css={s_buttonText}>확정 취소</div>
      </button>
    </div>
  );
}

export default ActionButtonGroup;
