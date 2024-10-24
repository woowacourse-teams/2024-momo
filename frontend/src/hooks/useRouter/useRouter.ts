import { useNavigate } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();

  const routeTo = (path: string) => navigate(path);

  const routeWithState = (path: string, state: object) => navigate(path, { state });

  const goBack = () => navigate(-1);

  return { routeTo, goBack, routeWithState };
};

export default useRouter;
