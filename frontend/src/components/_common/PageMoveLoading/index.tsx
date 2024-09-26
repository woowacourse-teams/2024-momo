import Lottie from 'react-lottie';

import momoPageLoading from '@assets/images/momoPageLoading.json';

import { s_loadingWrapper, s_text } from './PageMoveLoading.style';

export default function PageMoveLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: momoPageLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div css={s_loadingWrapper}>
      <Lottie options={defaultOptions} height={200} width={200} />
      <div css={s_text}>로딩중입니다...</div>
    </div>
  );
}
