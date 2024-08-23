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

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (uuid) {
      const savedState = loadAuthState(uuid);
      return savedState.isLoggedIn;
    }
    return false;
  });

  const [userName, setUserName] = useState(() => {
    if (uuid) {
      const savedState = loadAuthState(uuid);
      return savedState.userName;
    }
    return '';
  });

  useEffect(() => {
    if (uuid) {
      saveAuthState(uuid, { isLoggedIn, userName });
    }
  }, [isLoggedIn, userName]);

  const value: AuthContextType = {
    state: { isLoggedIn, userName },
    actions: { setIsLoggedIn, setUserName },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
