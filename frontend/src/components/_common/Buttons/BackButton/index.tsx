import useRouter from '@hooks/useRouter/useRouter';

import BackSVG from '@assets/images/back.svg';

import { s_headerIconButton } from '../Button/Button.styles';

interface BackButtonProps {
  path?: string;
}

export default function BackButton({ path }: BackButtonProps) {
  const { routeTo, goBack } = useRouter();

  const handleBackButtonClick = () => {
    if (path === undefined) goBack();
    else routeTo(path);
  };

  return (
    <button css={s_headerIconButton} onClick={handleBackButtonClick}>
      <BackSVG width="24" height="24" />
    </button>
  );
}
