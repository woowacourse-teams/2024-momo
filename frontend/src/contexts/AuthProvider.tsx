import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { loadAuthState, saveAuthState } from '@utils/auth';

interface AuthState {
  isLoggedIn: boolean;
  userName: string;
}

interface AuthActions {
  setIsLoggedIn: (value: boolean) => void;
  setUserName: (value: string) => void;
}

interface AuthContextType {
  state: AuthState;
  actions: AuthActions;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const params = useParams<{ uuid?: string }>();
  const uuid = params.uuid;

  const initialState = uuid ? loadAuthState(uuid) : { isLoggedIn: false, userName: '' };

  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [userName, setUserName] = useState(initialState.userName);

  useEffect(() => {
    if (uuid) {
      saveAuthState(uuid, { isLoggedIn, userName });
    }
  }, [isLoggedIn, userName, uuid]);

  const value: AuthContextType = {
    state: { isLoggedIn, userName },
    actions: { setIsLoggedIn, setUserName },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
