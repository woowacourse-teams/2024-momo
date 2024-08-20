import { useEffect } from 'react';

declare global {
  export interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface KakaoTalkShareInfo {
  path: string;
  meetingName?: string;
  hostName?: string;
}

export default function useKakaoTalkShare() {
  const { Kakao } = window;

  const onShareKakaoTalk = (templateId: number, shareInfo: KakaoTalkShareInfo) => {
    Kakao.Share.sendCustom({
      templateId: templateId,
      templateArgs: {
        path: shareInfo.path,
        meetingName: shareInfo.meetingName,
        hostName: shareInfo.hostName,
      },
    });
  };

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAO_KEY);
    }
  }, [Kakao]);

  return { onShareKakaoTalk };
}
