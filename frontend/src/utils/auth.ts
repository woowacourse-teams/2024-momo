export const loadAuthState = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userName = localStorage.getItem('userName');

  return {
    isLoggedIn: isLoggedIn ? JSON.parse(isLoggedIn) : false,
    userName: userName ? userName : '',
  };
};

export const saveAuthState = (isLoggedIn: boolean, userName: string) => {
  localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  localStorage.setItem('userName', userName);
};
