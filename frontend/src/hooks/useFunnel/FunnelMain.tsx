import type { ReactElement } from 'react';
import React, { Children, isValidElement } from 'react';

import type { FunnelProps, StepProps, StepType } from './useFunnel.type';

const isValidFunnelChild = <Steps extends StepType>(
  child: React.ReactNode,
): child is ReactElement<StepProps<Steps>> => {
  return isValidElement(child) && typeof child.props.name === 'string';
};

export default function FunnelMain<Steps extends StepType>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) {
  const childrenArray = Children.toArray(children)
    .filter(isValidFunnelChild<Steps>)
    .filter((child) => steps.includes(child.props.name));

  const targetStep = childrenArray.find((child) => child.props.name === step);

  if (!targetStep) return null;

  return <>{targetStep}</>;
}
