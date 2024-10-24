import { useContext } from 'react';

import { ErrorDispatchContext } from '@contexts/ErrorProvider';

const useErrorDispatch = () => {
  const setError = useContext(ErrorDispatchContext);

  if (!setError) {
    throw new Error('ErrorProvider 내부에서만 해당 훅을 사용할 수 있어요');
  }

  return setError;
};

export default useErrorDispatch;
