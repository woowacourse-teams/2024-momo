import { useNavigate, useParams } from 'react-router-dom';

const useRouter = () => {
  const router = useNavigate();
  const uuid = useParams<{ uuid: string }>().uuid;

  return {
    uuid,
    routeTo: (path: string) => router(path),
  };
};

export default useRouter;
