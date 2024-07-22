import { PropsWithChildren, createContext, useCallback, useState } from 'react';

interface UpdateStateContextProps {
  getUpdateState: () => boolean;
  handleToggleIsUpdate: () => void;
}

export const UpdateStateContext = createContext<UpdateStateContextProps>(
  {} as UpdateStateContextProps,
);

export const UpdateStateProvider = ({ children }: PropsWithChildren) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const getUpdateState = () => isUpdate;

  const handleToggleIsUpdate = useCallback(() => {
    setIsUpdate((prevState) => !prevState);
  }, []);

  return (
    <UpdateStateContext.Provider value={{ getUpdateState, handleToggleIsUpdate }}>
      {children}
    </UpdateStateContext.Provider>
  );
};
