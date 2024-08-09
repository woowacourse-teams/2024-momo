import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import { postUserLogout } from '@apis/users';

import Logo from '@assets/images/logo.svg';

import { Button } from '../Buttons/Button';
import { s_header, s_logoContainer, s_title } from './Header.styles';

export default function Header() {
  const navigate = useNavigate();

  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const authContext = useContext(AuthContext);
  const {
    state: { isLoggedIn },
    actions: { setIsLoggedIn, setUserName },
  } = authContext;

  const handleAuthButtonClick = async () => {
    if (isLoggedIn) {
      await postUserLogout(uuid);

      setIsLoggedIn(false);
      setUserName('');

      alert('로그아웃 되었습니다 :)');
    } else {
      navigate(`/meeting/${uuid}/login`);
    }
  };

  return (
    <header css={s_header}>
      <div css={s_logoContainer}>
        <Logo width={36} height={36} />
        <h1 css={s_title}>momo</h1>
      </div>
      {uuid ? (
        <Button variant="primary" size="m" onClick={handleAuthButtonClick}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </Button>
      ) : null}
    </header>
  );
}
