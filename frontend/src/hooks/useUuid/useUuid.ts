import { useParams } from 'react-router-dom';

// uuid를 찾을 수 없다면 에러 로그를 띄워주고, 빈 문자열을 반환한다.
const useUuid = () => {
  const { uuid } = useParams();

  if (!uuid) {
    console.error('uuid를 찾을 수 없습니다.');
  }

  return { uuid: uuid ?? '' };
};

export default useUuid;
