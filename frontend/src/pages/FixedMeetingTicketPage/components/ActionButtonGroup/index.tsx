import { useParams } from 'react-router-dom';

import { useCancelFixedMeetingMutation } from '@stores/servers/confirm/mutations';

import CancelIcon from '@assets/images/cancel.svg';
import KakaoIcon from '@assets/images/kakao.svg';

function ActionButtonGroup() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { mutate: cancelFixedMeeting } = useCancelFixedMeetingMutation(uuid);

  const handleCancelFixedMeetingButton = () => {
    const answer = confirm('약속 확정을 취소하시겠습니까?');

    if (answer) {
      cancelFixedMeeting();
    }
  };

  return (
    <div>
      <button onClick={() => handleCancelFixedMeetingButton()}>
        <KakaoIcon width="48" height="48" />
      </button>

      <button onClick={() => handleCancelFixedMeetingButton()}>
        <CancelIcon width="16" height="16" />
        <div>확정 취소</div>
      </button>
    </div>
  );
}

export default ActionButtonGroup;
