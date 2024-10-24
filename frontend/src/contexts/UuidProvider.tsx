import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { useParams } from 'react-router-dom';

interface UuidState {
  uuid: string;
}

export const UuidContext = createContext<UuidState>({} as UuidState);

export default function UuidProvider({ children }: PropsWithChildren) {
  const { uuid } = useParams();

  return <UuidContext.Provider value={{ uuid: uuid ?? '' }}>{children}</UuidContext.Provider>;
}
