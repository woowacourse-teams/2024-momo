import { useContext } from 'react';

import { AuthContext } from '@contexts/AuthProvider';

import useKakaoTalkShare from '@hooks/useKakaoTalkShare/useKakaoTalkShare';

import type { GetConfirmedMeetingInfoResponse } from '@apis/meetingConfirm';

import { useCancelFixedMeetingMutation } from '@stores/servers/confirm/mutations';

import CancelIcon from '@assets/images/cancel.svg';
import KakaoIcon from '@assets/images/kakao.svg';

import { MEETING_RESULT_TEMPLATE_ID } from '@constants/kakao';

import {
  s_buttonText,
  s_cancelCircleButton,
  s_container,
  s_kakaoCircleButton,
} from './ActionButtonGroup.styles';

interface ActionButtonGroupProps {
  uuid: string;
  data: GetConfirmedMeetingInfoResponse;
}

function ActionButtonGroup({ uuid, data }: ActionButtonGroupProps) {
  const { hostName, meetingName } = data;

  const authContext = useContext(AuthContext);
  const { userName } = authContext.state;

  const { mutate: cancelFixedMeeting } = useCancelFixedMeetingMutation(uuid);
  const { handleKakaoTalkShare } = useKakaoTalkShare();

  const handleKakaoButtonClick = () => {
    handleKakaoTalkShare(MEETING_RESULT_TEMPLATE_ID, {
      path: `${uuid}/fixed-meeting-ticket`,
      hostName,
      meetingName,
    });
  };

  const handleFixedMeetingCancel = () => {
    const answer = confirm('약속 확정을 취소하시겠습니까?');

    if (answer) {
      cancelFixedMeeting();
    }
  };

  return (
    <div css={s_container}>
      <button css={s_kakaoCircleButton} onClick={() => handleKakaoButtonClick()}>
        <KakaoIcon width="48" height="48" />
      </button>

      <button css={s_cancelCircleButton} onClick={() => handleFixedMeetingCancel()}>
        <CancelIcon width="20" height="20" />
        <div css={s_buttonText}>확정 취소</div>
      </button>
    </div>
  );
}

export default ActionButtonGroup;
