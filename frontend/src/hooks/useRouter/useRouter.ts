import { useNavigate } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();

  const routeTo = (path: string) => navigate(path);

  const goBack = () => navigate(-1);

  return { routeTo, goBack };
};

export default useRouter;
