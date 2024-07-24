import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';

interface TimePickerUpdateStateContextProps {
  isTimePickerUpdate: boolean;
  handleToggleIsTimePickerUpdate: () => void;
}

export const TimePickerUpdateStateContext = createContext<TimePickerUpdateStateContextProps>(
  {} as TimePickerUpdateStateContextProps,
);

export const TimePickerUpdateStateProvider = ({ children }: PropsWithChildren) => {
  const [isTimePickerUpdate, setIsTimePickerUpdate] = useState(false);

  const handleToggleIsTimePickerUpdate = useCallback(() => {
    setIsTimePickerUpdate((prevState) => !prevState);
  }, []);

  return (
    <TimePickerUpdateStateContext.Provider
      value={{ isTimePickerUpdate, handleToggleIsTimePickerUpdate }}
    >
      {children}
    </TimePickerUpdateStateContext.Provider>
  );
};
