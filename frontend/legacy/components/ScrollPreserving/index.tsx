import React, { useEffect, useRef } from 'react';

export default function ScrollPreserving({ children }: React.PropsWithChildren) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositionRef.current = window.scrollY;
    };

    saveScrollPosition(); // 초기 스크롤 위치 저장

    window.addEventListener('scroll', saveScrollPosition);

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const restoreScrollPosition = () => {
      window.scrollTo(0, scrollPositionRef.current);
    };

    const timeoutId = setTimeout(restoreScrollPosition, 0);

    return () => clearTimeout(timeoutId);
  });

  return <>{children}</>;
}
