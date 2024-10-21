import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import useRouter from '@hooks/useRouter/useRouter';

import FunnelMain from './FunnelMain';
import type { RouteFunnelProps, StepProps, StepType } from './useFunnel.type';

const useFunnel = <Steps extends StepType>(steps: Steps, initialStep: Steps[number]) => {
  const location = useLocation();
  const { routeWithState } = useRouter();

  const setStep = (step: Steps[number]) => {
    routeWithState(location.pathname, { currentStep: step });
  };

  const Step = <Steps extends StepType>({ children }: StepProps<Steps>) => {
    return <>{children}</>;
  };

  // 컴포넌트가 다시 렌더링 될 때마다, Funnel 인스턴스가 다시 생성되는 문제가 있어서, useMemo로 감싸는 것으로 수정(@해리)
  const Funnel = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
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
