import { useNavigate, useParams } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  return {
    uuid,
    routeTo: (path: string) => navigate(path),
  };
};

export default useRouter;
