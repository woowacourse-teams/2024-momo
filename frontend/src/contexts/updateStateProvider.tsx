import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';

interface UpdateStateContextProps {
  isUpdate: boolean;
  handleToggleIsUpdate: () => void;
}

export const UpdateStateContext = createContext<UpdateStateContextProps>(
  {} as UpdateStateContextProps,
);

export const UpdateStateProvider = ({ children }: PropsWithChildren) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const handleToggleIsUpdate = useCallback(() => {
    setIsUpdate((prevState) => !prevState);
  }, []);

  return (
    <UpdateStateContext.Provider value={{ isUpdate, handleToggleIsUpdate }}>
      {children}
    </UpdateStateContext.Provider>
  );
};
