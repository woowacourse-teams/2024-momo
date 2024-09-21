import { useEffect, useState } from 'react';

const useButtonOnKeyboard = () => {
  const [resizedButtonHeight, setResizedButtonHeight] = useState(0);

  useEffect(() => {
    const handleButtonHeightResize = () => {
      if (!visualViewport?.height) return;

      setResizedButtonHeight(window.innerHeight - visualViewport.height);
    };

    // 약속 이름 -> 약속 주최자 정보 입력으로 넘어갈 때 다음 버튼을 모바일 키보드로 올리기 위해서 resize 이벤트가 발생하지 않더라도 초기에 실행되도록 구현했어요.(@해리)
    handleButtonHeightResize();
    visualViewport?.addEventListener('resize', handleButtonHeightResize);

    return () => {
      visualViewport?.removeEventListener('resize', handleButtonHeightResize);
    };
  }, []);

  return resizedButtonHeight;
};

export default useButtonOnKeyboard;
