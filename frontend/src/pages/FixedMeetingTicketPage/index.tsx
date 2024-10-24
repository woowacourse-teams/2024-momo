import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { UuidContext } from '@contexts/UuidProvider';

import MeetingTicket from '@pages/FixedMeetingTicketPage/components/MeetingTicket';

import Header from '@components/_common/Header';

import { useGetConfirmedMeetingInfoQuery } from '@stores/servers/confirm/queries';

import { s_container } from './FixedMeetingTicketPage.styles';
import ActionButtonGroup from './components/ActionButtonGroup';
import UnconfirmedMessage from './components/UnconfirmedMessage';

export default function FixedMeetingTicketPage() {
  const { uuid } = useContext(UuidContext);
  const { data } = useGetConfirmedMeetingInfoQuery(uuid);
  return (
    <>
      <Header title="확정된 약속" />
      <ContentLayout>
        <div css={s_container}>
          {data ? (
            <>
              <MeetingTicket data={data} />
              <ActionButtonGroup uuid={uuid} data={data} />
            </>
          ) : (
            <UnconfirmedMessage uuid={uuid} />
          )}
        </div>
      </ContentLayout>
    </>
  );
}
