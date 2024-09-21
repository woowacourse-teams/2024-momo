import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FunnelMain from './FunnelMain';
import type { RouteFunnelProps, StepProps, StepType } from './useFunnel.type';

const useFunnel = <Steps extends StepType>(steps: Steps, initialStep: Steps[number]) => {
  const location = useLocation();
  const navigate = useNavigate();

  const setStep = (step: Steps[number]) => {
    navigate(location.pathname, {
      state: {
        currentStep: step,
      },
    });
  };

  // 아직 헤더 디자인을 하지 않은 상태이기 때문에, goPrevStep은 사용하지 않는 상태입니다.(@해리)
  const goPrevStep = () => {
    navigate(-1);
  };

  const Step = <Steps extends StepType>({ children }: StepProps<Steps>) => {
    return <>{children}</>;
  };

  // 컴포넌트가 다시 렌더링 될 때마다, Funnel 인스턴스가 다시 생성되는 문제가 있어서, useMemo로 감싸는 것으로 수정(@해리)
  const Funnel = useMemo(
    () =>
      Object.assign(
        function RoteFunnel(props: RouteFunnelProps<Steps>) {
          const step =
            (location.state as { currentStep?: Steps[number] })?.currentStep || initialStep;

          return <FunnelMain<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        },
      ),
    [location.state, initialStep, steps],
  );

  return [setStep, Funnel] as const;
};

export default useFunnel;
