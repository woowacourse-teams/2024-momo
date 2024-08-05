import type { ReactNode } from 'react';
import { createContext, useState } from 'react';

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

interface LoginProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: LoginProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const value: AuthContextType = {
    state: { isLoggedIn, userName },
    actions: { setIsLoggedIn, setUserName },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
