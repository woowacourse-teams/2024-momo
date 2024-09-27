import { useState } from 'react';

import { copyToClipboard } from '@utils/clipboard';

import CheckIcon from '@assets/images/check.svg';
import CopyIcon from '@assets/images/copy.svg';

import {
  s_check,
  s_copyButton,
  s_copyButtonContainer,
  s_copyContainer,
  s_urlText,
} from './CopyLink.style';

interface CopyLinkProps {
  url: string;
}

export default function CopyLink({ url }: CopyLinkProps) {
  const [copyComplete, setCopyComplete] = useState(false);

  const handleCopyClick = async () => {
    setCopyComplete(true);
    setTimeout(() => setCopyComplete(false), 2500);
  };

  return (
    <div css={s_copyContainer}>
      <span css={s_urlText}>{url}</span>
      <div css={s_copyButtonContainer}>
        {copyComplete ? (
          <CheckIcon css={s_check} width="24" height="24" />
        ) : (
          <button css={s_copyButton} onClick={() => copyToClipboard(url, handleCopyClick)}>
            <CopyIcon width="24" height="24" />
          </button>
        )}
      </div>
    </div>
  );
}
