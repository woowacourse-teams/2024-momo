import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

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
  const { isLoggedIn: initialIsLoggedIn, userName: initialUserName } = loadAuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    saveAuthState(isLoggedIn, userName);
  }, [isLoggedIn, userName]);

  const value: AuthContextType = {
    state: { isLoggedIn, userName },
    actions: { setIsLoggedIn, setUserName },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
