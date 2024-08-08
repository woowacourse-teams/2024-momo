export interface AuthState {
  isLoggedIn: boolean;
  userName: string;
}

export const loadAuthState = (uuid: string) => {
  const authState = localStorage.getItem(uuid);

  if (authState) {
    return JSON.parse(authState);
  }

  return { isLoggedIn: false, userName: '' };
};

export const saveAuthState = (uuid: string, authState: AuthState) => {
  localStorage.setItem(uuid, JSON.stringify(authState));
};
