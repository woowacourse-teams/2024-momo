import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

export default function ScrollBlock({ children }: PropsWithChildren) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    // 터치 이벤트를 사용해서 스크롤을 할 경우, 해당 스크롤을 막는다는 것을 브라우저에게 명시적으로 알려주기 위해서 passive 속성 추가(@해리)
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <div ref={contentRef}>{children}</div>;
}
