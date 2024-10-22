import type { PropsWithChildren } from 'react';

import ToastProvider from '@contexts/ToastProvider';

// 필요한 _Provider 들은 유동적으로 추가해서 테스트 환경에서 사용할 수 있어요(@해리)
export default function Providers({ children }: PropsWithChildren) {
  return <ToastProvider>{children}</ToastProvider>;
}
