import { useContext } from 'react';

import { ErrorStateContext } from '@contexts/ErrorProvider';

const useErrorState = () => {
  const error = useContext(ErrorStateContext);

  if (error === undefined) {
    throw new Error('ErrorProvider 내부에서만 해당 훅을 사용할 수 있어요');
  }

  return error;
};

export default useErrorState;
