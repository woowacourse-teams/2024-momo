import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import Logo from '@assets/images/logo.svg';

import { s_button, s_header, s_logoContainer, s_title } from './Header.styles';

export default function Header() {
  const navigate = useNavigate();

  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid!;

  const { isLoggedIn } = useContext(AuthContext).state;

  const handleClickLoginButton = () => {
    navigate(`/meeting/${uuid}/login`);
  };

  return (
    <header css={s_header}>
      <div css={s_logoContainer}>
        <Logo width={36} height={36} />
        <h1 css={s_title}>momo</h1>
      </div>
      {uuid ? (
        <button css={s_button} onClick={handleClickLoginButton}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      ) : null}
    </header>
  );
}
